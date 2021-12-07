// SPDX-License-Identifier: BSD 3-Clause
pragma solidity 0.8.4;

import {ERC1238} from './ERC1238.sol';

import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

/**
    @title Bulgari Christmas Gift
    @author Maxim Gaina
    @notice 
        Mints Limited Edition of a Digital Artwork as Non-Transferable
        NFTs that represent gifts for guests invited to a physical event.
        The number of minted tokens can be less than Edition Limit
        (i.e. NFT claiming guests can be less than the invited) 
    @dev No more than a single token can be minted per each guest
 */
contract BulgariGift is ERC1238, Ownable {
    using Counters for Counters.Counter;

    /// @notice Used as token ID
    /// @dev Starts from 1, since 0 can also mean that no token has been minted
    Counters.Counter private _giftCounter;

    /// @notice Maximum number of NFTs
    uint256 private _editionLimit;

    /// @notice For locking in case there are less than `_editionLimit` guests
    bool private _editionEnded;

    constructor(
        string memory tokenName_,
        string memory tokenSymbol_,
        uint256 invitedGuests_
    ) ERC1238(tokenName_, tokenSymbol_) {
        _editionLimit = invitedGuests_;
        _editionEnded = false;
    }

    /// @return Number of minted tokens
    function mintedTokens() public view returns (uint256) {
        return _giftCounter.current();
    }

    /// @return Limit for this token edition
    function editionLimit() public view returns (uint256) {
        return _editionLimit;
    }

    /// @return `true` if minting is closed, `false` otherwise
    function editionEnded() public view returns (bool) {
        return _editionEnded;
    }

    /**
        @notice Contract owner mints token if edition is still open
        @param `_tokenURI` gift artwork identifier
        @param `to` guest address
        @return Number of minted tokens that is also token ID
     */
    function mintToken(address to, string memory tokenURI)
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
        ERC1238._setTokenURI(_giftCounter.current(), tokenURI);

        return _giftCounter.current();
    }

    /**
        @notice End minting before edition limit is reached
        @dev Locks the contract forever
        @return `true` if minting is till open, reverts otherwise
     */
    function endEdition() public onlyOwner returns (bool) {
        require(_editionEnded == false, 'Edition has already ended');

        _editionEnded = true;

        return _editionEnded;
    }
}
