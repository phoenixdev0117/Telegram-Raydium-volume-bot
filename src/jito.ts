import { Keypair, VersionedTransaction } from "@solana/web3.js"


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