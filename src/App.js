// src/App.js
import React, { useEffect, useState } from "react";
import GlobalStyle from "./styles/global";
import Header from "./components/Header";
import Resume from "./components/Resume";
import Form from "./components/Form";
import Register from "./components/Register/index.js";
import Login from "./components/Login/index.js";
import { auth } from "./firebase"; // Importe a configuração do Firebase

const App = () => {
  const data = localStorage.getItem("transactions");
  const [transactionsList, setTransactionsList] = useState(
    data ? JSON.parse(data) : []
  );
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [total, setTotal] = useState(0);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento

  useEffect(() => {
    // Verifica o estado de autenticação do usuário
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true); // Usuário está logado
      } else {
        setIsLoggedIn(false); // Usuário não está logado
      }
      setLoading(false); // Atualiza o estado de carregamento após verificar o usuário
    });

    return () => unsubscribe(); // Limpa o listener ao desmontar o componente
  }, []);

  useEffect(() => {
    const amountExpense = transactionsList
      .filter((item) => item.expense)
      .map((transaction) => Number(transaction.amount));

    const amountIncome = transactionsList
      .filter((item) => !item.expense)
      .map((transaction) => Number(transaction.amount));

    const expense = amountExpense.reduce((acc, cur) => acc + cur, 0).toFixed(2);
    const income = amountIncome.reduce((acc, cur) => acc + cur, 0).toFixed(2);

    const total = Math.abs(income - expense).toFixed(2);

    setIncome(`R$ ${income}`);
    setExpense(`R$ ${expense}`);
    setTotal(`${Number(income) < Number(expense) ? "-" : ""}R$ ${total}`);
  }, [transactionsList]);

  const handleAdd = (transaction) => {
    const newArrayTransactions = [...transactionsList, transaction];
    setTransactionsList(newArrayTransactions);
    localStorage.setItem("transactions", JSON.stringify(newArrayTransactions));
  };

  const handleRegister = (email, password) => {
    console.log("Registrando usuário com:", email, password);
    setIsRegistered(true); // Redireciona para a tela de login
  };

  const handleLogin = () => {
    setIsLoggedIn(true); // Redireciona para a tela principal após login
  };

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Desloga o usuário
      setIsLoggedIn(false); // Atualiza o estado para refletir que o usuário está deslogado
      setIsRegistered(false); // Reseta o registro, se necessário
    } catch (error) {
      console.error("Erro ao deslogar:", error.message);
    }
  };

  // Se ainda está carregando, retorne um carregador ou nada
  if (loading) {
    return <div>Loading...</div>; // Pode ser substituído por um componente de carregamento mais estilizado
  }

  return (
    <>
      {!isLoggedIn ? (
        !isRegistered ? (
          <Register handleRegister={handleRegister} goToLogin={() => setIsRegistered(true)} />
        ) : (
          <Login handleLogin={handleLogin} goToRegister={() => setIsRegistered(false)} />
        )
      ) : (
        <>
          <Header onLogout={handleLogout} /> {/* Passa a função de logout */}
          <Resume income={income} expense={expense} total={total} />
          <Form
            handleAdd={handleAdd}
            transactionsList={transactionsList}
            setTransactionsList={setTransactionsList}
          />
        </>
      )}
      <GlobalStyle />
    </>
  );
};

export default App;
