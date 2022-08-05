import { NFTStorage } from "nft.storage/dist/bundle.esm.min.js";
import React, { useContext, useState } from "react";
import { Alert, Button, Container, Form, Spinner } from "react-bootstrap";
import { NFTContext } from "../../context/NFTContext";
import { StepContext } from "../../context/StepContext";
import { UserContext } from "../../context/UserContext";
import { saveFileToMintFiles } from "../../helpers/FileData";
import { useMoralisQuery } from "react-moralis";

export default function UploadFile() {
  const [alert, setAlert] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState();
  const [myFiles, setMyFiles] = useState([]);
  const { isAuth, wallet } = useContext(UserContext);
  const { nft, setNft } = useContext(NFTContext);
  const { step, setStep } = useContext(StepContext);

  const handleOnChangeFile = (e) => {
    setFile(e.target.files[0]);
    console.log("file", e.target.files[0]);
  };

  // const { fetch } = useMoralisQuery(
  //   "FilesMinted",
  //   (query) => query.equalTo("minter_address", wallet),
  //   [],
  //   { autoFetch: false }
  // );
  // const getFiles = (fileData) => {
  //   fetch({
  //     onSuccess: (data) => {
  //       console.log("myFiles", data);

  //       if (data.length > 0) {
  //         const temp = data.filter((d) => {
  //           d.get("fileName") === fileData.name &&
  //             d.get("fileSize") === fileData.size;
  //         });
  //         console.log("temp", temp);
  //         setMyFiles(temp);
  //       }
  //     },
  //     onError: (error) => {
  //       console.error(error);
  //     },
  //   });
  // };

  const mintFile = async () => {
    setIsLoading(true);
    const client = new NFTStorage({ token: process.env.REACT_APP_NFT_STORAGE });
    if (isAuth) {
      //check whether the file uploaded prev
      // getFiles(file);
      // if (myFiles.length > 0) {
      //   setAlert({
      //     type: "danger",
      //     message: `It seems that you already uploaded this file.`,
      //     title: "Duplicate upload!",
      //   });
      // }
      const cid = await client.storeBlob(file);
      console.log("cid", cid);
      setNft({ ...nft, CID: cid });
      saveFileToMintFiles(file, wallet, cid);

      setIsLoading(false);
      setAlert({
        type: "success",
        message: `Your file has been uploaded to IPFS successfully. CID: ${cid}`,
        title: "Upload Successfully!",
      });
      setStep(1);
    } else {
      setAlert({
        type: "danger",
        message: "You are not logged in yet. Please Login first",
        title: "Error",
      });
      setShowAlert(true);
      setIsLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <h2 className="my-0 py-0">Mint a new File to IPFS</h2>
      <p className="my-0 py-0 text-muted">Powered by NFT.Storage</p>
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
        <Button color="primary" onClick={mintFile} disabled={isLoading}>
          {isLoading ? <Spinner animation="border" /> : "Mint Your File"}
        </Button>
      </Form>
    </Container>
  );
}
