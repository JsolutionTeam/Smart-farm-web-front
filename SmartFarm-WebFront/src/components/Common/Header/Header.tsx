import styled from "styled-components";
import ListSelectContainer from "@components/Common/CSelect/containers/ListSelectContainer";
import { useMemo } from "react";
import useToken from "@hooks/useToken";
import useUser from "@hooks/useUser";
import { FiLogOut } from "react-icons/fi";

const Header = () => {
  const { clearToken } = useToken();
  const { getUser, clearUser } = useUser();
  const role = useMemo(() => getUser().role, [getUser]);

  const logout = () => {
    clearToken();
    clearUser();
    window.location.reload();
  };

  return (
    <Container>
      <button onClick={logout} className="logout desktop">
        <FiLogOut />
      </button>
      <h3>환경 데이터 모니터링</h3>
      {role === "ROLE_ADMIN" && <ListSelectContainer />}
      {role === "ROLE_USER" && (
        <button onClick={logout} className="logout mobile">
          <FiLogOut />
        </button>
      )}
    </Container>
  );
};

export default Header;

const Container = styled.header`
  width: 100%;
  height: 60px;
  ${({ theme }) => theme.flex.row}
  align-items: center;
  justify-content: center;
  background-color: #fff;
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
