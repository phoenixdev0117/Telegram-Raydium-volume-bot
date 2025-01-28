import dotenv from 'dotenv'
import fs from 'fs'
dotenv.config()
import { PublicKey } from '@solana/web3.js';

export const retrieveEnvVariable = (variableName: string) => {
  const variable = process.env[variableName] || ''
  if (!variable) {
    console.log(`${variableName} is not set`)
    process.exit(1)
  }
  return variable
}
