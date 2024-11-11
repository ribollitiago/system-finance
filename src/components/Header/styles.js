import styled from "styled-components";

export const Container = styled.div`
  height: 180px;
  text-align: center;
  background: #76ABAE;
`;

export const Title = styled.div`
  padding-top: 20px;
  color: #fff;
  font-size: 25px; 
  font-weight: bold; 
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

export const LogoutButton = styled.button`
  margin-top: 20px; 
  padding: 10px 15px;
  color: #fff;
  background-color: #dc3545; 
  border: none;
  border-radius: 5px;
  cursor: pointer;
  
  /* Adicionando a sombra */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #c82333; 
    /* Sombra mais forte ao passar o mouse */
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.3);
  }
`;

