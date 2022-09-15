import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import HomeContainer from '@components/Home/containers/HomeContainer';
import GNBContainer from '@components/Common/GNB/containers/GNBContainer';
import NotFound from '@components/Common/NotFound/NotFound';

const MainNavigation = () => {
  return (
    <Body>
      <GNBContainer />
      <Routes>
        <Route path='/' element={<HomeContainer />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Body>
  );
};

export default MainNavigation;

const Body = styled.section``;
