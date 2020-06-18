import { useEffect, useState, useContext } from "react";
import React from "react";
import { Container, FolderInput } from "./styles";

import Chapter from "./chapter";
import Dock from "./dock";
import { IpfsContext } from "../../App";
import { blinkWithMessage } from "../../utils";
import { useRef } from "react";

export default function Reading() {
  const { ipfs, ipfsState } = useContext(IpfsContext);
  const [cid, setCid] = useState();
  const formRef = useRef(null);
  const [formInput, setFormInput] = useState();

  function updateFolder(event) {
    event.preventDefault();

    //checks if CID belongs to folder and alerts user if it doesn't
    async function validateCid() {
      ipfs.files
        .stat(`/ipfs/${formInput}`)
        .then((stats) => {
          if (stats.type === "directory") {
            formRef.current.style.backgroundColor = "rgb(48, 130, 48)";
            setTimeout(() => setCid(formInput), 500);
          } else {
            blinkWithMessage(formRef, "CID must belong to a UNIXFS folder");
          }
        })
        .catch(() => {
          blinkWithMessage(formRef, "Must be a valid CID");
        });
    }
    validateCid();
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
            ref={formRef}
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
