import React from "react";
import { Container, NavButton } from "./styles";

import { ReactComponent as MenuIcon } from "../../res/menuicon.svg";
import { ReactComponent as ReadingIcon } from "../../res/readingicon.svg";
import { ReactComponent as TranslatingIcon } from "../../res/translationicon.svg";
import { ReactComponent as UploadIcon } from "../../res/uploadicon.svg";
import ConnectionInfo from "./Info";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <Container>
      <NavButton>
        <MenuIcon />
      </NavButton>
      <NavLink to={"/reading"} activeStyle={{ backgroundColor: "#555a5b" }}>
        <NavButton>
          <ReadingIcon />
        </NavButton>
      </NavLink>
      <NavLink to={"/translation"} activeStyle={{ backgroundColor: "#555a5b" }}>
        <NavButton>
          <TranslatingIcon />
        </NavButton>
      </NavLink>
      <NavLink to={"/add"} activeStyle={{ backgroundColor: "#555a5b" }}>
        <NavButton>
          <UploadIcon />
        </NavButton>
      </NavLink>
      <ConnectionInfo />
    </Container>
  );
}
