import React, { useContext, useState, useEffect } from "react";
import { Container, Address, Status } from "./styles";
import { IpfsContext } from "../../../App";

export default function ConnectionInfo() {
  const { ipfs, ipfsState } = useContext(IpfsContext);
  const [state, setState] = useState("");

  useEffect(() => {
    if (ipfsState) ipfs.id().then(setState).catch(console.log);
  }, [ipfs, ipfsState]);

  return (
    <Container>
      <Address>
        <div className="plb">{state ? state.id : "Loading..."}</div>
        <Status online={ipfsState} />
      </Address>
    </Container>
  );
}
