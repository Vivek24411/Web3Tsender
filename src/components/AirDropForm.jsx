import React, { useState } from "react";
import { chainsToTSender, erc20Abi,tsenderAbi } from "../constants";
import { readContract,waitForTransactionReceipt } from "@wagmi/core";
import { useConfig,useAccount,useChainId,useWriteContract } from "wagmi";
import { calculateTotalAmount } from "../utils/CalculateTotalAmount";

const AirDropForm = () => {
  const [tokenAddress, setTokenAddress] = useState("");
  const [recipientsAddress, setRecipientsAddress] = useState("");
  const [amounts, setAmounts] = useState("");
  const config = useConfig()
  const ownerAddress = useAccount()
  const chainId = useChainId()
  const {writeContractAsync,isPending,error,data:hash} = useWriteContract()
  


  const submitHandler = async(e)=>{
        e.preventDefault()
        const spenderContractAddress = chainsToTSender[chainId]?.tsender
        const approvedAmount = await readContract(config,{
            abi:erc20Abi,
            address:tokenAddress,
            functionName:"allowance",
            args:[ownerAddress.address,spenderContractAddress]
        })

        console.log(approvedAmount);

        const totalAmount = calculateTotalAmount(amounts)

        console.log(totalAmount);
        
        if(approvedAmount<totalAmount){
            const approvedHash = await writeContractAsync({
                abi:erc20Abi,
                address:tokenAddress,
                functionName:"approve",
                args:[spenderContractAddress,BigInt(totalAmount)]
            }) 

            console.log(approvedHash);
            

            const transationReceipt = await waitForTransactionReceipt(config,{
                hash:approvedHash
            }) 

            console.log(transationReceipt);
            
        }

        const transactionHash = await writeContractAsync({
            abi:tsenderAbi,
            address:spenderContractAddress,
            functionName:"airdropERC20",
            args:[tokenAddress,
                recipientsAddress.split(/[,\n]+/).map(addr => addr.trim()).filter(addr => addr !== ''),
                amounts.split(/[,\n]+/).map(amt => amt.trim()).filter(amt => amt !== ''),
                BigInt(totalAmount),
            ]
        })

        console.log(transactionHash);

        const transationReceipt1 = await waitForTransactionReceipt(config,{
            hash:transactionHash
        })

        console.log(transationReceipt1);
        
        
        
        
        
        
  }

   
  

  return (
    <div className="bg-black px-5 py-4">
      <div className="bg-white p-5 border-1 border-green-700 min-h-screen">
        <form>
          <h3 className="text-3xl font-medium mb-4">T-Sender</h3>
          <h3 className="text-base text-gray-600">Token Address</h3>
          <input
            onChange={(e) => {
              setTokenAddress(e.target.value);
            }}
            type="text"
            placeholder="1A1zP.......Lmva"
            className="border-1 border-gray-300 w-full px-3 py-2 rounded-lg mb-10"
          />
          <h3 className="text-base text-gray-600">Recipients</h3>
          <textarea
            onChange={(e) => {
              setRecipientsAddress(e.target.value);
            }}
            rows={4}
            type="text"
            placeholder="5QGefi........2DMPTfT"
            className="border-1 border-gray-300 w-full px-3 py-2 rounded-lg mb-10"
          />
          <h3 className="text-base text-gray-600">Amounts</h3>
          <textarea
            onChange={(e) => {
              setAmounts(e.target.value);
            }}
            large
            rows={4}
            type="text"
            placeholder="100,200"
            className="border-1 border-gray-300 w-full px-3 py-2 rounded-lg mb-4"
          />
          <button className="w-full bg-green-600 text-white py-1 text-lg rounded-lg font-medium" onClick={(e)=>{
            submitHandler(e)
          }}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AirDropForm;
