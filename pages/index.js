import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import abi from "./utils/smartContract.json";
import { providers } from "ethers";
import { useState } from 'react';

import Web3 from "web3";
import Web3Modal from "web3modal";


const providerOptions = {
  walletconnect: {
      package: WalletConnectProvider,
      options: {
          rpc: {
            97: "https://data-seed-prebsc-1-s1.binance.org:8545/",

          },
          chainId: 97
      }
  }
}

const web3Modal = new Web3Modal({
  // network: "testnet", // optional
  cacheProvider: true, // optional
  providerOptions // required
});



export default function Home() {

  

  const [message, setMessage] = useState("");


  const contractAddress = "0x92761E4902fd50A129778945aDBcb35D1bd123F3";
  const contractABI = abi.abi;

  // const providerOptions = {
  //   /* See Provider Options Section */
  // };

  

  
  




  // const provider = new WalletConnectProvider({
  //   rpc: {
  //     97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  //     // 56: "https://bsc-dataseed.binance.org/", 
  //   },
  // });
  

  
  const connect = async () =>{
    
  const provider = await web3Modal.connect();
  // await web3Modal.toggleModal();
  // const newWeb3 = new Web3(provider);

  // const web3 = new Web3(provider);

    await provider.enable();
    const web3Provider = new providers.Web3Provider(provider);
    window.web3 = web3Provider;
    const accounts = await provider.request({ method: "eth_accounts" });
    console.log("Connected", accounts[0]);

  }

  const disconnect = async () =>{
    await provider.disconnect();
  } 
  
  const sendGift = async () =>{
    const web3Provider = new providers.Web3Provider(provider);
    const signer = web3Provider.getSigner();
    const smartContract = new ethers.Contract(contractAddress, contractABI, signer);

    const sendGiftTxn = await smartContract.sendGift("0x7184ceDffb687a694151533024964a1DEF802842", {
      value: ethers.utils.parseEther("0.0001")
  , gasLimit: 300000 });
    console.log("Mining...", sendGiftTxn.hash);

    await sendGiftTxn.wait();
    console.log("Mined -- ", sendGiftTxn.hash);
  }

  const sendMessage = async () => {
    // let btn = e.currentTarget;
    // btn.classList.toggle("loading");

    try {

      const web3Provider = new providers.Web3Provider(provider);
      const signer = web3Provider.getSigner();
      const smartContract = new ethers.Contract(contractAddress, contractABI, signer);
  
        // setSendingWaveProgress("Establishing connection with Smart Contract!")
      let numberOfMessages = await smartContract.getTotalMessages();
        console.log("Total message count...", numberOfMessages.toNumber());

        const messageTxn = await smartContract.sendMessage(message);
        // setSendingWaveProgress("Mining Transaction...!");
        console.log("Mining...", messageTxn.hash);

        await messageTxn.wait();
        // setSendingWaveProgress("Finishing transaction")

        console.log("Mined -- ", messageTxn.hash);

        
        // btn.classList.toggle("loading");

        count = await smartContract.getTotalTests();
        console.log("Retrieved total wave count...", numberOfMessages.toNumber());
        // setSendingWaveProgress("")

      
    } catch (error) {
      console.log(error);
    }
}


  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Happy Birthday  <a href="https://nextjs.org">Nengi</a>
        </h1>

        <button onClick={connect}>Connect Wallet</button>
        <button onClick={disconnect}>Disconnect</button>

        <input type="text" placeholder="Type Birthday Message Here!" className="input w-full max-w-xs input-bordered" name={"message"} value={message} onChange={(e) => setMessage(e.target.value)} />

        <button onClick={sendMessage}>Send A Message</button>
        <button onClick={sendGift}>Send A Token</button>

        
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
