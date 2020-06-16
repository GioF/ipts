import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 300px;

  float: right;
  padding: 15px 10px;

  background: linear-gradient(
      90deg,
      rgba(149, 174, 175, 0.09) 0%,
      rgba(255, 255, 255, 0) 25%
    ),
    #3b3e3f;
`;

export const Address = styled.div`
  width: 100%;
  height: 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: #282828;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;

  font-size: 12px;
  padding: 0px 6px;

  .plb {
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 100%;
  }
`;

export const Status = styled.div`
  width: 10px;
  height: 10px;

  border-radius: 50%;

  float: right;
  background-color: ${(props) => (props.online ? "#2CC506" : "red")};
  box-shadow: 0px 0px 8px ${(props) => (props.online ? "#2CC506" : "red")};
`;
