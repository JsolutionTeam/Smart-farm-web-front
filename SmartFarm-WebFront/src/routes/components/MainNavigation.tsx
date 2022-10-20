import styled from "styled-components";
import { Navigate, Route, Routes } from "react-router-dom";
import RealTimeContainer from "@components/RealTime/containers/RealTimeContainer";
import PeriodContainer from "@components/Period/containers/PeriodContainer";
import CompareContainer from "@components/Compare/containers/CompareContainer";
// import NotFound from "@components/Common/NotFound/NotFound";
import GNB from "@components/Common/GNB/GNB";

const MainNavigation = () => {
  return (
    <Body>
      <GNB />
      <Routes>
        <Route path="/realtime" element={<RealTimeContainer />} />
        <Route path="/period" element={<PeriodContainer />} />
        <Route path="/compare" element={<CompareContainer />} />
        <Route path="*" element={<Navigate to="/realtime" />} />
      </Routes>
    </Body>
  );
};

export default MainNavigation;

const Body = styled.section`
  height: 100%;
  ${({ theme }) => theme.flex.col}

  @media ${({ theme }) => theme.media.mobile} {
    margin-bottom: 40px;
  }
`;
