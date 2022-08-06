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
  Card
} from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import { NFTContext } from "../../context/NFTContext";
import { StepContext } from "../../context/StepContext";

export default function MintNFT() {
  const [form, setForm] = useState({});
  const [alert, setAlert] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { nft, setNft } = useContext(NFTContext);
  const { wallet, isAuth } = useContext(UserContext);
  const { step, setStep } = useContext(StepContext);

  useEffect(() => {
    getMetadata();
  }, []);

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const getMetadata = () => {
    fetch(`https://ipfs.io/ipfs/${nft.CID}/metadata.json`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (jsonData) {
        console.log("myJson", jsonData);
        setForm({
          ...form,
          name: jsonData.name,
          description: jsonData.description,
          author: jsonData.author,
          collection: jsonData.collection,
        });
      });
  };

  const mintNFT = () => {};

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
              <Form.Label> Symbol</Form.Label>
              <Form.Control
                type="text"
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
            <Form.Group className="mb-3" controlId="editionSize">
              <Form.Label> EditionSize</Form.Label>
              <Dropdown onChange={handleOnChange}>
                <Dropdown.Toggle variant="success">
                  Edition Size
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Open Edition</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Fixed</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group className="mb-3" controlId="edition">
              <Form.Label> Edition</Form.Label>
              <Form.Control
                type="text"
                placeholder="10"
                onChange={handleOnChange}
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="startTime">
                  <Form.Label> Start Time (Optional)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="0.01"
                    onChange={handleOnChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="endTime">
                  <Form.Label> End Time(Optional)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="0.01"
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
          <Card>
            <Card.Body>
              <img src={`https://nftstorage.link/ipfs/${nft.CID}/${nft.cover.name}`} className="w-100" />
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <object data={`https://nftstorage.link/ipfs/${nft.CID}/${nft.file.name}`} className="w-100" />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
