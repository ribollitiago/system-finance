import React, { useState } from "react";
import { Container, Form, Input, Button, LinkButton, Error } from "./styles";
import { auth } from "../../firebase";
import { FloatingBlock } from "../Register/styles";

const Login = ({ handleLogin, goToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      handleLogin();
    } catch (err) {
      setError("Falha no login. Verifique suas credenciais.");
    }
  };

  return (
    <Container>
      <FloatingBlock>
      <h2 style={{ marginBottom: "20px" }}>Login</h2>
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
      </FloatingBlock>
    </Container>
  );
};

export default Login;
