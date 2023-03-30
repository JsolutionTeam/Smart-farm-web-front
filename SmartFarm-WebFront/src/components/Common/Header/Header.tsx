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
      <Logout onClick={logout}>
        <FiLogOut />
      </Logout>
      <p>
        환경 데이터 <span>모니터링</span>
      </p>
      {role === "ROLE_ADMIN" && <ListSelectContainer />}
    </Container>
  );
};

export default Header;

const Container = styled.header`
  width: 100%;
  height: 90px;
  ${({ theme }) => theme.flex.row}
  align-items: center;
  justify-content: center;

  & > p {
    font-size: 28px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray4};

    span {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const Logout = styled.button``;
