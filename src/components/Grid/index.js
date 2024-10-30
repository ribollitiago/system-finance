import React, { useEffect, useState } from "react";
import GridItem from "../GridItem";
import * as C from "./styles";
import { firestore } from "../../firebase"; // Certifique-se de importar seu Firestore
import { auth } from "../../firebase"; // Importa o auth para pegar o UID do usuário

const Grid = () => {
  const [itens, setItens] = useState([]);

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
          id: doc.id, // O ID do documento no Firestore
          ...doc.data() // Os dados da transação
        }));

        // Organiza as transações por data (assumindo que o campo de data é do tipo string no formato ISO)
        const sortedTransactions = transactionsData.sort((a, b) => {
          return new Date(b.date) - new Date(a.date); // Ordena do mais recente para o mais antigo
        });

        setItens(sortedTransactions); // Atualiza o estado com as transações organizadas
      }, (error) => {
        console.error("Erro ao escutar transações:", error.message);
      });

    // Limpa a assinatura quando o componente é desmontado
    return () => unsubscribe();
  }, []);

  const onDelete = async (ID) => {
    const userId = auth.currentUser?.uid; // Resgata o UID do usuário autenticado
    if (!userId) return; // Retorna se não houver usuário autenticado

    try {
      // Remove a transação do Firestore
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
