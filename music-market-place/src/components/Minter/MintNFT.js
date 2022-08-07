import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  Form,
  Alert,
  Row,
  Col,
  Dropdown,
  Button,
  Spinner,
  Card,
} from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import { NFTContext } from "../../context/NFTContext";
import { StepContext } from "../../context/StepContext";
import Moralis from "moralis";
import { zoraMinter, zoraNFT } from "../../contracts";
import { useMoralis } from "react-moralis";
import { generateSHA256FileHash } from "./../../utils/hash";

export default function MintNFT() {
  const [form, setForm] = useState({});
  const [alert, setAlert] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { nft, setNft } = useContext(NFTContext);
  const { wallet, isAuth } = useContext(UserContext);
  const { step, setStep } = useContext(StepContext);
  const { isWeb3Enabled, enableWeb3 } = useMoralis();
  const [isOpenEdition,setIsOpenEdition] = useState(false);

  useEffect(() => {
    getMeta();
  }, []);

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    console.log("value", e.target.value);
    if (e.target.id==="edition") {
      if (e.target.value === "Open Edition") {
        setIsOpenEdition(true)
      }
      else{
        setIsOpenEdition(false)
      }
    }
  };

  const getMeta = async () => {
    const params = { theUrl: `https://ipfs.io/ipfs/${nft.CID}/metadata.json` };
    const metadata = await Moralis.Cloud.run("fetchJson", params);
    console.log("metadata", metadata);
    setForm({
      ...form,
      name: metadata.data.name,
      description: metadata.data.description,
      author: metadata.data.author,
      collection: metadata.data.collection,
    });
  };
  //const { isWeb3Enabled, enableWeb3 } = useMoralis();
  const mintNFT = async () => {
    if (!isWeb3Enabled) {
      console.log("enable web3");
      enableWeb3();
    }
    const animHash = nft.file
      ? await generateSHA256FileHash(nft.file)
      : "0x0000000000000000000000000000000000000000000000000000000000000000";
    const imgHash = nft.cover
      ? await generateSHA256FileHash(nft.cover)
      : "0x0000000000000000000000000000000000000000000000000000000000000000";
    const ethers = Moralis.web3Library;
    const writeOptions = {
      contractAddress: zoraMinter[80001],
      functionName: "createEdition",
      abi: zoraMinter.abi,
      params: {
        _name: form.name,
        _symbol: form.symbol,
        _description: form.description,
        _animationUrl: `ipfs://${nft.CID}/${nft.file.name}`,
        _animationHash: animHash,
        _imageUrl: `ipfs://${nft.CID}/${nft.cover.name}`,
        _imageHash: imgHash,
        _editionSize: form.editionSize,
        _royaltyBPS: form.royalty * 100,
      },
    };

    Moralis.executeFunction(writeOptions).then((response) =>{
      console.log("implementation", response);
    })
    
  };

  return (
    <Container className="my-5">
      <h2 className="my-0 py-0">Mint NFT</h2>
      <p className="my-0 py-0 text-muted">Powered by Zora</p>
      {showAlert && (
        <Alert
          variant={alert.type}
          onClose={() => setShowAlert(false)}
          dismissible
        >
          <Alert.Heading>{alert.title}</Alert.Heading>
          <p>{alert.message}</p>
        </Alert>
      )}
      <Row>
        <Col lg={6}>
          <Form className="my-5">
            <p>
              Please fill the details to mint your NFT and add it to marketplace
            </p>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label> Name</Form.Label>
              <Form.Control type="text" disabled value={form.name} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="symbol">
              <Form.Label> Symbol</Form.Label>
              <Form.Control
                type="text"
                placeholder="Symbol $SYB"
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label> Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Description"
                disabled
                value={form.description}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="price">
              <Form.Label> Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="0.01"
                onChange={handleOnChange}
              />
            </Form.Group>

            <Row>
              <Col lg={6}>
                <Form.Group className="mb-3" >
                  <Form.Label> Edition Size</Form.Label>

                  <div>
                    <select
                      id="edition"
                      onChange={handleOnChange}
                      className="dropdown-toggle btn btn-success"
                    >
                      <option value="Open Edition">Open Edition</option>
                      <option value="Fixed">Fixed</option>
                    </select>
                  </div>
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group className="mb-3" controlId="editionSize">
                  <Form.Label> Edition</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="10"
                    onChange={handleOnChange}
                    disabled={isOpenEdition}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="startTime">
                  <Form.Label> Start Time (Optional)</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder={new Date().toDateString()}
                    onChange={handleOnChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="endTime">
                  <Form.Label> End Time(Optional)</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder={new Date().toDateString()}
                    onChange={handleOnChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="royalty">
              <Form.Label> Royalty (%)</Form.Label>
              <Form.Control
                type="text"
                placeholder="10"
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="payout">
              <Form.Label> Payout address</Form.Label>
              <p><small>This is the address which payouts will be transfered to</small></p>
              <Form.Control
                type="text"
                placeholder="0x987654..."
                onChange={handleOnChange}
              />
            </Form.Group>
            <Button color="primary" onClick={mintNFT}>
              {isLoading ? <Spinner animation="border" /> : "Mint To IPFS "}
            </Button>
          </Form>
        </Col>
        <Col lg={6}>
          <Card className="mb-2">
            <Card.Body>
              <img
                src={`https://nftstorage.link/ipfs/${nft.CID}/${nft.cover.name}`}
                className="w-100"
              />
            </Card.Body>
          </Card>
          <Card className="mt-2">
            <Card.Body>
              <object
                data={`https://nftstorage.link/ipfs/${nft.CID}/${nft.file.name}`}
                className="w-100"
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
