import React from "react";
import * as C from "./styles";
import {
  FaRegArrowAltCircleUp,
  FaRegArrowAltCircleDown,
  FaTrash,
} from "react-icons/fa";

const GridItem = ({ item, onDelete }) => {
  const formattedDate = new Date(item.date + 'T00:00:00-03:00').toLocaleDateString("pt-BR");

  // Função para formatar o valor com R$
  const formatValue = (value) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`; // Exemplo: R$ 1.234,56
  };

  const handleDelete = () => {
    const confirmed = window.confirm("Tem certeza que deseja remover este item?");
    if (confirmed) {
      onDelete(item.id);
    }
  };

  return (
    <C.Tr>
      <C.Td alignCenter>{item.desc}</C.Td>
      <C.Td alignCenter>{formatValue(item.amount)}</C.Td> {/* Exibe o valor com R$ */}
      <C.Td alignCenter>{formattedDate}</C.Td> {/* Formatação da data */}
      <C.Td alignCenter>{item.category}</C.Td> {/* Exibe a categoria */}
      <C.Td alignCenter>
        {item.expense ? (
          <FaRegArrowAltCircleDown color="red" />
        ) : (
          <FaRegArrowAltCircleUp color="green" />
        )}
      </C.Td>
      <C.Td alignCenter>
        <FaTrash onClick={handleDelete} />
      </C.Td>
    </C.Tr>
  );
};

export default GridItem;
