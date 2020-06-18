import styled from "styled-components";

export const Container = styled.div`
  min-height: 100%;
  width: 100%;

  padding-right: 300px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  form {
    display: block;
    margin: auto;
    margin-top: calc(50vh - 70px);
  }
`;

export const FolderInput = styled.input`
  height: 40px;
  width: 500;

  background-color: #4e5761;
  border-radius: 11px;
  padding: 6px 15px 6px 46px;
  resize: none;

  font-size: 24px;
  color: #282828;
  background-position: 10px 4px;
  background-repeat: no-repeat;

  transition: background-color 200ms;
`;
