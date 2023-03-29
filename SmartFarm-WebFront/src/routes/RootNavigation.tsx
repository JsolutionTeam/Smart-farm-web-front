import styled from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import MainNavigation from "./MainNavigation";
import LoginContainer from "@components/Login/containers/LoginContainer";
import useToken from "@hooks/useToken";

const RootNavigation = () => {
  const { getToken } = useToken();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={getToken() ? <MainNavigation /> : <LoginContainer />}
        />
      </Routes>
      <Copyright>
        Copyright &copy; 스마트팜 혁신밸리 All Rights Reserved.
      </Copyright>
    </BrowserRouter>
  );
};

export default RootNavigation;

// 카피라이트
const Copyright = styled.div`
  position: absolute;
  left: 50%;
  bottom: 40px;
  transform: translate(-50%, 0);
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray3};
`;
