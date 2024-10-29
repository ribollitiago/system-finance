// src/components/Login/Login.js
import React, { useState } from "react";
import { Container, Form, Input, Button, LinkButton, Error } from "./styles"; 
import { auth } from "../../firebase"; // Certifique-se de importar a configuração do Firebase

const Login = ({ handleLogin, goToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      handleLogin(); // Notifica o App que o login foi bem-sucedido
    } catch (err) {
      setError("Falha no login. Verifique suas credenciais.");
    }
  };

  return (
    <Container>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        {error && <Error>{error}</Error>}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Entrar</Button>
        <LinkButton type="button" onClick={goToRegister}>
          Não tem uma conta? Registre-se
        </LinkButton>
      </Form>
    </Container>
  );
};

export default Login;
