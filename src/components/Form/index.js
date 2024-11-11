import React, { useState } from "react";
import Grid from "../Grid";
import * as C from "./styles";
import { firestore } from "../../firebase"; 
import { auth } from "../../firebase";

const Form = ({ transactionsList, setTransactionsList }) => {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [isExpense, setExpense] = useState(false);
  const [date, setDate] = useState("");

  const handleSave = async () => {
    if (!desc || !amount || !date) { 
      alert("Informe a descrição, o valor e a data!");
      return;
    } else if (amount < 1) {
      alert("O valor tem que ser positivo!");
      return;
    }

    const transaction = {
      desc: desc,
      amount: Number(amount),
      expense: isExpense,
      date: date, 
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
