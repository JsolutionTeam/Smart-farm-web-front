import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const GNB = () => {
  return (
    <GNBBox>
      <NavLink to='/'>실시간</NavLink>
      <NavLink to='/period'>기간</NavLink>
      <NavLink to='/compare'>비교</NavLink>
    </GNBBox>
  );
};

export default GNB;

const GNBBox = styled.header`
  height: 3.5vw;
  ${({ theme }) => theme.flex.row}
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-bottom: 1px solid #e8e8e8;

  a {
    width: 140px;
    height: 3.5vw;
    line-height: 3.5vw;
    color: #767676;
    text-align: center;

    &[aria-current] {
      border-bottom: 3px solid #1c6453;
      color: #1c6453;
      font-weight: 500;
    }
  }

  @media ${({ theme }) => theme.media.mobile} {
    height: 60px;
    flex-wrap: wrap;
    padding: 0 40px;

    a {
      flex: 1;
      height: 60px;
      line-height: 60px;
    }
  }
`;
