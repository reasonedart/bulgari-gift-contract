task(
    'block-number',
    'Prints the current block number',
    async (_) => {
        await ethers.provider.getBlockNumber().then((blockNumber) => {
            console.log('Current block number: ' + blockNumber);
        });
    }
);

module.exports = {};
