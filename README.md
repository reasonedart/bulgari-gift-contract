# hardhat-boilerplate

## Hardhat
 - `npm init`
 - `npm install --save-dev hardhat`
 - `npx hardhat`
 - `npx hardhat accounts`
 - `npx hardhat compile`
 - `npx hardhat test`
 - `npx hardhat run scripts/sample-script.js`
 - `npx hardhat node` start a local node
 - `npx hardhat run scripts/sample-script.js --network localhost` run scripts on the local ndoe

## dotenv
 - `npm install dotenv`
 - `code ~/.bashrc` to add environment variables to be used in `hardhat.config.js`
    - `export KOVAN_RPC_URL = '...'` for any network from Alchemy or Infura
    - `export MNEMONIC = ''` or `export PRIVATE_KEY` to use you dapp through existing wallet

## Prettier
 - `npm install prettier`
 