// import { AccountLayout, TOKEN_PROGRAM_ID } from "./node_modules/@solana/spl-token/lib/cjs/index.js";

const connectBtn = document.getElementById('connectWalletBtn');
connectBtn.addEventListener('click', connectWallet);


// const { Connection, clusterApiUrl, PublicKey, LAMPORTS_PER_SOL } = solanaWeb3;
// const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");

let userWalletAddress;

// Connect Phantom Wallet
async function connectWallet () {

  const { solana } = window;

  if (solana) {
    try {
      const response = await solana.connect();
      console.log("wallet account ", response.publicKey.toString());
      const walletKey = response.publicKey.toString();
      const data = await getData(walletKey);
      console.log(data);
    } catch (err) {
      console.log(err)
    }
  }
};

// SOL Balance
  // async function getAccountBalance (walletAddress) {

  //   let wallet = new PublicKey(walletAddress);
  //   return await connection.getBalance(wallet) / LAMPORTS_PER_SOL;

// }

// Wallet Tokens
  // async function getTokenBalance (walletAddress) {
    
  //   const tokenAccounts = await connection.getTokenAccountsByOwner(
  //     new PublicKey(walletAddress),
  //     {
  //       programId: TOKEN_PROGRAM_ID
  //     }
  //   );
  
  //   tokenAccounts.value.forEach((token) => {
  //     const accountInfo = AccountLayout.decode(token.account.data);
  //     allTokens.push({mint: new PublicKey(accountInfo.mint), amount: accountInfo.amount})
  //     console.log(`${new PublicKey(accountInfo.mint)}   ${accountInfo.amount}`);
  //   });

  // }

  async function getData(walletAddress) {
    if(!walletAddress) return;

    const response = await fetch(`http://localhost:4000/?id=${walletAddress}`);
    const data = await response.json();
    return(data);
  }
  
