// SPDX-License-Identifier: BSD 3-Clause
pragma solidity 0.8.4;

interface IERC1238 {
    // @dev Emitted when `tokenId` token is minted to `to`, an address.
    event Minted(
        address indexed to,
        uint256 indexed tokenId,
        uint256 timestamp
    );

    // @dev Emitted when `tokenId` token is burned.
    event Burned(
        address indexed owner,
        uint256 indexed tokenId,
        uint256 timestamp
    );

    // @dev Returns the badge's name
    function name() external view returns (string memory);

    // @dev Returns the badge's symbol.
    function symbol() external view returns (string memory);

    // @dev Returns the ID of the token owned by `owner`, if it owns one, and 0 otherwise
    function tokenOf(address owner) external view returns (uint256);

    // @dev Returns the owner of the `tokenId` token.
    function ownerOf(uint256 tokenId) external view returns (address);
}
