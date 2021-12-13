require('@nomiclabs/hardhat-waffle');

require('./tasks/accounts');
require('./tasks/balance');
require('./tasks/block-number');

require('dotenv').config();

const POLYGON_RPC_URL = process.env.POLYGON_RPC_URL || 'NO_POLYGON_RPC_URL';
const POLYGON_MUMBAI_RPC_URL =
    process.env.POLYGON_MUMBAI_RPC_URL || 'POLYGON_MUMBAI_RPC_URL';
const PRIVATE_KEY = process.env.PRIVATE_KEY || 'NO_PRIV_KEY';

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    defaultNetwork: 'hardhat',

    networks: {
        localhost: {
            url: 'http://localhost:8545',
        },
        polygon: {
            url: POLYGON_RPC_URL,
            accounts: [PRIVATE_KEY],
        },
        mumbai: {
            url: POLYGON_MUMBAI_RPC_URL,
            accounts: [PRIVATE_KEY],
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
