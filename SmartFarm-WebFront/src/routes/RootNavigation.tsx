import styled from "styled-components";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import MainNavigation from "./components/MainNavigation";
import LoginContainer from "@components/Login/containers/LoginContainer";
import useToken from "@hooks/useToken";
// import useUser from "@hooks/useUser";
// import { useMemo } from "react";
// import ListSelectContainer from "@components/Common/CSelect/containers/ListSelectContainer";

const RootNavigation = () => {
  const { getToken } = useToken();
  // const { getUser } = useUser();
  // const role = useMemo(() => getUser().role, [getUser]);

  return (
    <BrowserRouter>
      <Header>
        <h3>스마트팜 혁신밸리</h3>
        {/* <ListSelectContainer /> */}
        {/* {role === 'ROLE_ADMIN' && <div>농장선택</div>} */}
      </Header>
      <Body>
        <Routes>
          <Route
            path="*"
            element={getToken() ? <MainNavigation /> : <LoginContainer />}
          />
        </Routes>
        <Copyright>
          Copyright &copy; 스마트팜 혁신밸리 All Rights Reserved.
        </Copyright>
      </Body>
    </BrowserRouter>
  );
};

export default RootNavigation;

// 헤더
const Header = styled.header`
  width: 100%;
  height: 4.5vw;
  ${({ theme }) => theme.flex.row}
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e8e8e8;

  @media ${({ theme }) => theme.media.mobile} {
    height: 90px;
    justify-content: space-between;
    padding: 0 20px;
    h3 {
      font-size: 22px;
    }
    section {
      right: 20px;
    }
  }
`;

// 헤더 외 전체 영역
const Body = styled.section`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 4.5vw);
  background-color: #edf1f2;
  position: relative;
`;

// 카피라이트
const Copyright = styled.p`
  position: absolute;
  bottom: 2vw;
  left: 50%;
  transform: translate(-50%, 0);
  color: #999;

  @media ${({ theme }) => theme.media.mobile} {
    width: 100%;
    font-size: 12px;
    text-align: center;
  }
`;
