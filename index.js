import {
  clusterApiUrl,
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { AccountLayout, TOKEN_PROGRAM_ID } from "@solana/spl-token";

const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");

const walletKey = '52T6pmbAyRfUCeEXKNESTHPuWbqpSX1uKGDYzjCs8jMo';

const getTokens = async (walletAddress) => {

  const tokenAccounts = await connection.getTokenAccountsByOwner(
    new PublicKey(walletAddress),
    {
      programId: TOKEN_PROGRAM_ID
    }
  );

  tokenAccounts.value.forEach((token) => {
    const accountInfo = AccountLayout.decode(token.account.data);
    allTokens.push({mint: new PublicKey(accountInfo.mint), amount: accountInfo.amount})
    console.log(`${new PublicKey(accountInfo.mint)}   ${accountInfo.amount}`);
  });
  // console.log("Token                                         Balance");
  // console.log("------------------------------------------------------------");
  // tokenAccounts.value.forEach((token) => {
  //   const accountInfo = AccountLayout.decode(token.account.data);
  //   console.log(`${new PublicKey(accountInfo.mint)}   ${accountInfo.amount}`);
  // });
};
getTokens(walletKey);

async function getAccountBalance (walletAddress) {

  let wallet = new PublicKey(walletAddress);
  const result = await connection.getBalance(wallet) / LAMPORTS_PER_SOL;
  console.log(`${result} SOL`)
  return result;
}

getAccountBalance(walletKey);


// source: https://spl.solana.com/token