import React, { useEffect, useState } from "react";
import ResumeItem from "../ResumeItem";
import * as C from "./styles";
import {
  FaRegArrowAltCircleUp,
  FaRegArrowAltCircleDown,
  FaDollarSign,
} from "react-icons/fa";
import { firestore } from "../../firebase"; 
import { auth } from "../../firebase"; 

const Resume = () => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [total, setTotal] = useState(0);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };
  

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (!userId) return; 

    const unsubscribe = firestore
      .collection('users')
      .doc(userId)
      .collection('transactions')
      .onSnapshot((snapshot) => {
        const transactionsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        console.log("Transações recuperadas:", transactionsData); 
        if (transactionsData.length === 0) {
          console.log("Nenhuma transação encontrada.");
          setIncome(0);
          setExpense(0);
          setTotal(0);
          return; 
        }

        const totalIncome = transactionsData.reduce((acc, item) => {
          console.log(`Item: ${JSON.stringify(item)}`); 
          if (item.expense === false) { 
            console.log(`Adicionando entrada: ${item.amount}`);
            return acc + (item.amount || 0);
          }
          return acc;
        }, 0);

        const totalExpense = transactionsData.reduce((acc, item) => {
          if (item.expense === true) { 
            console.log(`Adicionando saída: ${item.amount}`);
            return acc + (item.amount || 0);
          }
          return acc;
        }, 0);

        console.log("Total de Entradas:", totalIncome);
        console.log("Total de Saídas:", totalExpense);

        setIncome(totalIncome);
        setExpense(totalExpense);
        setTotal(totalIncome - totalExpense); 
      }, (error) => {
        console.error("Erro ao escutar transações:", error.message);
      });
    return () => unsubscribe();
  }, []);

  return (
    <C.Container>
      <ResumeItem
        title="Entradas"
        Icon={FaRegArrowAltCircleUp}
        value={formatCurrency(income)} 
        color="green" 
      />
      <ResumeItem
        title="Saídas"
        Icon={FaRegArrowAltCircleDown}
        value={formatCurrency(expense)} 
        color="red"  
      />
      <ResumeItem
        title="Total"
        Icon={FaDollarSign}
        value={formatCurrency(total)} 
        color="blue"  
      />
    </C.Container>
  );
};

export default Resume;
