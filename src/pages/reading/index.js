import { useEffect, useState, useContext } from "react";
import React from "react";
import { Container, FolderInput } from "./styles";

import Chapter from "./chapter";
import Dock from "./dock";
import { IpfsContext } from "../../App";

export default function Reading() {
  const { ipfs, ipfsState } = useContext(IpfsContext);
  const [cid, setCid] = useState();
  const [formInput, setFormInput] = useState();

  function updateFolder(event) {
    event.preventDefault();
    setCid(formInput);
  }

  return (
    <Container>
      {cid ? (
        <>
          <Chapter ipfs={ipfs} cid={cid} />
        </>
      ) : (
        <form onSubmit={updateFolder}>
          <FolderInput
            style={{
              backgroundImage: `url(${require("../../res/ipfsindicator.svg")})`,
            }}
            type="text"
            placeholder="Insert folder CID"
            onChange={(event) => setFormInput(event.target.value)}
          />
          <button type="hidden" />
        </form>
      )}
      <Dock width={"300"}>{/*TODO: add list components*/}</Dock>
    </Container>
  );
}
