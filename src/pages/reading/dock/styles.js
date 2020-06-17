import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: ${(props) => props.size}px;

  position: fixed;
  right: 0px;

  background-color: #3b3e3f;
`;
