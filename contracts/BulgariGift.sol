//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import {ERC1238} from './ERC1238.sol';

import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract BulgariGift is ERC1238, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _giftCounter;

    uint256 private _editionLimit;
    bool private _editionEnded;

    constructor(
        string memory _tokenName,
        string memory _tokenSymbol,
        uint256 invitedGuests
    ) ERC1238(_tokenName, _tokenSymbol) {
        _editionLimit = invitedGuests;
        _editionEnded = false;
    }

    function mintedTokens() public view returns (uint256) {
        return _giftCounter.current();
    }

    function editionLimit() public view returns (uint256) {
        return _editionLimit;
    }

    function editionEnded() public view returns (bool) {
        return _editionEnded;
    }

    function mintToken(address to, string memory _tokenURI)
        public
        virtual
        onlyOwner
        returns (uint256)
    {
        require(_editionEnded == false, 'Gift Edition can no longer be minted');
        require(
            _giftCounter.current() < _editionLimit,
            'Maximum number of this Limited Edition has already been minted'
        );

        _giftCounter.increment();

        ERC1238._mint(to, _giftCounter.current());
        ERC1238._setTokenURI(_giftCounter.current(), _tokenURI);

        return _giftCounter.current();
    }

    function endEdition() public onlyOwner returns (bool) {
        require(_editionEnded == false, 'Edition has already ended');

        _editionEnded = true;

        return _editionEnded;
    }
}
