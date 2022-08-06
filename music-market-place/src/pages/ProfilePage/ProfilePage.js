import React, { useState } from 'react';
import styles from './Profile.css';
import { useMoralisQuery } from "react-moralis";
import { UserContext } from "../../context/UserContext";
// import { useQuery } from 'react-query';
// import { request, gql } from 'graphql-request';
// import { NFTPreview } from "@zoralabs/nft-components";
// import { NFTPreview, MediaConfiguration } from '@zoralabs/nft-components';

const endpoint = 'https://api.zora.co/graphql';



const collectionNFT = `
  {
    tokens(
      networks: [{ network: ETHEREUM, chain: MAINNET }]
      pagination: { limit: 500 }
      where: { ownerAddresses: "0xa8c22791Ff769D5246B41252bcfB8F11df036F78" }
    ) {
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

export default function ProfilePage() {
  const [data, setData] = useState([]);

  React.useEffect(() => {
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: collectionNFT }),
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data.data.tokens.nodes);
        console.log(data.data.tokens.nodes);
      });
  }, []);

  return (
    <div>
      <h1>Profile Page </h1>

      <ul>
        {data.map((launch) => (
          <div key={launch.token.tokenId}>
            <h1>{launch.token.name}</h1>
            <div>
              <iframe
                // src='https://api.blitmap.com/v1/png/393'
                // src={`https://embed.zora.co/${launch.token.collectionAddress}/2260?title=true&controls=false&loop=true&autoplay=true&market=false`}
                src={launch.token.image.url}
                width={"540px"}
                height={"450px"}
              />
            </div>
            <p>Collection Address: {launch.token.collectionAddress}</p>
            <p>Owner: {launch.token.metadata.description}</p>
            <p>Owner: {launch.token.owner}</p>
            <p>Owner: {launch.token.image.url}</p>
            {/* <img src='https://api.blitmap.com/v1/png/393' alt="nft image" /> */}
          </div>
        ))}
      </ul>
    </div>
  );
}

{
  /* <div className={styles.out}>
        <div className={styles.now}>
          <iframe
            src="https://embed.zora.co/0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7/5846?title=false&controls=false&loop=false&autoplay=false"
            width="100%"
            height="100%"
            scrolling="no"
            allowtransparency="true"
            allowfullscreen="true"
            sandbox="allow-pointer-lock allow-same-origin allow-scripts allow-popups"
          ></iframe>
        </div>
      </div> */
}


{/* <div style="width: 100%; max-width: 1240px; margin: 0 auto; position: relative;">
    <style>
      .nft-embed-wrapper > iframe {
        width: 100%!important;
        height:100%!important;
        border: 0;
        position: absolute;
        top: 0;
        left: 0;
      }
    </style>
    <div class="nft-embed-wrapper" style="position: relative; width:100%; height:0; padding-bottom: calc(100% + 112px);"><iframe src="https://embed.zora.co/0x8d04a8c79cEB0889Bdd12acdF3Fa9D207eD3Ff63/1?title=true&controls=false&loop=true&autoplay=true&market=false" width="100%" height="100%" scrolling="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-pointer-lock allow-same-origin allow-scripts allow-popups"></iframe></div>
  </div> */}