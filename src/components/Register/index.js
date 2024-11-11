import React, { useState } from "react";
import { Container, Form, Input, Button, LinkButton, Error, FloatingBlock } from "./styles"; 
import { auth, firestore } from "../../firebase"; 

const Register = ({ handleRegister, goToLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Novo estado para confirmar a senha
  const [error, setError] = useState("");  // Mensagens de erro (sem sucesso)

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Verificando se as senhas são iguais
    if (password !== confirmPassword) {
      alert("As senhas não coincidem! Por favor, verifique.");
      return;
    }

    try {
      // Criando usuário no Firebase
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      
      // Salvando o usuário no Firestore
      await firestore.collection("users").doc(user.uid).set({
        email: email,
      });

      // Não há mensagem de sucesso, apenas redirecionamento para a tela de login
      goToLogin();
    } catch (error) {
      console.error("Erro ao registrar:", error);
      setError("Erro ao registrar. Verifique suas credenciais.");
    }
  };

  return (
    <Container>
      <FloatingBlock>
        <h2 style={{ marginBottom: "20px" }}>Registrar</h2>
        <Form onSubmit={handleSubmit}>
          {/* Mostrar erro, se existir */}
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
          <Input
            type="password"
            placeholder="Confirme a Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} // Atualizando o estado do campo de confirmação
          />
          <Button type="submit">Registrar</Button>
          <LinkButton type="button" onClick={goToLogin}>
            Já tem uma conta? Faça login
          </LinkButton>
        </Form>
      </FloatingBlock>
    </Container>
  );
};

export default Register;
