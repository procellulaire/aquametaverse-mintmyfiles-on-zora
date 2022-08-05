import React, { useContext, useState,useEffect } from "react";
import { Button, Container, Form, Alert,Row,Col,Spinner } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import { NFTContext } from "../../context/NFTContext";
import ShowFile from "./ShowFile";
import { NFTStorage } from "nft.storage/dist/bundle.esm.min.js";
import { StepContext } from "../../context/StepContext";

export default function MintMetadata() {
  const [form, setForm] = useState({});
  const [alert, setAlert] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [metadata, setMetadata] = useState();
  const { nft, setNft } = useContext(NFTContext);
  const {wallet,isAuth} = useContext(UserContext)
  const { step, setStep } = useContext(StepContext);

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };
//   const handleOnChangeFile = (e) => {
//     setForm({ ...form, file: e.target.value });
//   };
  
  const mintMetadata = async() =>{
    setIsLoading(true);
    const client = new NFTStorage({ token: process.env.REACT_APP_NFT_STORAGE });
    if(isAuth){
        const blob = new Blob([JSON.stringify(form, null, 2)], {type : 'application/json'});
        const cid = await client.storeBlob(blob);
        console.log("cid", cid);
        setForm({ ...form, CID: cid});
      setNft({ ...nft, metadata: form });

      setIsLoading(false);
      setAlert({
        type: "success",
        message: `Your metadata has been uploaded to IPFS successfully. CID: ${cid}`,
        title: "Upload Successfully!",
      });
      setStep(2);
    }
    else {
        setAlert({
          type: "danger",
          message: "You are not logged in yet. Please Login first",
          title: "Error",
        });
        setShowAlert(true);
        setIsLoading(false);
      }
  }

  return (
    <Container>
      <h2 className="my-0 py-0">Mint Metadata for your minted file</h2>
      <p className="my-0 py-0 text-muted">Powered by NFT.Storage</p>
      
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
      <p>Fill the form to link meta data with your NFT file</p>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label> Title</Form.Label>
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
        <Form.Group className="mb-3" controlId="edition">
          <Form.Label>Edition</Form.Label>
          <Form.Control
            type="text"
            placeholder="Music Edition Name"
            onChange={handleOnChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="collection">
          <Form.Label>Collection</Form.Label>
          <Form.Control
            type="text"
            placeholder="Music Collection Name"
            onChange={handleOnChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} onChange={handleOnChange} />
        </Form.Group>
        
        <Form.Group controlId="file_url" className="mb-3">
          <Form.Label>Your Minted File</Form.Label>
          <img src={`https://nftstorage.link/ipfs/${nft.CID}`} className="w-100"/>
         
        </Form.Group>

        <Button color="primary"  onClick={mintMetadata}>
          {isLoading ? <Spinner animation="border" /> : "Mint Metadata "}
        </Button>
      </Form>
    </Container>
  );
}
