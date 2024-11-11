import styled from "styled-components";

export const Table = styled.table`
  width: 98%;
  background-color: #28303B;
  padding: 20px;
  border-radius: 0px 0px 20px 20px;
  max-width: 1120px;
  margin: 0px auto;
  margin-bottom: 50px;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width + "%" : "auto")};
`;
