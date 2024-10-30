import React from "react";
import * as C from "./styles";

const ResumeItem = ({ title, Icon, value, color }) => {
  return (
    <C.Container>
      <C.Header>
        <C.HeaderTitle>{title}</C.HeaderTitle>
        <Icon color={color} />
      </C.Header>
      <C.Total>{value}</C.Total>  {/* Aqui deve estar o valor */}
    </C.Container>
  );
};

export default ResumeItem;
