import { Connection, Keypair, PublicKey, VersionedTransaction } from "@solana/web3.js"
import { SearcherClient, searcherClient } from "jito-ts/dist/sdk/block-engine/searcher"
import { Bundle } from "jito-ts/dist/sdk/block-engine/types"
import { isError } from "jito-ts/dist/sdk/block-engine/utils"
import { retrieveEnvVariable } from "./utils"

const rpc = retrieveEnvVariable('RPC_URL')
const jitoFee = Number(retrieveEnvVariable('JITO_FEE'))
const solanaConnection = new Connection(rpc)

export async function bundle(txs: VersionedTransaction[], keypair: Keypair) {
  try {
    const txNum = Math.ceil(txs.length / 3)
    let successNum = 0
    for (let i = 0; i < txNum; i++) {
      const upperIndex = (i + 1) * 3
      const downIndex = i * 3
      const newTxs = []
      for (let j = downIndex; j < upperIndex; j++) {
        if (txs[j]) newTxs.push(txs[j])
      }
      let success = await bull_dozer(newTxs, keypair)
      return success
    }
    if (successNum == txNum) return true
    else return false
  } catch (error) {
    return false
  }
}

function bull_dozer(txs: VersionedTransaction[], keypair: Keypair) {

}

async function build_bundle(
  search: SearcherClient,
  bundleTransactionLimit: number,
  txs: VersionedTransaction[],
  keypair: Keypair
) {
  const accounts = await search.getTipAccounts()
  const _tipAccount = accounts[Math.min(Math.floor(Math.random() * accounts.length), 3)]
  const tipAccount = new PublicKey(_tipAccount)

  const bund = new Bundle([], bundleTransactionLimit)
  const resp = await solanaConnection.getLatestBlockhash()
  bund.addTransactions(...txs)

  let maybeBundle = bund.addTipTx(
    keypair,
    Math.floor(jitoFee * 10 ** 9),
    tipAccount,
    resp.blockhash
  )

  if (isError(maybeBundle)) {
    throw maybeBundle
  }
  try {
    await search.sendBundle(maybeBundle)
  } catch (e) {}
  return maybeBundle
}