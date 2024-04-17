require("hardhat-gas-reporter");
require('hardhat-contract-sizer');
require("solidity-coverage");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();



//npx hardhat run scripts/deployMultisig.js --network polygon_amoy

async function deployMultiSig(_pk, _nodeURL) {

    console.log("deploy MultiSig")
    var net = hre.network.name

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
    } else if (net == "harmony_testnet") {
        console.log("multisig contract deployed to:", "https://explorer.pops.one/address/" + multisig.address);
        console.log("    transaction hash:", "https://explorer.pops.one/tx/" + multisig.deployTransaction.hash);
    } else if (net == "harmony_mainnet") {
        console.log("multisig contract deployed to:", "https://explorer.harmony.one/address/" + multisig.address);
        console.log("    transaction hash:", "https://explorer.harmony.one/tx/" + multisig.deployTransaction.hash);
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
        console.log("multisig contract deployed to:", "https://mumbai.polygonscan.com/address/" + multisig.address);
        console.log("    transaction hash:", "https://mumbai.polygonscan.com/tx/" + multisig.deployTransaction.hash);
    } else if (net == "arbitrum_testnet"){
        console.log("multisig contract deployed to:","https://explorer.arbitrum.io/#/ "+ multisig.address)
        console.log("    transaction hash:", "https://explorer.arbitrum.io/#/tx/" + multisig.deployTransaction.hash);
    }  else if (net == "xdaiSokol"){ //https://blockscout.com/poa/xdai/address/
      console.log("multisig contract deployed to:","https://blockscout.com/poa/sokol/address/"+ multisig.address)
      console.log("    transaction hash:", "https://blockscout.com/poa/sokol/tx/" + multisig.deployTransaction.hash);
    } else if (net == "xdai"){ //https://blockscout.com/poa/xdai/address/
      console.log("multisig contract deployed to:","https://blockscout.com/xdai/mainnet/address/"+ multisig.address)
      console.log("    transaction hash:", "https://blockscout.com/xdai/mainnet/tx/" + multisig.deployTransaction.hash);
    } else if (net == "chiado") {
      console.log("multisig contract deployed to:", "https://blockscout.chiadochain.net/address/" + multisig.address);
      console.log("    multisig transaction hash:", "https://blockscout.chiadochain.net/tx/" + multisig.deployTransaction.hash);  
    } else if (net == "optimism_testnet") {
        console.log("multisig contract deployed to:", "https://goerli-optimism.etherscan.io/address/" + multisig.address);
        console.log("    multisig transaction hash:", "https://goerli-optimism.etherscan.io/tx/" + multisig.deployTransaction.hash);
    } else if (net == "tfilecoin") {
        console.log("multisig contract deployed to:", "https://calibration.filfox.info/en/address/" + multisig.address);
        console.log("    multisig transaction hash:", "https://calibration.filfox.info/en/tx/" + multisig.deployTransaction.hash);
    } else if (net == "filecoin") {
        console.log("multisig contract deployed to:", "https://filfox.info/en/address/" + multisig.address);
        console.log("    multisig transaction hash:", "https://filfox.info/en/tx/" + multisig.deployTransaction.hash);
    }  else if (net == "sepolia") {
        console.log("multisig contract deployed to:", "https://sepolia.etherscan.io/address/" + multisig.address);
        console.log("    multisig transaction hash:", "https://sepolia.etherscan.io/tx/" + multisig.deployTransaction.hash);
    }  else if (net == "manta_testnet") {
        console.log("multisig contract deployed to:", "https://manta-testnet.calderaexplorer.xyz/address/" + multisig.address);
        console.log("    multisig transaction hash:", "https://manta-testnet.calderaexplorer.xyz/tx/" + multisig.deployTransaction.hash);  
    }  else if (net == "manta") {
        console.log("multisig contract deployed to:", "https://pacific-explorer.manta.network//address/" + multisig.address);
        console.log("    multisig transaction hash:", "https://pacific-explorer.manta.network//tx/" + multisig.deployTransaction.hash);  
  
    }  else if (net == "base_testnet") {
        console.log("multisig contract deployed to:", "https://basescan.org/address/" + multisig.address);
        console.log("    multisig transaction hash:", "https://basescan.org/tx/" + multisig.deployTransaction.hash);  
   
    }  else if (net == "mantle_testnet") {
        console.log("multisig contract deployed to:", "https://explorer.testnet.mantle.xyz/address" + multisig.address);
        console.log("    multisig transaction hash:", "https://explorer.testnet.mantle.xyz/tx/" + multisig.deployTransaction.hash);  
    }  else if (net == "mantle") {
        console.log("multisig contract deployed to:", "https://explorer.mantle.xyz/address/" + multisig.address);
        console.log("    multisig transaction hash:", "https://explorer.mantle.xyz/tx/" + multisig.deployTransaction.hash);  
    }  else if (net == "zkevm_testnet") {
        console.log("multisig contract deployed to:", "https://cardona-zkevm.polygonscan.com/address/" + multisig.address);
        console.log("    multisig transaction hash:", "https://cardona-zkevm.polygonscan.com/tx/" + multisig.deployTransaction.hash);  
    }  else if (net == "linea") {
        console.log("multisig contract deployed to:", "https://lineascan.build/address/" + multisig.address);
   }  else if (net == "linea_testnet") {
        console.log("multisig contract deployed to:", "https://goerli.lineascan.build/address/" + multisig.address);
    }  else if (net == "europa"){ 
        console.log("multisig deployed to:","https://elated-tan-skat.explorer.mainnet.skalenodes.com/address/"+ multisig.address)
         }  else if (net == "europa_testnet"){ 
        console.log("multisig  deployed to:","https://juicy-low-small-testnet.explorer.testnet.skalenodes.com/address/"+ multisig.address)
    }  else if (net == "holesky"){ 
        console.log("multisig  deployed to:","https://holesky.etherscan.io/address/"+ multisig.address)
    }  else if (net == "kyoto_testnet"){ 
        console.log("multisig  deployed to:","https://testnet.kyotoscan.io/address/"+ multisig.address)
        
    }  else if (net == "polygon_amoy"){ 
        console.log("multisig  deployed to:","https://amoy.polygonscan.com/address/"+ multisig.address)
    

    }else {
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


  deployMultiSig(process.env.TESTNET_PK, process.env.NODE_URL_POLYGON_AMOY)
    .then(() => process.exit(0))
    .catch(error => {
	  console.error(error);
	  process.exit(1);
  });