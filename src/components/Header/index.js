// src/components/Header/Header.js
import React from "react";
import * as C from "./styles";
import { auth } from "../../firebase"; // Importe o auth configurado

const Header = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      await auth.signOut(); // Desloga o usuário
      onLogout(); // Notifica o App que o usuário foi deslogado
    } catch (error) {
      console.error("Erro ao deslogar:", error.message);
    }
  };

  return (
    <C.Container>
      <C.Title>Controle Financeiro</C.Title>
      <button onClick={handleLogout} style={styles.logoutButton}>
        Logout
      </button>
    </C.Container>
  );
};

const styles = {
  logoutButton: {
    marginTop: "20px", // Adiciona espaço entre o título e o botão
    padding: "10px 15px",
    color: "#fff",
    backgroundColor: "#dc3545", // Cor do botão de logout
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Header;
