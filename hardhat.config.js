require("hardhat-gas-reporter");
require('hardhat-contract-sizer');
require("solidity-coverage");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.3",
        settings: {
          optimizer: {
            enabled: true,
            runs: 300
          }
        }
      },
      {
        version: "0.4.15",
        settings: {
          optimizer: {
            enabled: true,
            runs: 300
          }
        }
      },
      {
        version: "0.5.3",
        settings: {
          optimizer: {
            enabled: true,
            runs: 300
          }
        }
      }
    ]
  },
  networks: {
    hardhat: {
      hardfork: process.env.CODE_COVERAGE ? "berlin" : "london",
      initialBaseFeePerGas: 0,
      accounts: {
        mnemonic:
          "nick lucian brenda kevin sam fiscal patch fly damp ocean produce wish",
        count: 40,
      },
      forking: {
        url: "https://eth-mainnet.alchemyapi.io/v2/7dW8KCqWwKa1vdaitq-SxmKfxWZ4yPG6"
      },
      allowUnlimitedContractSize: true
    },
    rinkeby: {
         url: `${process.env.NODE_URL_RINKEBY}`,
         seeds: [process.env.TESTNET_PK],
         gas: 10000000,
         gasPrice: 40000000000
    },
    ropsten: {
      url: `${process.env.NODE_URL_ROPSTEN}`,
      seeds: [process.env.TESTNET_PK],
      gas: 10000000,
      gasPrice: 40000000000
 },
      // mainnet: {
      //   url: `${process.env.NODE_URL_MAINNET}`,
      //   accounts: [process.env.PRIVATE_KEY],
      //   gas: 10000000 ,
      //   gasPrice: 50000000000
      // }
      // ropsten: {
      //   url: `${process.env.NODE_URL_ROPSTEN}`,
      //   accounts: [process.env.TESTNET_PK],
      //   gas: 10000000 ,
      //   gasPrice: 50000000000
      // }
      // kovan: {
      //   url: `${process.env.NODE_URL_KOVAN}`,
      //   accounts: [process.env.TESTNET_PK],
      //   gas: 10000000 ,
      //   gasPrice: 50000000000
      // }
      // goerli: {
      //   url: `${process.env.NODE_URL_GOERLI}`,
      //   accounts: [process.env.TESTNET_PK],
      //   gas: 10000000 ,
      //   gasPrice: 50000000000
      // }
      // bsc_testnet: {
      //   url: `${process.env.NODE_URL_BSC_TESTNET}`,
      //   accounts: [process.env.TESTNET_PK],
      //   gas: 10000000 ,
      //   gasPrice: 50000000000
      // }
      polygon_testnet: {
        url: `${process.env.NODE_URL_MUMBAI}`,
        seeds: [process.env.TESTNET_PK],
        gas: 3000000 ,
        gasPrice: 50000000000
      }//,
      // polygon: {
      //   url: `${process.env.NODE_URL_MATIC}`,
      //   accounts: [process.env.PRIVATE_KEY],
      //   gas: 2000000 ,
      //   gasPrice: 250000000000
      // }
      // arbitrum_testnet: {
      //   url: `${process.env.NODE_URL_ARBITRUM_TESTNET}`,
      //   accounts: [process.env.TESTNET_PK],
      //   gas: 10000000 ,
      //   gasPrice: 50000000000
      // }
      // harmony_testnet: {
      //   url: `${process.env.NODE_URL_HARMONY_TESTNET}`,
      //   accounts: [process.env.TESTNET_PK],
      //   gas: 10000000 ,
      //   gasPrice: 50000000000
      // }
      harmony_mainnet: {
        url: `${process.env.NODE_URL_HARMONY_MAINNET}`,
        accounts: [process.env.MAINNET_PK],
        gas: 10000000 ,
        gasPrice: 50000000000
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.POLYSCAN
    //apiKey: process.env.ETHERSCAN
  },

  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },

}