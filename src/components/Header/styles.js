// src/components/Header/styles.js
import styled from "styled-components";

export const Container = styled.div`
  height: 160px;
  text-align: center;
  background: #76ABAE;
`;

export const Header = styled.h1``;

export const Title = styled.div`
  padding-top: 20px;
  color: #fff;
`;

export const LogoutButton = styled.button`
  margin-top: 20px; // Espaço entre o título e o botão
  padding: 10px 15px;
  color: #fff;
  background-color: #dc3545; // Cor do botão de logout
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c82333; // Cor ao passar o mouse
  }
`;
