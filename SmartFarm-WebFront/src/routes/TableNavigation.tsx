import styled from "styled-components";
import { Outlet } from "react-router-dom";

type Props = {
  type: "농가" | "센서";
};

const TableNavigation = ({ type }: Props) => {
  return (
    <Container>
      <Header>{type}관리</Header>
      <Outlet />
    </Container>
  );
};

export default TableNavigation;

const Container = styled.div`
  width: 100%;
  padding: 0 40px;

  @media ${({ theme }) => theme.media.mobile} {
    padding: 0;
  }
`;

const Header = styled.header`
  width: 100%;
  line-height: 72px;
  ${({ theme }) => theme.flex.row}
  justify-content: center;
  background-color: #fff;
  border-top: 3px solid ${({ theme }) => theme.colors.primary};
  font-size: 24px;
  font-weight: 600;
`;
