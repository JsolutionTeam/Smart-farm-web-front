import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const LNB = () => {
  return (
    <Container>
      <NavLink to="account">농가 관리</NavLink>
      <NavLink to="sensor">센서 관리</NavLink>
    </Container>
  );
};

export default LNB;

const Container = styled.nav`
  width: 100%;
  ${({ theme }) => theme.flex.row}
  background-color: ${({ theme }) => theme.colors.primaryBackground};

  a {
    width: 50%;
    line-height: 72px;
    font-size: 24px;
    font-weight: 600;
    text-align: center;

    &[aria-current] {
      ${({ theme }) => theme.flex.col}
      position: relative;
      background-color: #fff;
      color: ${({ theme }) => theme.colors.primary};

      &:before {
        content: "";
        width: 100%;
        height: 3px;
        position: absolute;
        background-color: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`;
