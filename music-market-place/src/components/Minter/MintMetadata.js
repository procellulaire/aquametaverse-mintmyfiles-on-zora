import React, { useState } from "react";
import { Button, Container, Form, Alert,Row,Col,Spinner } from "react-bootstrap";

export default function MintMetadata() {
  const [form, setForm] = useState({});
  const [alert, setAlert] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [metadata, setMetadata] = useState();
  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };
  const handleOnChangeFile = (e) => {
    setForm({ ...form, file: e.target.value });
  };
  const mintMetadata = () =>{

  }

  return (
    <Container>
      <h2 className="my-0 py-0">Mint Metadata for your minted file</h2>
      <p className="my-0 py-0 text-muted">Powered by NFT.Storage</p>
      <p>Fill the form to link meta data with your NFT file</p>
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
      <Form className="my-5">
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>your Metadata Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a name for your Metadata"
            onChange={handleOnChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="author">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Author Name"
            onChange={handleOnChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="twitter">
          <Form.Label>Link to twitter</Form.Label>
          <Form.Control
            type="text"
            placeholder="Creator Twitter"
            onChange={handleOnChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="telegram">
          <Form.Label>Link to Telegram</Form.Label>
          <Form.Control
            type="text"
            placeholder="Creator Telegram "
            onChange={handleOnChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="portfolio">
          <Form.Label>Link to Protfolio</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Creator portfolio Link"
            onChange={handleOnChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} onChange={handleOnChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="loyality">
          <Form.Label>Loyality</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Loyality"
            onChange={handleOnChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="percentage">
          <Form.Label>Percentage</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Creator Percentage"
            onChange={handleOnChange}
          />
        </Form.Group>
        <Form.Group controlId="file_url" className="mb-3">
          <Form.Label>Choose From your files</Form.Label>
          <Row>
            {myFiles &&
              myFiles.map((item, index) => {
                return (
                  <Col key={index}>
                    <input
                      type="radio"
                      name="imgbackground"
                      id={item.ipfs_uri.replace("ipfs://", "").replace("/", "")}
                      className="d-none imgbgchk"
                      value={item.ipfs_url}
                      onChange={handleOnChangeFile}
                    />
                    <label
                      htmlFor={item.ipfs_uri
                        .replace("ipfs://", "")
                        .replace("/", "")}
                    >
                      <img
                        src={item.ipfs_url}
                        alt={item.file_name}
                        className=" rounded"
                      />
                      <div className="tick_container">
                        <div className="tick">
                          <i className="fa fa-check"></i>
                        </div>
                      </div>
                    </label>
                  </Col>
                );
              })}
          </Row>
        </Form.Group>

        <Button color="primary" outline circle onClick={mintMetadata}>
          {isLoading ? <Spinner animation="border" /> : "Mint Metadata "}
        </Button>
      </Form>
    </Container>
  );
}
