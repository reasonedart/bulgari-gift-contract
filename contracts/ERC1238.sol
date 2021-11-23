//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import {IERC1238} from './IERC1238.sol';

contract ERC1238 is IERC1238 {
    // Badge's name
    string private _name;

    // Badge's symbol
    string private _symbol;

    // Mapping from token ID to owner's address
    mapping(uint256 => address) private _owners;

    // Mapping from owner's address to token ID
    mapping(address => uint256) private _tokens;

    // Mapping from token ID to token URI
    mapping(uint256 => string) private _tokenURIs;

    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    // Returns the badge's name
    function name() public view virtual override returns (string memory) {
        return _name;
    }

    // Returns the badge's symbol
    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }

    // Returns the token ID owned by `owner`, if it exists, and 0 otherwise
    function tokenOf(address owner)
        public
        view
        virtual
        override
        returns (uint256)
    {
        require(owner != address(0), 'Invalid owner at zero address');

        return _tokens[owner];
    }

    // Returns the owner of a given token ID, reverts if the token does not exist
    function ownerOf(uint256 tokenId)
        public
        view
        virtual
        override
        returns (address)
    {
        require(tokenId != 0, 'Invalid tokenId value');

        address owner = _owners[tokenId];

        require(owner != address(0), 'Invalid owner at zero address');

        return owner;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        returns (string memory)
    {
        require(
            _exists(tokenId),
            'URI query for nonexistent token'
        );

        return _tokenURIs[tokenId];
    }

    // Checks if a token ID exists
    function _exists(uint256 tokenId) internal view virtual returns (bool) {
        return _owners[tokenId] != address(0);
    }

    // @dev Mints `tokenId` and transfers it to `to`.
    function _mint(
        address to,
        uint256 tokenId
    ) internal virtual {
        require(to != address(0), 'Invalid owner at zero address');
        require(tokenId != 0, 'Token ID cannot be zero');
        require(!_exists(tokenId), 'Token already minted');
        require(tokenOf(to) == 0, 'Owner already has a token');

        _tokens[to] = tokenId;
        _owners[tokenId] = to;

        emit Minted(to, tokenId, block.timestamp);
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI)
        internal
        virtual
    {
        require(
            _exists(tokenId),
            'URI set of nonexistent token'
        );
        _tokenURIs[tokenId] = _tokenURI;
    }

    // @dev Burns `tokenId`.
    function _burn(uint256 tokenId) internal virtual {
        address owner = ERC1238.ownerOf(tokenId);

        delete _tokens[owner];
        delete _owners[tokenId];

        emit Burned(owner, tokenId, block.timestamp);
    }
}
