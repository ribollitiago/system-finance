// src/components/Register/Register.js
import React, { useState } from "react";
import { Container, Form, Input, Button, LinkButton, Error } from "./styles"; 
import { auth, firestore } from "../../firebase"; // Certifique-se de importar o Firestore

const Register = ({ handleRegister, goToLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user; // Obter o usuário registrado
      
      // Criar uma nova coleção no Firestore usando o UID do usuário
      await firestore.collection("users").doc(user.uid).set({
        email: email,
        // Adicione outros dados que você deseja salvar para o usuário aqui
      });

      handleRegister(email, password); // Notifique o App que o registro foi feito
      goToLogin(); // Redirecione para a tela de login
    } catch (error) {
      console.error("Erro ao registrar:", error);
      setError("Erro ao registrar. Verifique suas credenciais.");
    }
  };

  return (
    <Container>
      <h2>Registrar</h2>
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
        <Button type="submit">Registrar</Button>
        <LinkButton type="button" onClick={goToLogin}>
          Já tem uma conta? Faça login
        </LinkButton>
      </Form>
    </Container>
  );
};

export default Register;
