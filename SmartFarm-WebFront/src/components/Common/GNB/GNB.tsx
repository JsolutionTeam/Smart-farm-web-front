import styled from "styled-components";
import { useCallback, useMemo } from "react";
import {NavLink, useNavigate} from "react-router-dom";
import useLocalStorage from "@hooks/useLocalStorage";
import SiteSelectContainer from "../Select/containers/SiteSelectContainer";
import { FiLogOut } from "react-icons/fi";

const GNB = () => {
  const navigate = useNavigate();
  const { clearToken, getUser, clearUser } = useLocalStorage();
  const role = useMemo(() => getUser().role, [getUser]);

  const logout = useCallback(() => {
    clearToken();
    clearUser();
    window.location.reload();
  },[clearToken,clearUser])

  return (
    <Container>
      <Header>
        <Logout onClick={logout}>
          로그아웃
          <FiLogOut />
        </Logout>
        <p className="mouseHover" onClick={() => {
          // 눌렀을때 실시간 페이지로 넘어가게
          navigate("/realtime");
        }}>
          경상북도 환경 데이터 <span>모니터링</span>
        </p>
        {role === "ROLE_ADMIN" && (
          <SiteSelect>
            <SiteSelectContainer />
          </SiteSelect>
        )}
      </Header>
      <Navs>
        <nav>
          <NavLink to="/realtime">실시간</NavLink>
          <NavLink to="/period">기간</NavLink>
          <NavLink to="/compare">비교</NavLink>
          {role === "ROLE_ADMIN" && <NavLink to="/account">농가</NavLink>}
          {role === "ROLE_ADMIN" && <NavLink to="/sensor">센서</NavLink>}
        </nav>
      </Navs>
    </Container>
  );
};

export default GNB;

const Container = styled.section`
  width: 100%;
  ${({ theme }) => theme.flex.col};
  align-items: center;
  margin-bottom: 36px;

  @media ${({ theme }) => theme.media.mobile} {
    align-items: flex-start;
  }
`;

const Header = styled.header`
  width: 100%;
  height: 90px;
  ${({theme}) => theme.flex.row}
  align-items: center;
  justify-content: center;
  margin-bottom: 22px;
  position: relative;

  & > p {
    font-size: 28px;
    font-weight: 600;
    color: ${({theme}) => theme.colors.gray4};

    span {
      color: ${({theme}) => theme.colors.primary};
    }
    @media ${({theme}) => theme.media.mobile} {
      justify-content: space-between;
      padding: 20px;
      font-size: 24px;
    }
  }

  .mouseHover {
    cursor: pointer;
  }

  @media ${({theme}) => theme.media.mobile} {
    justify-content: space-between;
    padding: 20px;
  }
`;

const SiteSelect = styled.div`
  position: absolute;
  right: 40px;

  @media ${({ theme }) => theme.media.mobile} {
    position: relative;
    right: 0;
  }
`;

const Navs = styled.section`
  nav {
    ${({ theme }) => theme.flex.row}
    flex-wrap: wrap;
    gap: 12px;
  }

  a {
    width: 107px;
    height: 62px;
    line-height: 62px;
    background-color: ${({ theme }) => theme.colors.primaryBackground};
    border: 1px solid ${({ theme }) => theme.colors.gray2};
    border-radius: 6px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.08);
    font-size: 24px;
    text-align: center;
    color: ${({ theme }) => theme.colors.gray3};

    &[aria-current] {
      background-color: #fff;
      color: ${({ theme }) => theme.colors.primary};
      font-weight: 600;
    }
  }

  @media ${({ theme }) => theme.media.mobile} {
    width: 100%;
    padding: 0 20px;
    overflow-x: scroll;
    overflow-y: hidden;

    nav {
      width: fit-content;
      flex-wrap: nowrap;
    }

    // 스크롤 숨기기
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Logout = styled.button`
  line-height: 16px;
  position: absolute;
  left: 40px;
  font-size: 16px;
  background: none;
  border: none;
  
  display: flex;
  flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 4px;

  @media ${({ theme }) => theme.media.mobile} {
    display: none;
  }
`;
