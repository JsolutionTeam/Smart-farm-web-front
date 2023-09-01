import styled from "styled-components";
import { useCallback, useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import useLocalStorage from "@hooks/useLocalStorage";
import GNB from "@components/Common/GNB/GNB";
import RealTimeContainer from "@components/RealTime/containers/RealTimeContainer";
import PeriodContainer from "@components/Period/containers/PeriodContainer";
import CompareContainer from "@components/Compare/containers/CompareContainer";
import AccountContainer from "@components/Account/containers/AccountContainer";
import AccountManageContainer from "@components/Account/containers/AccountManageContainer";
import SensorContainer from "@components/Sensor/containers/SensorContainer";
import SensorManageContainer from "@components/Sensor/containers/SensorManageContainer";
import TableNavigation from "./TableNavigation";

const MainNavigation = () => {
  const { clearToken, getUser, clearUser } = useLocalStorage();

  const role = useMemo(() => getUser().role, [getUser]);

  const logout = useCallback(() => {
    clearToken();
    clearUser();
    window.location.reload();
  },[clearToken,clearUser])

  return (
    <Container>
      <GNB />
      <Routes>
        <Route path="/realtime" element={<RealTimeContainer />} />
        <Route path="/period" element={<PeriodContainer />} />
        <Route path="/compare" element={<CompareContainer />} />
        {role === "ROLE_ADMIN" && (
          <Route path="/account" element={<TableNavigation type="농가" />}>
            <Route index element={<AccountContainer />} />
            <Route path="manage" element={<AccountManageContainer />} />
          </Route>
        )}
        {role === "ROLE_ADMIN" && (
          <Route path="/sensor" element={<TableNavigation type="센서" />}>
            <Route index element={<SensorContainer />} />
            <Route path="manage" element={<SensorManageContainer />} />
          </Route>
        )}
        <Route path="*" element={<Navigate to="/realtime" />} />
      </Routes>
      <Logout onClick={logout}>로그아웃하기</Logout>
    </Container>
  );
};

export default MainNavigation;

const Container = styled.section`
  min-height: 100vh;
  ${({ theme }) => theme.flex.col}
  align-items: center;
  background-color: ${({ theme }) => theme.colors.gray1};
`;

const Logout = styled.p`
  display: none;

  @media ${({ theme }) => theme.media.mobile} {
    display: block;
    position: absolute;
    left: 50%;
    bottom: 100px;
    transform: translate(-50%, 0);
    font-size: 16px;
    color: ${({ theme }) => theme.colors.gray4};
    text-decoration: underline;
  }
`;
