import React from "react";
import * as C from "./styles";
import {
  FaRegArrowAltCircleUp,
  FaRegArrowAltCircleDown,
  FaTrash,
} from "react-icons/fa";

const GridItem = ({ item, onDelete }) => {
  // Ajuste a data para evitar problemas de fuso horário
  const formattedDate = new Date(item.date + 'T00:00:00-03:00').toLocaleDateString("pt-BR");

  return (
    <C.Tr>
      <C.Td>{item.desc}</C.Td>
      <C.Td>{item.amount.toFixed(2).replace('.', ',')}</C.Td> {/* Formatação do valor */}
      <C.Td>{formattedDate}</C.Td> {/* Formatação da data */}
      <C.Td alignCenter>
        {item.expense ? (
          <FaRegArrowAltCircleDown color="red" />
        ) : (
          <FaRegArrowAltCircleUp color="green" />
        )}
      </C.Td>
      <C.Td alignCenter>
        <FaTrash onClick={() => onDelete(item.id)} />
      </C.Td>
    </C.Tr>
  );
};

export default GridItem;
