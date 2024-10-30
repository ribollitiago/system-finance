import React, { useState } from "react";
import Grid from "../Grid";
import * as C from "./styles";
import { firestore } from "../../firebase"; // Importa o Firestore
import { auth } from "../../firebase"; // Importa o auth para pegar o UID do usuário

const Form = ({ transactionsList, setTransactionsList }) => {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [isExpense, setExpense] = useState(false);
  const [date, setDate] = useState(""); // Novo estado para a data

  const handleSave = async () => {
    if (!desc || !amount || !date) { // Verifica se todos os campos estão preenchidos
      alert("Informe a descrição, o valor e a data!");
      return;
    } else if (amount < 1) {
      alert("O valor tem que ser positivo!");
      return;
    }

    const transaction = {
      desc: desc,
      amount: Number(amount), // Certifique-se de armazenar o valor como número
      expense: isExpense,
      date: date, // Inclui a data na transação
    };

    try {
      const userId = auth.currentUser.uid; // Resgata o UID do usuário autenticado

      // Adiciona a transação ao Firestore na subcoleção de transações do usuário
      await firestore
        .collection('users')
        .doc(userId)
        .collection('transactions')
        .add(transaction);

      // Atualiza a lista de transações localmente
      setTransactionsList(prev => [...prev, { ...transaction, id: new Date().getTime() }]); // Adiciona um ID gerado pela data

      // Limpa os campos após adicionar
      setDesc("");
      setAmount("");
      setDate(""); // Limpa o campo de data
    } catch (error) {
      console.error("Erro ao adicionar a transação:", error.message);
    }
  };

  return (
    <>
      <C.Container>
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
            type="date" // Campo de entrada de tipo data
            onChange={(e) => setDate(e.target.value)}
          />
        </C.InputContent>
        <C.RadioGroup>
          <C.Input
            type="radio"
            id="rIncome"
            defaultChecked
            name="group1"
            onChange={() => setExpense(false)} // Define como entrada
          />
          <C.Label htmlFor="rIncome">Entrada</C.Label>
          <C.Input
            type="radio"
            id="rExpenses"
            name="group1"
            onChange={() => setExpense(true)} // Define como saída
          />
          <C.Label htmlFor="rExpenses">Saída</C.Label>
        </C.RadioGroup>
        <C.Button onClick={handleSave}>ADICIONAR</C.Button>
      </C.Container>
      <Grid itens={transactionsList} setItens={setTransactionsList} />
    </>
  );
};

export default Form;
