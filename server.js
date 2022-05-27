import express from 'express';
import cors from 'cors';
import { AccountLayout, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL
} from "@solana/web3.js";


const port = 4000;

const app = express();
app.use(cors());

app.get('/', fetchAccountData)

app.listen(port, () => console.log('listening on port ' + port));


async function fetchAccountData (req, res) {
    const wallet = req.query.id;

    try {
      if (!wallet) {
        res.status(404).send({
          error: 'User not found'
        });
      }
      const balance = await getAccountBalance(wallet);
      const tokens = await getTokenBalance(wallet);
      res.status(200).json({
        solBalance: balance,
        accountTokens: tokens
      })

    } catch (error) {
      res.status(500).json({
        error: error.message
      })
  }
}

const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");

// SOL Balance
async function getAccountBalance (walletAddress) {

  let wallet = new PublicKey(walletAddress);
  return await connection.getBalance(wallet) / LAMPORTS_PER_SOL;

}

// Wallet Tokens
  async function getTokenBalance (walletAddress) {
    
    const tokenAccounts = await connection.getTokenAccountsByOwner(
      new PublicKey(walletAddress),
      {
        programId: TOKEN_PROGRAM_ID
      }
    );
    const allTokens = [];
    tokenAccounts.value.forEach((token) => {
      const accountInfo = AccountLayout.decode(token.account.data);
      allTokens.push({mint: new PublicKey(accountInfo.mint).toString(), amount: accountInfo.amount.toString()})
      console.log(`${new PublicKey(accountInfo.mint)}   ${accountInfo.amount}`);
    });
    return allTokens;
  }
