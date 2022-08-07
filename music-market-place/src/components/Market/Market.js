import React, { useEffect,useState } from "react";

import { ZDK ,ZDKNetwork,ZDKChain} from "@zoralabs/zdk";
import { Networks, Strategies } from "@zoralabs/nft-hooks"

import { NFTPreview,MediaConfiguration } from "@zoralabs/nft-components";
import {Card, Container, Row,Col} from 'react-bootstrap'

const API_ENDPOINT = "https://api.zora.co/graphql";
const networkInfo = {
  network: ZDKNetwork.Ethereum,
  chain: ZDKChain.Mainnet,
}
const zdkArgs = { 
  endPoint: API_ENDPOINT, 
  networks: [networkInfo], 
} 

const zdkStrategyMainnet = new Strategies.ZDKFetchStrategy(
  Networks.MAINNET
)
const zdk = new ZDK(zdkArgs) 

export default function Market() {
  const [ asksNFT, setAsksNFT] = useState({
    "contractAddress": "0x7e6663E45Ae5689b313e6498D22B041f4283c88A",
    "tokenId": "1"
  })

  const [ offersNFT, setOffersNFT] = useState({
    "contractAddress": "0x7e6663E45Ae5689b313e6498D22B041f4283c88A",
    "tokenId": "2"
  })

  const [ auctionsNFT, setAuctionsNFT] = useState({
    "contractAddress": "0x7e6663E45Ae5689b313e6498D22B041f4283c88A",
    "tokenId": "3"
  })

  const [collectionData, setCollectionData] = useState([]);
  useEffect(() => {
    const args = {
      where: {collectionAddresses: [
          "0xCa21d4228cDCc68D4e23807E5e370C07577Dd152",
          "0xc729Ce9bF1030fbb639849a96fA8BBD013680B64",
          "0x42069ABFE407C60cf4ae4112bEDEaD391dBa1cdB"
       
        ]
      },
      includeFullDetails: false
    }
    const response =  zdk.collections(args).then((res) => {console.log(res);
    setCollectionData(res.collections.nodes)})

    
  }, []);

  return <Container>
    <Row>
    <Col>
    <MediaConfiguration
        networkId="1"                        
        strategy={zdkStrategyMainnet}
        strings={{
          CARD_OWNED_BY: "",
          CARD_CREATED_BY: "",       
                              
        }}
        style={{
          theme: {
            previewCard: {
              background: "white",
              height: "200px",
              width: "200px"                                    
            },
            defaultBorderRadius: 0,
            lineSpacing: 0,
            textBlockPadding: "0"                
          },              
        }}
      >
        <NFTPreview
                contract={asksNFT.contractAddress}
                id={asksNFT.tokenId}
                showBids={false}
                showPerpetual={false}
              />
      </MediaConfiguration> </Col>
      <Col>
    <MediaConfiguration
        networkId="1"                        
        strategy={zdkStrategyMainnet}
        strings={{
          CARD_OWNED_BY: "",
          CARD_CREATED_BY: "",       
                              
        }}
        style={{
          theme: {
            previewCard: {
              background: "white",
              height: "200px",
              width: "200px"                                    
            },
            defaultBorderRadius: 0,
            lineSpacing: 0,
            textBlockPadding: "0"                
          },              
        }}
      >
        <NFTPreview
                contract={offersNFT.contractAddress}
                id={offersNFT.tokenId}
                showBids={false}
                showPerpetual={false}
              />
      </MediaConfiguration> </Col>
      <Col>
    <MediaConfiguration
        networkId="1"                        
        strategy={zdkStrategyMainnet}
        strings={{
          CARD_OWNED_BY: "",
          CARD_CREATED_BY: "",       
                              
        }}
        style={{
          theme: {
            previewCard: {
              background: "white",
              height: "200px",
              width: "200px"                                    
            },
            defaultBorderRadius: 0,
            lineSpacing: 0,
            textBlockPadding: "0"                
          },              
        }}
      >
        <NFTPreview
                contract={auctionsNFT.contractAddress}
                id={auctionsNFT.tokenId}
                showBids={false}
                showPerpetual={false}
              />
      </MediaConfiguration> </Col>
    </Row>
  </Container>;
}
