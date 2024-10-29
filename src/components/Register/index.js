// src/components/Register/Register.js
import React, { useState } from "react";
import { Container, Form, Input, Button, LinkButton } from "./styles"; // Importando os estilos
import { auth } from "../../firebase"; // Importe o auth corretamente

const Register = ({ handleRegister, goToLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(email, password); // Utilize o auth aqui
      handleRegister(email, password); // Notifique o App que o registro foi feito
      goToLogin(); // Chame a função para ir à tela de login
    } catch (error) {
      console.error("Erro ao registrar:", error.message);
    }
  };

  return (
    <Container>
      <h2>Registrar</h2>
      <Form onSubmit={handleSubmit}>
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
        <Button type="submit">Registrar</Button>
        <LinkButton type="button" onClick={goToLogin}>
          Já tem uma conta? Faça login
        </LinkButton>
      </Form>
    </Container>
  );
};

export default Register;
