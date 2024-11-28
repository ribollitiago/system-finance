import styled from "styled-components";

export const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  width: 98%;
  background-color: #28303B;
  border-radius: 0px; // Apliquei um leve arredondamento para suavizar a borda
  display: flex;
  flex-direction: column; // Alterado para empilhar os itens, mantendo os botões em cima
  justify-content: flex-start; // Garantir que o conteúdo comece de cima
  padding: 15px 0px; // Melhorei o padding para mais espaçamento
  gap: 10px;

  @media (max-width: 750px) {
    display: grid;
    grid-template-columns: 1fr; // Em telas menores, o layout se torna uma coluna
    gap: 10px; // Aumentei o gap para melhor visualização
  }
`;

export const InputContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; // Espaçamento entre os elementos dentro de InputContent
`;

export const Label = styled.label`
  font-size: 14px; // Apliquei um tamanho de fonte mais legível
  color: #fff; // Tornei o texto da label branco para melhor contraste
`;

export const Input = styled.input`
  outline: none;
  border-radius: 5px;
  padding: 8px 12px; // Aumentei o padding para maior conforto ao digitar
  font-size: 15px;
  border: 1px solid #ccc;
  background-color: #fff; // Coloquei um fundo branco para input
  transition: border 0.3s ease; // Efeito visual de transição de borda

  &:focus {
    border-color: #76ABAE; // Mudança de cor de borda no foco
  }
`;

export const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; // Adicionei um gap entre os radio buttons

  input {
    accent-color: #76ABAE; // Personalizei a cor dos radio buttons
    margin-top: 0;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row; // Os botões ficam lado a lado
  gap: 10px; // Adiciona espaçamento entre os botões
  justify-content: center; // Centraliza os botões horizontalmente
  width: 100%; // O contêiner ocupa toda a largura disponível
  align-items: center; // Garante que os botões fiquem alinhados verticalmente no centro
`;

export const Button = styled.button`
  padding: 8px 16px; // Aumentei o padding para botões mais destacados
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  background-color: #76ABAE;
  font-size: 16px; // Tamanho da fonte ajustado para maior legibilidade
  transition: background-color 0.3s ease;
  width: 100%; // Faz com que os botões se expandam para ocupar toda a largura disponível
  max-width: 200px; // Limita o tamanho máximo de cada botão, caso necessário para não ficarem muito grandes

  &:hover {
    background-color: #5a8a84; // Efeito hover para o botão
  }

  &:active {
    background-color: #4e7f7a; // Efeito quando o botão é pressionado
  }
`;

export const Select = styled.select`
  outline: none;
  border-radius: 5px;
  padding: 8px 12px; // Aumentei o padding para o select
  font-size: 15px;
  border: 1px solid #ccc;
  background-color: #fff;
  transition: border 0.3s ease;

  &:focus {
    border-color: #76ABAE; // Mudança de cor de borda no foco
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6); // Fundo escurecido
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: #28303b;
  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
  width: 90%;
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CloseButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

export const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Text = styled.h3`
  font-size: 18px;
  color: #fff;
`;

