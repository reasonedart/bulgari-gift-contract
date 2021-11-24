require('@nomiclabs/hardhat-waffle');

require('./tasks/accounts');
require('./tasks/balance');
require('./tasks/block-number');

require('dotenv').config();

const POLYGON_RPC_URL = process.env.POLYGON_RPC_URL || 'NO_POLYGON_RPC_URL';
const POLYGON_MUMBAI_RPC_URL =
'https://polygon-mumbai.g.alchemy.com/v2/WaThHKR4s91jlsCnvLYuCcAHwoIADrnz';
const RART_PRIVATE_KEY = process.env.RART_PRIVATE_KEY || 'NO_RART_PRIVATE_KEY';
const PRIVATE_KEY = process.env.PRIVATE_KEY || 'NO_PRIV_KEY';
const ETHERSCAN_API_KEY =
    process.env.ETHERSCAN_API_KEY || 'NO_ETHERSCAN_API_KEY';

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
        localhost: {
            url: 'http://localhost:8545',
        },
        polygon: {
            url: POLYGON_RPC_URL,
            accounts: [RART_PRIVATE_KEY],
        },
        mumbai: {
            url: POLYGON_MUMBAI_RPC_URL,
            accounts: [PRIVATE_KEY],
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
        version: '0.8.4',
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
