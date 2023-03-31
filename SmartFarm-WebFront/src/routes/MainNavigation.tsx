import styled from "styled-components";
import { useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import useLocalStorage from "@hooks/useLocalStorage";
import GNB from "@components/Common/GNB/GNB";
import RealTimeContainer from "@components/RealTime/containers/RealTimeContainer";
import PeriodContainer from "@components/Period/containers/PeriodContainer";
import CompareContainer from "@components/Compare/containers/CompareContainer";
import SiteNavigation from "./SiteNavigation";
import AccountContainer from "@components/Account/containers/AccountContainer";
import AccountManageContainer from "@components/Account/containers/AccountManageContainer";
import SensorContainer from "@components/Sensor/containers/SensorContainer";
import SensorManageContainer from "@components/Sensor/containers/SensorManageContainer";

const MainNavigation = () => {
  const { getUser } = useLocalStorage();
  const role = useMemo(() => getUser().role, [getUser]);

  return (
    <Container>
      <GNB />
      <Routes>
        <Route path="/realtime" element={<RealTimeContainer />} />
        <Route path="/period" element={<PeriodContainer />} />
        <Route path="/compare" element={<CompareContainer />} />
        {role === "ROLE_ADMIN" && (
          <Route path="/site" element={<SiteNavigation />}>
            <Route path="account">
              <Route index element={<AccountContainer />} />
              <Route path="manage" element={<AccountManageContainer />} />
            </Route>
            <Route path="sensor">
              <Route index element={<SensorContainer />} />
              <Route path="manage" element={<SensorManageContainer />} />
            </Route>
            <Route index element={<Navigate to="./account" />} />
          </Route>
        )}
        <Route path="*" element={<Navigate to="/realtime" />} />
      </Routes>
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
