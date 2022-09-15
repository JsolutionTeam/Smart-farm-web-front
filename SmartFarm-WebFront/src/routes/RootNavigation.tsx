import styled from 'styled-components';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import MainNavigation from './components/MainNavigation';
import LoginContainer from '@components/Login/containers/LoginContainer';

const RootNavigation = () => {
  return (
    <BrowserRouter>
      <Header>
        <h3>스마트팜 혁신밸리</h3>
      </Header>
      <Body isLogin>
        <Routes>
          <Route path='*' element={<LoginContainer />} />
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
  height: 90px;
  ${({ theme }) => theme.flex.row}
  align-items: center;
  justify-content: center;

  @media ${({ theme }) => theme.media.mobile} {
    h3 {
      font-size: 22px;
    }
  }
`;

// 헤더 외 전체 영역
const Body = styled.section<{ isLogin?: boolean }>`
  width: 100%;
  height: calc(100vh - 90px);
  ${({ theme }) => theme.flex.col}
  align-items: ${({ isLogin }) => isLogin && 'center'};
  justify-content: ${({ isLogin }) => isLogin && 'center'};
  padding: ${({ isLogin }) => isLogin && '40px'};
  background-color: #edf1f2;
`;

// 카피라이트
const Copyright = styled.p`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translate(-50%, 0);
  color: #999;
`;
