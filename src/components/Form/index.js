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

  const handleSave = async () => {
    if (!desc || !amount || !date) {
      alert("Informe a descrição, o valor e a data!");
      return;
    } else if (amount < 1) {
      alert("O valor tem que ser positivo!");
      return;
    } else if (isExpense && (!category || category === "")) { 
      // Categoria é obrigatória apenas se for "Saída"
      alert("Por favor, selecione uma categoria para o gasto!");
      return;
    }
  
    const transaction = {
      desc: desc,
      amount: Number(amount),
      expense: isExpense,
      date: date,
      category: isExpense ? category : "N/A", // Define "N/A" para entradas
    };
  
    try {
      const userId = auth.currentUser.uid;
  
      await firestore
        .collection('users')
        .doc(userId)
        .collection('transactions')
        .add(transaction);
  
      setTransactionsList(prev => [...prev, { ...transaction, id: new Date().getTime() }]);
  
      setDesc("");
      setAmount("");
      setDate("");
      setCategory(""); // Limpa a categoria após a adição
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
            type="date" 
            onChange={(e) => setDate(e.target.value)}
          />
        </C.InputContent>

        {isExpense && ( // Campo de categoria aparece apenas para "Saída"
          <C.InputContent>
            <C.Label>Categoria</C.Label>
            <C.Select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value=""></option> {/* Opção padrão */}
              <option value="Roupas">Vestuário</option>
              <option value="Alimentação">Alimentação</option>
              <option value="Transporte">Transporte</option>
              <option value="Educação">Educação</option>
              <option value="Saúde">Saúde</option>
              <option value="Lazer">Lazer</option>
              <option value="Serviços">Serviços</option>
              <option value="Outros">Outros</option>
            </C.Select>
          </C.InputContent>
        )}

        <C.RadioGroup>
          <C.Input
            type="radio"
            id="rIncome"
            defaultChecked
            name="group1"
            onChange={() => setExpense(false)}
          />
          <C.Label htmlFor="rIncome">Entrada</C.Label>
          <C.Input
            type="radio"
            id="rExpenses"
            name="group1"
            onChange={() => setExpense(true)} 
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
