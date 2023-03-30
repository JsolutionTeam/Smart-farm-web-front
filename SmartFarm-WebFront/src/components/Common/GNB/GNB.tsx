import styled from "styled-components";
import { useMemo } from "react";
import { NavLink } from "react-router-dom";
import useLocalStorage from "@hooks/useLocalStorage";
import SiteSelectContainer from "../Select/containers/SiteSelectContainer";
import { FiLogOut } from "react-icons/fi";

const GNB = () => {
  const { clearToken, getUser, clearUser } = useLocalStorage();
  const role = useMemo(() => getUser().role, [getUser]);

  const logout = () => {
    clearToken();
    clearUser();
    window.location.reload();
  };

  return (
    <Container>
      <Header>
        <Logout onClick={logout}>
          <FiLogOut />
        </Logout>
        <p>
          환경 데이터 <span>모니터링</span>
        </p>
        {role === "ROLE_ADMIN" && (
          <SiteSelect>
            <SiteSelectContainer />
          </SiteSelect>
        )}
      </Header>
      <Navs>
        <NavLink to="/realtime">실시간</NavLink>
        <NavLink to="/period">기간</NavLink>
        <NavLink to="/compare">비교</NavLink>
        {role === "ROLE_ADMIN" && <NavLink to="/site">농가</NavLink>}
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
`;

const Header = styled.header`
  width: 100%;
  height: 90px;
  ${({ theme }) => theme.flex.row}
  align-items: center;
  justify-content: center;
  margin-bottom: 22px;
  position: relative;

  & > p {
    font-size: 28px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray4};

    span {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const Navs = styled.nav`
  ${({ theme }) => theme.flex.row}
  flex-wrap: wrap;
  gap: 12px;

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
`;

const Logout = styled.button`
  line-height: 16px;
  position: absolute;
  left: 40px;
  font-size: 16px;
  background: none;
  border: none;

  @media ${({ theme }) => theme.media.mobile} {
    display: none;
  }
`;

const SiteSelect = styled.div`
  position: absolute;
  right: 40px;
`;
