require("hardhat-gas-reporter");
require('hardhat-contract-sizer');
require("solidity-coverage");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
const fetch = require('node-fetch-polyfill')
const path = require("path")
const loadJsonFile = require('load-json-file')
const web3 = require('web3');


//npx hardhat run scripts/submitTransaction.js --network harmony_mainnet
//npx hardhat run scripts/submitTransaction.js --network mainnet

async function submitTx(net) {
    try {
        if (net == "harmony_mainnet") {
            var network = "harmony_mainnet"
            var etherscanUrl = "https://explorer.harmony.one/"
            var tellorGnosisSafeAddress = '0x73B6715D9289bdfE5e758bB7ace782Cc7C933cfC'
            var pubAddr = process.env.PUBLIC_KEY
            var privKey = process.env.PRIVATE_KEY
            var nodeURL = process.env.NODE_URL_HARMONY
        } else  if (net == "mainnet") {
          var network = "mainnet"
          var etherscanUrl = "https://etherscan.io/"
          var tellorGnosisSafeAddress = '0x39e419ba25196794b595b2a595ea8e527ddc9856'
          var pubAddr = process.env.PUBLIC_KEY
          var privKey = process.env.PRIVATE_KEY
          var nodeURL = process.env.NODE_URL_HARMONY

        } else {
           console.log( "network not defined")
        }
        console.log(1)
        console.log("Tellor multis ", tellorGnosisSafeAddress)
        console.log("nework", network)
    } catch (error) {
        console.error(error)
        console.log("network error or environment not defined")
        process.exit(1)
    }
    console.log("interact with wallet")
    await run("compile")

    console.log("connecting to network")
    try {
        var provider = new ethers.providers.JsonRpcProvider(nodeURL) 
        let wallet = new ethers.Wallet(privKey, provider);
        var multis = await ethers.getContractAt("contracts/OriginalMultis/MultiSigWalletWithDailyLimit.sol:MultiSigWalletWithDailyLimit", tellorGnosisSafeAddress)
        var multisigSigner = await multis.connect(wallet)
    } catch (error) {
        console.error(error)
        console.log("wallet signer is ready")
        process.exit(1)
    }

    console.log("getting owners and verifying connection")
    try{
        let owners = await multis.getOwners();
        console.log("Owners", owners)
    } catch (error) {
        console.error(error)
        console.log("cannot read owners")
        process.exit(1)
    }
    
    console.log("Submitting a tx for approval")
    try{
      //submitTransaction(address destination, uint256 value, bytes data)
      //this is just an example but to send ETH(or native token, I think) vars can be 0x, 
      //now how do I use this 
      let vars = ethers.utils.defaultAbiCoder.encode(['uint256', 'uint256', 'uint256'], [web3.utils.toWei("100000"),.025*10000,86400*90])
      console.log("vars", vars)
        let tx = await multisigSigner.submitTransaction(address destination, uint256 value, vars);

        // var link = "".concat(etherscanUrl, '/tx/', tx.hash)
        // var ownerlink = "".concat(etherscanUrl, '/address/', tellorGnosisSafeAddress)
        // console.log("Hash link: ", link)
        // console.log("Contract link: ", ownerlink)
        // console.log('Waiting for the transaction to be mined');
        // await tx.wait() // If there's an out of gas error the second parameter is the receipt.

    } catch (error) {
      console.error(error)
      console.log("no tx call")
      process.exit(1)
}





}



submitTx("harmony_mainnet", process.env.MAINNET_PK, process.env.NODE_URL_HARMONY_MAINNET)
//submitTx("mainnet", process.env.MAINNET_PK, process.env.NODE_URL_MAINNET)
.then(() => process.exit(0))
.catch(error => {
console.error(error);
process.exit(1);
});