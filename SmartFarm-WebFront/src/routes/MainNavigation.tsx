import styled from "styled-components";
import { useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import useUser from "@hooks/useUser";
import Header from "@components/Common/Header/Header";
import GNB from "@components/Common/GNB/GNB";
import RealTimeContainer from "@components/RealTime/containers/RealTimeContainer";
import PeriodContainer from "@components/Period/containers/PeriodContainer";
import CompareContainer from "@components/Compare/containers/CompareContainer";
import AccountManageContainer from "@components/Site/containers/AccountManageContainer";
import SiteContainer from "@components/Site/containers/SiteContainer";

const MainNavigation = () => {
  const { getUser } = useUser();
  const role = useMemo(() => getUser().role, [getUser]);

  return (
    <Container>
      <Header />
      <GNB />
      <Routes>
        <Route path="/realtime" element={<RealTimeContainer />} />
        <Route path="/period" element={<PeriodContainer />} />
        <Route path="/compare" element={<CompareContainer />} />
        {role === "ROLE_ADMIN" && (
          <Route path="/site" element={<SiteContainer />} />
        )}
        {role === "ROLE_ADMIN" && (
          <Route
            path="/site/account/manage"
            element={<AccountManageContainer />}
          />
        )}
        <Route path="*" element={<Navigate to="/realtime" />} />
      </Routes>
    </Container>
  );
};

export default MainNavigation;

const Container = styled.section`
  height: 100%;
  ${({ theme }) => theme.flex.col}

  @media ${({ theme }) => theme.media.mobile} {
    margin-bottom: 40px;
  }
`;
