import styled from "styled-components";
import { Route, Routes } from "react-router";
import useLocalStorage from "@hooks/useLocalStorage";
import MainNavigation from "./MainNavigation";
import LoginContainer from "@components/Login/containers/LoginContainer";

const RootNavigation = () => {
  const { getToken } = useLocalStorage();

  return (
    <Contianer>
      <Routes>
        <Route
          path="*"
          element={getToken() ? <MainNavigation /> : <LoginContainer />}
        />
      </Routes>
      <Copyright>
        Copyright &copy; 스마트팜 혁신밸리 All Rights Reserved.
      </Copyright>
    </Contianer>
  );
};

export default RootNavigation;

const Contianer = styled.div`
  position: relative;
`;

// 카피라이트
const Copyright = styled.div`
  position: absolute;
  left: 50%;
  bottom: 40px;
  transform: translate(-50%, 0);
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray3};
`;
