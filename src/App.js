import React, { useEffect, useState } from "react";
import styled from "styled-components"; 
import GlobalStyle from "./styles/global";
import Header from "./components/Header";
import Resume from "./components/Resume";
import Form from "./components/Form";
import Register from "./components/Register/index.js"; 
import Login from "./components/Login/index.js";
import { auth, firestore } from "./firebase";

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: left;
  padding: 10px;
  background-color: #191D24; 
  color: #fff; 
`;

const App = () => {
  const [transactionsList, setTransactionsList] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [total, setTotal] = useState(0);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isLoggedIn) {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await firestore.collection('users').doc(user.uid).get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            console.log('Dados do usuário:', userData);
            setUserData(userData);
            if (userData.transactions) {
              setTransactionsList(userData.transactions);
            }
          } else {
            console.log('Nenhum dado encontrado para este usuário');
          }
        }
      }
    };

    fetchUserData();
  }, [isLoggedIn]);

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

    if (userData) {
      firestore.collection('users').doc(userData.uid).update({
        transactions: firestore.FieldValue.arrayUnion(transaction),
      });
    }
  };

  const handleRegister = (email, password) => {
    console.log("Registrando usuário com:", email, password);
    setIsRegistered(true);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsLoggedIn(false);
      setIsRegistered(false);
      setUserData(null);
    } catch (error) {
      console.error("Erro ao deslogar:", error.message);
    }
  };

  const toggleRegister = () => {
    setShowRegister((prev) => !prev);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isRegistered && <div>Registro bem-sucedido!</div>}
      {!isLoggedIn ? (
        showRegister ? (
          <Register handleRegister={handleRegister} goToLogin={toggleRegister} />
        ) : (
          <Login handleLogin={handleLogin} goToRegister={toggleRegister} />
        )
      ) : (
        <>
          <Header onLogout={handleLogout} />
          <Resume income={income} expense={expense} total={total} />
          <Form
            handleAdd={handleAdd}
            transactionsList={transactionsList}
            setTransactionsList={setTransactionsList}
            userData={userData}
          />
          {userData && <Footer>Bem-vindo, {userData.email}</Footer>}
        </>
      )}
      <GlobalStyle />
    </>
  );
};

export default App;
