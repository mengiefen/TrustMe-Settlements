import { ERC20_ABI, signer } from "@/constants/interact";
import { ethers } from "ethers";


export const getSymbol = async (tokenAddress: string) => {
    const tokenContract = await new ethers.Contract(tokenAddress, ERC20_ABI, signer)
    const symbol = await tokenContract.symbol()
    return symbol
}