import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 70px;

  position: fixed;
  top: 0;
  z-index: 9999;
  
  display: flex
  flex-direction: row;

  background-color: #3B3E3F;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);

  .div {
    float: left;
  }
`;

export const NavButton = styled.div`
  width: 100px;

  float: left;

  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;

  background-color: inherit;
  transition: background-color 300ms;

  &:hover {
    background-color: #555a5b;
  }
`;
