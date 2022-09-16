import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import GNBContainer from '@components/Common/GNB/containers/GNBContainer';
import HomeContainer from '@components/Home/containers/HomeContainer';
import PeriodContainer from '@components/Period/containers/PeriodContainer';
import NotFound from '@components/Common/NotFound/NotFound';

const MainNavigation = () => {
  return (
    <Body>
      <GNBContainer />
      <Routes>
        <Route path='/' element={<HomeContainer />} />
        <Route path='/2' element={<PeriodContainer />} />
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
