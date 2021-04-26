require('@nomiclabs/hardhat-waffle');

require('./tasks/accounts');
require('./tasks/balance');
require('./tasks/block-number');

require('dotenv').config();

const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL || 'NO_MAINNET_RPC_URL';
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || 'NO_RINKEBY_RPC_URL';
const KOVAN_RPC_URL = process.env.KOVAN_RPC_URL || 'NO_KOVAN_RPC_URL';
const MNEMONIC = process.env.MNEMONIC || 'NO_MNEMONIC';
const PRIVATE_KEY = process.env.PRIVATE_KEY || 'NO_PRIV_KEY';
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || 'NO_ETHERSCAN_API_KEY';

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    defaultNetwork: 'hardhat',

    networks: {
        hardhat: {
            // // If you want to do some forking, uncomment this
            // forking: {
            //   url: MAINNET_RPC_URL
            // }
        },
        localhost: {},
        kovan: {
            url: KOVAN_RPC_URL,
            accounts: [PRIVATE_KEY],
            saveDeployments: true,
            // accounts: {
            //     mnemonic: MNEMONIC,
            // },
        },
        rinkeby: {
            url: RINKEBY_RPC_URL,
            accounts: [PRIVATE_KEY],
            saveDeployments: true,
            // accounts: {
            //     mnemonic: MNEMONIC,
            // },
        },
        ganache: {
            url: 'http://localhost:8545',
            accounts: {
                mnemonic: MNEMONIC,
            },
        },
    },

    etherscan: {
        // Your API key for Etherscan
        // Obtain one at https://etherscan.io/
        apiKey: ETHERSCAN_API_KEY,
    },

    roles: {
        deployer: {
            default: 0, // first account as deployer
            1: 0, // similarly on mainnet it will take the first account as deployer
        },
    },

    solidity: {
        version: '0.7.3',
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },

    // solidity: {
    //     compilers: [
    //         {
    //             version: "0.6.6"
    //         },
    //         {
    //             version: "0.4.24"
    //         }
    //     ]
    // },

    paths: {
        sources: './contracts',
        tests: './test',
        cache: './cache',
        artifacts: './artifacts',
    },

    mocha: {
        timeout: 91000,
    },
};
