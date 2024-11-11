import React from "react";
import * as C from "./styles";
import { auth } from "../../firebase"; 

const Header = ({ onLogout }) => {
  const handleLogout = async () => {
    const confirmLogout = window.confirm("Tem certeza que deseja deslogar?");
    
    if (confirmLogout) {
      try {
        await auth.signOut(); 
        onLogout(); 
      } catch (error) {
        console.error("Erro ao deslogar:", error.message);
      }
    }
  };

  return (
    <C.Container>
      <C.Title>Controle Financeiro</C.Title>
      <C.LogoutButton onClick={handleLogout}>
        Sair do sistema
      </C.LogoutButton>
    </C.Container>
  );
};

export default Header;
