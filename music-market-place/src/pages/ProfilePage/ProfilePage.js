import React, { useState } from 'react';
import { request, gql } from 'graphql-request';
import { useQuery } from 'react-query';

const endpoint = 'https://api.zora.co/graphql';

const collectionNFT = gql`
  {
    tokens(
      networks: [{ network: ETHEREUM, chain: MAINNET }]
      pagination: { limit: 3 }
      where: { ownerAddresses: "jacob.eth" }
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
  const [data, setData] = useState([])


  React.useEffect(() => {
    fetch('https://api.zora.co/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: collectionNFT }),
    })
      .then((response) => response.json())
      .then((data) => {setData(data.data.tokens.nodes)
      console.log(data.data.tokens.nodes)});
  }, []);



  return (
    <div>
      <h1>Profile Page</h1>
      <ul>
        {data.map((launch) => (
          <li key={launch.tokenId}>{launch.token.metadata.name}</li>
        ))}
      </ul>
    </div>
  );
}
