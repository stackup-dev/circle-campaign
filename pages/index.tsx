import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { success, err, warn } from "../utils/responseMessages";
import { ethers } from "ethers";
import { ToastContainer } from "react-toastify";

// Import abi
import abi from "../utils/fundUSDC.json";

import usdcAbi from "../utils/usdcContract.json";

export default function Home() {
  const originalUsdcContract = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F";

  const usdcDemoContract = "REPLACE WITH YOUR SMART CONTRACT ADDRESS"; //replace with the contract address you created

  /**
   * Create a variable here that references the abi content!
   */
  const contractABI = abi;

  const [currentAccount, setCurrentAccount] = useState("");
  const [sending, setSending] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [approving, setApproving] = useState(false);
  const [amount, setAmount] = useState("");
  const [USDCBalance, setUSDCBalance] = useState(0);
  const [receiverAddress, setreceiverAddress] = useState("");

  //get current wallet USDC balance
  const getBalance = async (address: string) => {
    // Add in code here to get USDC wallet balance
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // Create a contract object
    // (fill in code here)

    // Use the balanceOf function to get wallet USDC balance
    // (fill in code here)

    //set variable value
    // (fill in code here)
  };

  //Check if the user wallet is connected
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      //Check if we're authorized to access the user's wallet
      const accounts = await ethereum.request({ method: "eth_accounts" });

      // Validate that we have an account
      if (accounts.length !== 0) {
        const account = accounts[0];

        // Set the current account
        setCurrentAccount(account);

        //call get balance function
        await getBalance(accounts[0]);

        // Display a success message to the user that they are connected
        success("Wallet is Connected!");
      } else {
        warn("Make sure you have MetaMask Connected!");
      }
    } catch (error) {
      err(`${error.message}`);
    }
  };

  //connect your Metamask wallet on connect button click
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      // Check if MetaMask is installed
      if (!ethereum) {
        warn("Make sure you have MetaMask Connected!");
        return;
      }

      // Get user Metamask Ethereum wallet address
      // (fill in code here)

      // Get the first account address and assign to variable
      // (fill in code here)

      //get wallet balance - call getBalance() function
      // (fill in code here)
    } catch (error) {
      console.log(error);
    }
  };

  const Fund = async () => {
    try {
      const { ethereum } = window;

      // Check is user already connected a wallet
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        // Create a contract instance of your deployed UsdcDemo contract
        const fundContract = new ethers.Contract(
          usdcDemoContract,
          contractABI,
          signer
        );

        console.log("Connected to contract");
        console.log("amount: ", amount);

        // Send the transaction, call the Fund function in the contract
        // (fill in code here)

        // Set the sending state to true
        setSending(true);

        // Wait for the transaction to be mined
        // (fill in code here)

        // Set the sending state to false
        setSending(false);

        //update USDC balance
        await getBalance(currentAccount);

        // Display a success message to the user
        success("USDC Sent Successfully!");
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      err(`${error.message}`);
    }
  };

  // Check if the user has approved the contract to spend their USDC
  const Approve = async () => {
    try {
      const { ethereum } = window;

      // Check if User already connected a wallet
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        // Create a contract object
        const usdcContract = new ethers.Contract(
          originalUsdcContract,
          usdcAbi,
          signer
        );

        // Use the approve function to send USDC to the contract
        // (fill in code here)

        // Set the approving state to true
        setApproving(true);

        // Wait for the transaction to be mined
        // (fill in code here)

        // Set the approving state to false
        setApproving(false);

        // Set the isApproved state to true
        setIsApproved(true);

        // Display a success message to the user
        success("USDC Approved Successfully!");
      }
    } catch (error) {
      err(`${error.message}`);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "white",
        height: "100vh",
        marginLeft: "450px",
        marginRight: "450px",
        borderStyle: "solid",
        borderColor: "grey",
        minWidth: "500px",
      }}
    >
      <Head>
        <title>Usdc Demo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          backgroundColor: "#3498db",
        }}
      >
        <div
          style={{
            padding: "10px",
            color: "white",
          }}
        >{`Wallet address: ${currentAccount}`}</div>

        <div
          style={{
            padding: "10px",
            color: "white",
          }}
        >{`USDC balance: ${USDCBalance}`}</div>
      </div>
      <h1 style={{ textAlign: "center", color: "black" }}>USDC Payment App</h1>

      <Image
        src="/icon.png"
        alt="Payment image"
        width={250}
        height={250}
        style={{
          textAlign: "center",
          display: "block",
          margin: "auto",
          borderStyle: "groove",
          borderColor: "black",
        }}
      />

      {currentAccount ? (
        <div>
          <form>
            <div style={{ margin: "20px" }}>
              {isApproved ? (
                <>
                  <div style={{ margin: "10px" }}>
                    <input
                      style={{
                        padding: "15px",
                        textAlign: "center",
                        display: "block",
                        margin: "auto",
                        width: "400px",
                      }}
                      type="text"
                      placeholder="Wallet Address to send USDC to"
                      onChange={(e) => setreceiverAddress(e.target.value)}
                    />
                  </div>

                  <div style={{ margin: "10px" }}>
                    <input
                      type="number"
                      placeholder="USDC Amount"
                      onChange={(e) => setAmount(e.target.value)}
                      style={{
                        padding: "15px",
                        textAlign: "center",
                        display: "block",
                        margin: "auto",
                        width: "400px",
                      }}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={Fund}
                    className="sendUsdcBtn"
                    disabled={sending === true}
                    style={{
                      color: sending === true ? "black" : "white",
                      cursor: sending === true ? "progress" : "pointer",
                    }}
                  >
                    {sending ? "Sending, Please wait..." : "Send USDC now"}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="approveBtn"
                  onClick={Approve}
                  disabled={approving === true}
                  style={{
                    color: approving === true ? "black" : "white",
                    cursor: approving === true ? "progress" : "pointer",
                  }}
                >
                  {approving
                    ? `Approving, Please wait...`
                    : "I want to send USDC"}
                </button>
              )}
            </div>
          </form>
        </div>
      ) : (
        <div
          style={{
            margin: "20px",
          }}
        >
          <button onClick={connectWallet} className="connectWallet">
            Connect Your Metmask Wallet
          </button>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover={false}
      />
    </div>
  );
}
