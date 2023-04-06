import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import LNB from "@components/Common/LNB/LNB";

const SiteNavigation = () => {
  return (
    <Container>
      <LNB />
      <Outlet />
    </Container>
  );
};

export default SiteNavigation;

const Container = styled.div`
  width: 100%;
  padding: 0 40px;

  @media ${({ theme }) => theme.media.mobile} {
    padding: 0;
  }
`;
