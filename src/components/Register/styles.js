// src/components/Register/styles.js
import styled from "styled-components";

export const Container = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 2rem;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

export const Button = styled.button`
  padding: 10px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const LinkButton = styled.button`
  padding: 10px;
  color: #007bff;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const Error = styled.button`
  color: "red";
  fontSize: "0.9rem";
`;
