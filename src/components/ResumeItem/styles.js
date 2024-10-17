import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #31363F;
  border-radius: 0px;
  padding: 5px 15px;
  width: 30%;

  @media (max-width: 750px) {
    width: 20%;

    p {
      font-size: 12px;
    }

    span {
      font-size: 20px;
    }

    svg {
      display: none;
    }
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  gap: 10px;
  margin: 20px auto;

  svg {
    width: 25px;
    height: 25px;
    color: ${({ color }) => color};  // Aplicar a cor ao ícone
  }
`;

export const HeaderTitle = styled.p`
  font-size: 20px;
`;

export const Total = styled.span`
  font-size: 30px;
  font-weight: bold;
`;
