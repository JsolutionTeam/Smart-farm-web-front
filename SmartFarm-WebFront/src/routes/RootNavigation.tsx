import styled from "styled-components";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import MainNavigation from "./components/MainNavigation";
import LoginContainer from "@components/Login/containers/LoginContainer";
import useToken from "@hooks/useToken";
import useUser from "@hooks/useUser";
import { useMemo } from "react";
import ListSelectContainer from "@components/Common/CSelect/containers/ListSelectContainer";
import { FiLogOut } from "react-icons/fi";

const RootNavigation = () => {
  const { getToken, clearToken } = useToken();
  const { getUser, clearUser } = useUser();
  const role = useMemo(() => getUser().role, [getUser]);

  const logout = () => {
    clearToken();
    clearUser();
    window.location.reload();
  };

  return (
    <BrowserRouter>
      <Header>
        {getToken() && (
          <button onClick={logout} className="logout desktop">
            <FiLogOut />
          </button>
        )}
        <h3>스마트팜 혁신밸리</h3>
        {role === "ROLE_ADMIN" && <ListSelectContainer />}
        {getToken() && role === "ROLE_USER" && (
          <button onClick={logout} className="logout mobile">
            <FiLogOut />
          </button>
        )}
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

  .logout {
    position: absolute;
    left: 40px;
    font-size: 16px;
    background: none;
    cursor: pointer;
  }

  .mobile {
    display: none;
  }

  @media ${({ theme }) => theme.media.mobile} {
    height: 90px;
    justify-content: space-between;
    padding: 0 20px;
    position: relative;

    h3 {
      font-size: 22px;
    }

    section {
      right: 20px;
    }

    .logout {
      display: block;
      position: static;
    }

    .desktop {
      display: none;
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
