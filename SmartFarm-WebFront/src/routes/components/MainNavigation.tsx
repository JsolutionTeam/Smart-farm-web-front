import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import GNBContainer from '@components/Common/GNB/containers/GNBContainer';
import RealTimeContainer from '@components/RealTime/containers/RealTimeContainer';
import PeriodContainer from '@components/Period/containers/PeriodContainer';
import CompareContainer from '@components/Compare/containers/CompareContainer';
import NotFound from '@components/Common/NotFound/NotFound';

const MainNavigation = () => {
  return (
    <Body>
      <GNBContainer />
      <Routes>
        <Route path='/' element={<RealTimeContainer />} />
        <Route path='/period' element={<PeriodContainer />} />
        <Route path='/compare' element={<CompareContainer />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Body>
  );
};

export default MainNavigation;

const Body = styled.section`
  height: 100%;
  ${({ theme }) => theme.flex.col}
`;
