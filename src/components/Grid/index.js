import React, { useEffect, useState } from "react";
import GridItem from "../GridItem";
import * as C from "./styles";
import { firestore } from "../../firebase";
import { auth } from "../../firebase"; 

const Grid = () => {
  const [itens, setItens] = useState([]);

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

        const sortedTransactions = transactionsData.sort((a, b) => {
          return new Date(b.date) - new Date(a.date); 
        });

        setItens(sortedTransactions); 
      }, (error) => {
        console.error("Erro ao escutar transações:", error.message);
      });

    return () => unsubscribe();
  }, []);

  const onDelete = async (ID) => {
    const userId = auth.currentUser?.uid; 
    if (!userId) return; 

    try {
      await firestore
        .collection('users')
        .doc(userId)
        .collection('transactions')
        .doc(ID)
        .delete();
    } catch (error) {
      console.error("Erro ao deletar a transação:", error.message);
    }
  };

  return (
    <C.Table>
      <C.Thead>
        <C.Tr>
          <C.Th width={30}>Descrição</C.Th>
          <C.Th width={30}>Valor</C.Th>
          <C.Th width={20} alignCenter>Data</C.Th> {/* Nova coluna para a data */}
          <C.Th width={10} alignCenter>Tipo</C.Th>
          <C.Th width={10}></C.Th>
        </C.Tr>
      </C.Thead>
      <C.Tbody>
        {itens?.map((item) => (
          <GridItem key={item.id} item={item} onDelete={onDelete} />
        ))}
      </C.Tbody>
    </C.Table>
  );
};

export default Grid;
