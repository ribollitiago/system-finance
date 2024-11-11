import styled from "styled-components";

export const Container = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
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
  width: 100%;
  width: 400px;
`;

export const Button = styled.button`
  padding: 10px;
  color: #fff;
  background-color: #76ABAE;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const LinkButton = styled.button`
  padding: 10px;
  color: #76ABAE;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const Error = styled.button`
  color: "red";
  fontSize: "0.9rem";
`;
