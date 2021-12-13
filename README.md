<div align='center'>
<img src='./bvlgrart.png' />
</div>

<h1 align='center'>Bulgari Gift Smartcontract</h1>

Polygon Address - [0xea58a24502f065a8cd53b94424d7b0e82b6e697c](https://polygonscan.com/address/0xea58a24502f065a8cd53b94424d7b0e82b6e697c#readContract)

Mints Limited Edition of a Digital Artwork as Non-Transferable NFTs. Each minted token can be given to a participant invited to a physical event. The contract:
* only allows contract owner to mint new tokens
* mints no more than one token for the same guest
* mints no more tokens than the amount of invited guests
* allows to forever end minting before reaching the number of invited guests (some guests may not claim it)
* tokens aren't burnable

## Why Non-Transferable NFTs
The ownership of this token is (a) a public statement about the holder, is (b) a possible set of rights over the digital artwork it encapsulates, and (c) must serve no lucrative purposes. Standards such as `ERC-721` or `ERC-1155` are too complex for the use-case and require disabling some of their core functionalities (especially for ensuring (c)). This Smartcontract leverages ideas from the `ERC-1238` [standard discussion](https://github.com/ethereum/EIPs/issues/1238), can be improved in multiple ways, and poses itself as the first of a series of experimentations.

## Usage

### Environment Variables
Make sure to define the following variables within the execution environment:
```
export PRIVATE_KEY = '...'
export POLYGON_RPC_URL = '...'
export POLYGON_MUMBAI_RPC_URL = '...'
```
Alternately, they can be managed in other ways from `hardhat.config.js`.

### Testing
```
# Clone repository
git clone https://github.com/reasonedart/bulgari-gift-contract.git

# Go into the repository
cd bulgari-gift-contract

# Install dependencies
yarn install

# Compile Smartcontract
npx hardhat compile

# Test Smartcontract
npx hardhat test
```

### Deployment
```
# Deploy locally
npx hardhat run scripts/deploy.js

# OR, deploy on Polygon testnet
npx hardhat run scripts/deploy.js --network mumbai
```