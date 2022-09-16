import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const GNB = () => {
  return (
    <GNBBox>
      <NavLink to='/'>실시간</NavLink>
      <NavLink to='/2'>기간</NavLink>
      <NavLink to='/3'>비교</NavLink>
    </GNBBox>
  );
};

export default GNB;

const GNBBox = styled.header`
  height: 60px;
  ${({ theme }) => theme.flex.row}
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #e8e8e8;

  a {
    width: 140px;
    height: 60px;
    line-height: 60px;
    color: #767676;
    text-align: center;

    &[aria-current] {
      border-bottom: 3px solid #1c6453;
      color: #1c6453;
      font-weight: 500;
    }
  }

  @media ${({ theme }) => theme.media.mobile} {
    flex-wrap: wrap;
    padding: 0 40px;

    a {
      flex: 1;
    }
  }
`;
