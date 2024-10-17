import React from "react";
import * as C from "./styles";

const ResumeItem = ({ title, Icon, value, color }) => {
  return (
    <C.Container>
      <C.Header>
        <C.HeaderTitle>{title}</C.HeaderTitle>
        <Icon color={color} />  {/* Passa a cor do ícone */}
      </C.Header>
      <C.Total>{value}</C.Total>  {/* Certifique-se de usar "Total", que é exportado corretamente */}
    </C.Container>
  );
};

export default ResumeItem;
