import React, { useState } from "react";
import Grid from "../Grid";
import * as C from "./styles";
import { firestore } from "../../firebase"; 
import { auth } from "../../firebase";

const Form = ({ transactionsList, setTransactionsList }) => {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [isExpense, setExpense] = useState(false);
  const [date, setDate] = useState(""); // Novo estado para a data
  const [category, setCategory] = useState(""); // Estado para a categoria
  const [modalOpen, setModalOpen] = useState(false); // Controle da janela modal

  const openModal = (type) => {
    setExpense(type === "Saída"); // Define se é Saída ou Entrada
    setModalOpen(true); // Abre a janela modal
  };

  const closeModal = () => {
    setModalOpen(false); // Fecha a janela modal
    setDesc("");
    setAmount("");
    setDate("");
    setCategory(""); // Limpa os campos
  };

  const handleSave = async () => {
    if (!desc || !amount || !date) {
      alert("Informe a descrição, o valor e a data!");
      return;
    } else if (amount < 1) {
      alert("O valor tem que ser positivo!");
      return;
    } else if (!category || category === "") { 
      // Categoria é obrigatória tanto para "Entrada" quanto para "Saída"
      alert("Por favor, selecione uma categoria!");
      return;
    }

    const transaction = {
      desc: desc,
      amount: Number(amount),
      expense: isExpense,
      date: date,
      category: category, // Não define mais "N/A" para entradas
    };
  
    try {
      const userId = auth.currentUser.uid;
  
      await firestore
        .collection('users')
        .doc(userId)
        .collection('transactions')
        .add(transaction);
  
      setTransactionsList(prev => [...prev, { ...transaction, id: new Date().getTime() }]);
  
      closeModal(); // Fecha a modal após salvar
    } catch (error) {
      console.error("Erro ao adicionar a transação:", error.message);
    }
  };

  return (
    <>
      <C.Container>
        <C.ButtonContainer>
          <C.Button onClick={() => openModal("Entrada")}>Nova Entrada</C.Button>
          <C.Button onClick={() => openModal("Saída")}>Nova Saída</C.Button>
        </C.ButtonContainer>
        <Grid itens={transactionsList} setItens={setTransactionsList} />
      </C.Container>

      {/* Modal */}
      {modalOpen && (
        <C.ModalOverlay>
          <C.ModalContent>
            <C.ModalHeader>
              <h2>{isExpense ? "Nova Saída" : "Nova Entrada"}</h2>
              <C.CloseButton onClick={closeModal}>X</C.CloseButton>
            </C.ModalHeader>
            <C.InputContent>
              <C.Label>Descrição</C.Label>
              <C.Input value={desc} onChange={(e) => setDesc(e.target.value)} />
            </C.InputContent>
            <C.InputContent>
              <C.Label>Valor</C.Label>
              <C.Input
                value={amount}
                type="number"
                onChange={(e) => setAmount(e.target.value)}
              />
            </C.InputContent>
            <C.InputContent>
              <C.Label>Data</C.Label>
              <C.Input
                value={date}
                type="date"
                onChange={(e) => setDate(e.target.value)}
              />
            </C.InputContent>
            {/* Seleção de categoria para Saída ou Entrada */}
            <C.InputContent>
              <C.Label>Categoria</C.Label>
              <C.Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value=""></option>
                {isExpense ? (
                  <>
                    <option value="Roupas">Vestuário</option>
                    <option value="Alimentação">Alimentação</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Educação">Educação</option>
                    <option value="Saúde">Saúde</option>
                    <option value="Lazer">Lazer</option>
                    <option value="Serviços">Serviços</option>
                    <option value="Outros">Outros</option>
                  </>
                ) : (
                  <>
                    <option value="Salário">Salário</option>
                    <option value="Investimentos">Investimentos</option>
                    <option value="Venda">Venda</option>
                    <option value="Presente">Presente</option>
                    <option value="Dividendos">Dividendos</option>
                    <option value="Outros">Outros</option>
                  </>
                )}
              </C.Select>
            </C.InputContent>
            <C.ModalFooter>
              <C.Button onClick={handleSave}>Salvar</C.Button>
            </C.ModalFooter>
          </C.ModalContent>
        </C.ModalOverlay>
      )}
    </>
  );
};

export default Form;
