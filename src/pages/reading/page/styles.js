import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: inline-block;

  overflow: overlay;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Box = styled.div`
  position: absolute;
  width: ${(props) => props.size[0]}%;
  height: ${(props) => props.size[1]}%;
  left: ${(props) => props.position[0]}%;
  top: ${(props) => props.position[1]}%;
  background-color: rgba(0, 0, 0, 0.5);

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    transition-duration: 500ms;
  }
`;
