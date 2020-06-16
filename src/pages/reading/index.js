import { useEffect, useState, useContext } from "react";
import React from "react";
import { Container } from "./styles";

import Chapter from "./chapter";
import Dock from "./dock";
import { IpfsContext } from "../../App";

export default function Reading() {
  const { ipfs, ipfsState } = useContext(IpfsContext);
  const [nodeInfo, setNodeInfo] = useState();
  const [CID, setCID] = useState();
  const [formInput, setFormInput] = useState();

  function updateFolder(event) {
    event.preventDefault();
    setCID(formInput);
  }

  useEffect(() => {
    if (ipfsState) {
      ipfs.id().then(setNodeInfo).catch(console.log);

      if (process.env.NODE_ENV === "development") {
        ipfs.swarm
          .connect(process.env.REACT_APP_IPFS_MULTIADDR)
          .then(console.log("connected to dev node"))
          .catch(console.log);
      }
    }
  }, [ipfs, ipfsState]);

  return (
    <Container>
      {ipfsState && nodeInfo
        ? `Node set with id ${nodeInfo.id}`
        : "Node not set yet"}
      <form onSubmit={updateFolder}>
        <input
          type="text"
          placeholder="Insert folder CID"
          onChange={(event) => setFormInput(event.target.value)}
        />
        <button type="submit">Get files</button>
      </form>
      <Chapter ipfs={ipfs} cid={CID} />
      <Dock width={"300"}>{/*TODO: add list components*/}</Dock>
    </Container>
  );
}
