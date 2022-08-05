import React, { useState, useEffect, useContext } from "react";
import { Row,Col } from "react-bootstrap";
import { useMoralisQuery } from "react-moralis";
import { UserContext } from "../../context/UserContext";

export default function ShowFile() {
  const { wallet } = useContext(UserContext);
  const [myFiles, setMyFiles] = useState([]);
  const { fetch } = useMoralisQuery(
    "FilesMinted",
    (query) => query.equalTo("minter_address", wallet),
    [],
    { autoFetch: false }
  );
  const getFiles = () => {
    fetch({
      onSuccess: (data) => {
        console.log("myFiles", data);
        setMyFiles(data);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };
  useEffect(() => {
    console.log("wallet", wallet);
    if (wallet) {
      getFiles();
    }
  }, [wallet]);
  return (
    <div>
      <h3>Your Minted File</h3>
      <hr />
      <div>
        <Row>
          {myFiles &&
            myFiles.map((item, idx) => {
              return (
                <Col lg={2} key={idx}>
                  <input type="radio" name="myfiles" value={item.get("CID")} />
                  <img src={`https://nftstorage.link/ipfs/${item.get("CID")}`} className="w-100"/>
                </Col>
              );
            })}
        </Row>
      </div>
    </div>
  );
}
