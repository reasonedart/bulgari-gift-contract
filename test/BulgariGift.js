const { expect } = require('chai');

const artwork = 'QmQBrJMRYbtJdM84Ra6Mj8wQMvLRBkrtyRgBpnahfBrr4H';

let bulgariGift = null;

let owner = null;
let guest = null;
let attacker = null;

describe('Bulgari Christmas Gift Smartcontract', function () {
    it('Should be deployed with right parameters', async function () {
        const name = 'Bulgari Christmas Gift';
        const symbol = 'BVLG';
        const guests = 50;

        const BulgariGift = await ethers.getContractFactory('BulgariGift');
        bulgariGift = await BulgariGift.deploy(name, symbol, guests);

        await bulgariGift.deployed();

        expect(await bulgariGift.name()).to.equal(name);
        expect(await bulgariGift.symbol()).to.equal(symbol);

        expect(await bulgariGift.mintedTokens()).to.equal(0);
        expect(await bulgariGift.editionLimit()).to.equal(guests);
        expect(await bulgariGift.editionEnded()).to.equal(false);
    });

    it('Should mint new token if sender is contract owner', async function () {
        [owner, guest, attacker, ...others] = await ethers.getSigners();

        await bulgariGift.mintToken(guest.address, artwork);

        expect(await bulgariGift.mintedTokens()).to.equal(1);
        expect(await bulgariGift.tokenURI(1)).to.equal(artwork);
    });

    it('Should deny token minting for non-owners', async function () {
        await expect(
            bulgariGift.connect(attacker).mintToken(attacker.address, artwork)
        ).to.be.revertedWith('Ownable: caller is not the owner');
    });

    it("Shouldn't mint more than one gift for the same user", async function () {
        await expect(bulgariGift.mintToken(guest.address, artwork)).to.be.revertedWith(
            'Owner already has a token'
        );
    });

    it("Shouldn't be able to mint more than 50 tokens", async function () {
        const guests = await bulgariGift.editionLimit();
        const mintedTokens = await bulgariGift.mintedTokens();

        for (let i = mintedTokens; i < guests; i++) {
            const guest = ethers.Wallet.createRandom();

            await bulgariGift.mintToken(guest.address, artwork);
        }

        const illegalGuest = ethers.Wallet.createRandom();

        await expect(
            bulgariGift.mintToken(illegalGuest.address, artwork)
        ).to.be.revertedWith(
            'Maximum number of this Limited Edition has already been minted'
        );
    });

    it("Shouldn't mint after ending an edition", async function () {
        await bulgariGift.endEdition();

        const illegalGuest = ethers.Wallet.createRandom();

        await expect(
            bulgariGift.mintToken(illegalGuest.address, artwork)
        ).to.be.revertedWith('Gift Edition can no longer be minted');

        await expect(bulgariGift.endEdition()).to.be.revertedWith(
            'Edition has already ended'
        );
    });
});
