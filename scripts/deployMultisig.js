require("hardhat-gas-reporter");
require('hardhat-contract-sizer');
require("solidity-coverage");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();



//npx hardhat run scripts/deployMultisig.js --network rinkeby

async function deployMultiSig(_network, _pk, _nodeURL) {

    console.log("deploy MultiSig")
    var net = _network

    await run("compile")

    //Connect to the network
    let privateKey = _pk;
    var provider = new ethers.providers.JsonRpcProvider(_nodeURL) 
    let wallet = new ethers.Wallet(privateKey, provider);
    const multis = await ethers.getContractFactory("contracts/OriginalMultis/MultiSigWalletWithDailyLimit.sol:MultiSigWalletWithDailyLimit", wallet);
    var multisigSigner = await multis.connect(wallet);
    //address[] _owners, uint _required, uint _dailyLimit
    const multisig = await multisigSigner.deploy(["0x3564e17d5f6b7c9a3c6bd6248bf7b3eeb4927e50","0x0d7effefdb084dfeb1621348c8c70cc4e871eba4","0x2a4ea8464bd2dac1ad4f841dcc7a8efb4d84a27d"],2,0);
    console.log("multisig deployed to:", multisig.address);
    await multisig.deployed();

    if (net == "mainnet"){
        console.log("multisig contract deployed to:", "https://etherscan.io/address/" + multisig.address);
        console.log("    transaction hash:", "https://etherscan.io/tx/" + multisig.deployTransaction.hash);
    } else if (net == "rinkeby") {
        console.log("multisig contract deployed to:", "https://rinkeby.etherscan.io/address/" + multisig.address);
        console.log("    transaction hash:", "https://rinkeby.etherscan.io/tx/" + multisig.deployTransaction.hash);
    } else if (net == "bsc_testnet") {
        console.log("multisig contract deployed to:", "https://testnet.bscscan.com/address/" + multisig.address);
        console.log("    transaction hash:", "https://testnet.bscscan.com/tx/" + multisig.deployTransaction.hash);
    } else if (net == "bsc") {
        console.log("multisig contract deployed to:", "https://bscscan.com/address/" + multisig.address);
        console.log("    transaction hash:", "https://bscscan.com/tx/" + multisig.deployTransaction.hash);
    } else if (net == "polygon") {
        console.log("multisig contract deployed to:", "https://explorer-mainnet.maticvigil.com/" + multisig.address);
        console.log("    transaction hash:", "https://explorer-mainnet.maticvigil.com/tx/" + multisig.deployTransaction.hash);
    } else if (net == "polygon_testnet") {
        console.log("multisig contract deployed to:", "https://explorer-mumbai.maticvigil.com/" + multisig.address);
        console.log("    transaction hash:", "https://explorer-mumbai.maticvigil.com/tx/" + multisig.deployTransaction.hash);
    } else if (net == "arbitrum_testnet"){
        console.log("multisig contract deployed to:","https://explorer.arbitrum.io/#/ "+ multisig.address)
        console.log("    transaction hash:", "https://explorer.arbitrum.io/#/tx/" + multisig.deployTransaction.hash);
    }  else if (net == "xdaiSokol"){ //https://blockscout.com/poa/xdai/address/
      console.log("multisig contract deployed to:","https://blockscout.com/poa/sokol/address/"+ multisig.address)
      console.log("    transaction hash:", "https://blockscout.com/poa/sokol/tx/" + multisig.deployTransaction.hash);
    } else if (net == "xdai"){ //https://blockscout.com/poa/xdai/address/
      console.log("multisig contract deployed to:","https://blockscout.com/xdai/mainnet/address/"+ multisig.address)
      console.log("    transaction hash:", "https://blockscout.com/xdai/mainnet/tx/" + multisig.deployTransaction.hash);
    } else {
        console.log("Please add network explorer details")
    }


    // Wait for few confirmed transactions.
    // Otherwise the etherscan api doesn't find the deployed contract.
    console.log('waiting for tx confirmation...');
    await multisig.deployTransaction.wait(10)

    console.log('submitting contract for verification...');

    await run("verify:verify", {
      address: multisig.address ,
      constructorArguments: [["0x3564e17d5f6b7c9a3c6bd6248bf7b3eeb4927e50","0x0d7effefdb084dfeb1621348c8c70cc4e871eba4","0x2a4ea8464bd2dac1ad4f841dcc7a8efb4d84a27d"],2,0]
    },
    )

    console.log("Contract verified")

  };

  deployMultiSig("rinkeby", process.env.PRIVATE_KEY, process.env.NODE_URL_RINKEBY)
    .then(() => process.exit(0))
    .catch(error => {
	  console.error(error);
	  process.exit(1);
  });