import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
`;

export const Controller = styled.div`
  background-color: rgba(255, 255, 255, 4%);
  color: rgba(0, 0, 0, 25%);
  height: 100%;
  width: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover{
    background-color: rgba(255, 255, 255, 40%);
    transition-duration: 300ms;
`;
