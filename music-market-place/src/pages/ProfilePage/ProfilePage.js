import React, { useState, useContext } from 'react';
import { request, gql } from 'graphql-request';
import { useQuery } from 'react-query';
import { UserContext } from '../../context/UserContext';
import { Container } from 'react-bootstrap';
import { NFTPreview, MediaConfiguration } from '@zoralabs/nft-components';
import { Networks, Strategies } from '@zoralabs/nft-hooks';
import { useNFT, useNFTMetadata } from '@zoralabs/nft-hooks';

const endpoint = 'https://api.zora.co/graphql';
const zdkStrategyMainnet = new Strategies.ZDKFetchStrategy(Networks.MAINNET);
// function MyNFT() {
//   const { data } = useNFT('0xF3f6d930D8E2f80799DD6c78Fe646e4c616dc9D5', '20')

//   return (
//     <div>
//       <h3>{data.metadata.name}</h3>
//       <p>{data.metadata.description}</p>
//       <p>Owned by: {data.nft.owner.address}</p>
//     </div>
//   )
// }

export default function ProfilePage() {
  const [data, setData] = useState([]);
  const { wallet, isAuth } = useContext(UserContext);


  React.useEffect(() => {
    const collectionNFT = `query myNfts {
      tokens(networks: [{network: ETHEREUM, chain: RINKEBY}], 
            pagination: {limit: 3}, 
            where: {ownerAddresses: ${wallet}}) {
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
    fetch('https://api.zora.co/graphql', {
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
    <Container className="my-5">
      <div>
        <h1>Profile Page: {wallet}</h1>
        <p className="my-0 py-0 text-muted">Powered by Zora.API and nft-hook</p>
        <ul>
          {data.map((launch, index) => (
            <li key={launch.tokenId}>
              <h4>{index + 1}</h4>
              


              <MediaConfiguration networkId="1" strategy={zdkStrategyMainnet}>
                <NFTPreview
                  contract={`${launch.token.collectionAddress}`}
                  id={`${launch.token.tokenId}`}
                  onClick={function noRefCheck() {}}
                />
              </MediaConfiguration>

              <h6>{launch.token.name}</h6>
              <p>{launch.token.owner}</p>
              <p>{launch.token.metadata.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
