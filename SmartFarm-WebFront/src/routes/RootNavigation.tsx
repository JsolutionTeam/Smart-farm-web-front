import styled from "styled-components";
import { Route, Routes } from "react-router";
import useToken from "@hooks/useToken";
import MainNavigation from "./MainNavigation";
import LoginContainer from "@components/Login/containers/LoginContainer";

const RootNavigation = () => {
  const { getToken } = useToken();

  return (
    <Container>
      <Routes>
        <Route
          path="*"
          element={getToken() ? <MainNavigation /> : <LoginContainer />}
        />
      </Routes>
      <Copyright>
        Copyright &copy; 환경 데이터 모니터링 All Rights Reserved.
      </Copyright>
    </Container>
  );
};

export default RootNavigation;

const Container = styled.section`
  width: 100vw;
  height: 100%;
  min-height: 100vh;
  background-color: #edf1f2;
  position: relative;
`;

// 카피라이트
const Copyright = styled.p`
  position: absolute;
  left: 50%;
  bottom: 40px;
  transform: translate(-50%, 0);
  color: #999;

  @media ${({ theme }) => theme.media.mobile} {
    position: relative;
    width: 100%;
    /* margin-top: ; */
    font-size: 12px;
    text-align: center;
  }
`;
