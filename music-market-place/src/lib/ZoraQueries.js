const contractAddress="0xfd6A56eD7b5ccC4C57c3ac91Dc011B95d8Cc3b98"

export const allMintedTokensQuery = `{
    tokens(networks: [{network: ETHEREUM, chain: RINKEBY}], pagination: {limit: 5}, where: {collectionAddresses: ${contractAddress}}) {
      nodes {
        token {
          collectionAddress
          tokenId
          name
          owner
          image {
            url
          }
          metadata
        }
      }
    }
  }
  `;
// export const allMintedTokensQuery = `{
//     Token(
//       where: { address: { _eq: "${contractAddress}" } }
//       order_by: { tokenId: asc }
//       limit: 20
//     ) {
//       tokenId
//       address
//       minter
//       owner
//       metadata {
//         json
//       }
//     }
//   }`;

  export const allV3Asks = `{
    V3Ask(where: {tokenContract: {_eq: "${contractAddress}"}}, order_by: {tokenId:asc}, limit: 20) {
      address
      askCurrency
      askPrice
      buyer
      finder
      findersFeeBps
      id
      lastFilledEvent {
        id
      }
      seller
      sellerFundsRecipient
      status
      tokenContract
      tokenId
    }
  }`;
