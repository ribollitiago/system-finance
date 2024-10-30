import React, { useEffect, useState } from "react";
import ResumeItem from "../ResumeItem";
import * as C from "./styles";
import {
  FaRegArrowAltCircleUp,
  FaRegArrowAltCircleDown,
  FaDollarSign,
} from "react-icons/fa";
import { firestore } from "../../firebase"; // Certifique-se de importar seu Firestore
import { auth } from "../../firebase"; // Importa o auth para pegar o UID do usuário

const Resume = () => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const userId = auth.currentUser?.uid; // Resgata o UID do usuário autenticado
    if (!userId) return; // Retorna se não houver usuário autenticado

    // Escuta as alterações na subcoleção de transações
    const unsubscribe = firestore
      .collection('users')
      .doc(userId)
      .collection('transactions')
      .onSnapshot((snapshot) => {
        const transactionsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        console.log("Transações recuperadas:", transactionsData); // Log para verificar as transações

        // Verifica se existem transações
        if (transactionsData.length === 0) {
          console.log("Nenhuma transação encontrada.");
          // Reseta os valores para zero
          setIncome(0);
          setExpense(0);
          setTotal(0);
          return; // Retorna se não houver transações
        }

        // Calcula entradas e saídas
        const totalIncome = transactionsData.reduce((acc, item) => {
          console.log(`Item: ${JSON.stringify(item)}`); // Mostra o item atual
          if (item.expense === false) { // Verifica se é uma entrada
            console.log(`Adicionando entrada: ${item.amount}`);
            return acc + (item.amount || 0);
          }
          return acc;
        }, 0);

        const totalExpense = transactionsData.reduce((acc, item) => {
          if (item.expense === true) { // Verifica se é uma saída
            console.log(`Adicionando saída: ${item.amount}`);
            return acc + (item.amount || 0);
          }
          return acc;
        }, 0);

        // Log dos totais
        console.log("Total de Entradas:", totalIncome);
        console.log("Total de Saídas:", totalExpense);

        // Atualiza os estados
        setIncome(totalIncome);
        setExpense(totalExpense);
        setTotal(totalIncome - totalExpense); // Calcula o total
      }, (error) => {
        console.error("Erro ao escutar transações:", error.message);
      });

    // Limpa a assinatura quando o componente é desmontado
    return () => unsubscribe();
  }, []);

  return (
    <C.Container>
      <ResumeItem
        title="Entradas"
        Icon={FaRegArrowAltCircleUp}
        value={income} // Passa o valor atualizado
        color="green" 
      />
      <ResumeItem
        title="Saídas"
        Icon={FaRegArrowAltCircleDown}
        value={expense} // Passa o valor atualizado
        color="red"  
      />
      <ResumeItem
        title="Total"
        Icon={FaDollarSign}
        value={total} // Passa o valor atualizado
        color="blue"  
      />
    </C.Container>
  );
};

export default Resume;
