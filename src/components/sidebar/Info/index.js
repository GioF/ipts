import React from "react";
import { Container, Address, Status } from "./styles";

export default function ConnectionInfo() {
  return (
    <Container>
      <Address>
        <div className="plb">
          Placeholder {/*TODO: add context to get ipfs data*/}
        </div>
        <Status /> {/*TODO: add context to get node status*/}
      </Address>
    </Container>
  );
}
