const { utils } = require('ethers');

task('balance', "Prints an account's balance")
    .addParam('account', "The account's address")
    .setAction(async (taskArgs) => {
        const balance = await ethers.provider.getBalance(taskArgs.account);

        console.log(utils.formatEther(balance));
    });

module.exports = {};
