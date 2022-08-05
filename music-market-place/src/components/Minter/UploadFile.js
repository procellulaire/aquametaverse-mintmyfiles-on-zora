import React,{useState} from "react";
import { Alert,Button,Container,Form,Spinner } from "react-bootstrap";
export default function UploadFile() {
    const [alert, setAlert] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const[isLoading,setIsLoading] = useState(false)
    const [file, setFile] = useState();
    const handleOnChangeFile = (e) => {
        setFile(e.target.files[0]);
      };

      const mintFile = () =>{

      }
  return (
    <Container className="my-5">
        <h2>Mint a new File to IPFS</h2>
      <p>Powered by NFT.Storage</p>
      <p>Select your file from your device to be minted on IPFS</p>
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
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Choose your File</Form.Label>
          <Form.Control type="file" onChange={handleOnChangeFile} />
        </Form.Group>
        <Button
          color="primary"
          outline
          circle
          onClick={mintFile}
          disabled={isLoading}
        >
          {isLoading ? <Spinner animation="border" /> : "Mint Your File"}
        </Button>
      </Form>
    </Container>
  );
}
