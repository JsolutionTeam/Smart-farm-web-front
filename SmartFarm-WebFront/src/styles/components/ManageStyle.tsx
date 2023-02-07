import styled from "styled-components";

export const Container = styled.main`
  width: 650px;
  ${({ theme }) => theme.flex.col}
  margin: 40px auto;
  margin-bottom: 100px;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .save {
    width: 190px;
    height: 45px;
    align-self: flex-end;
    background-color: #e4eeee;
    border: 1px solid #45b298;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }

  @media ${({ theme }) => theme.media.mobile} {
    width: calc(100vw - 40px);
  }
`;

export const Inputs = styled.section`
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #d8d8d8;
  border-radius: 8px;

  .msg {
    margin-left: 160px; // InputWrapper > p width
    margin-bottom: 20px;
    font-weight: 600;
    color: #e5435a;
  }

  @media ${({ theme }) => theme.media.mobile} {
    .msg {
      margin-left: 0;
    }
  }
`;

export const InputWrapper = styled.article`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  p {
    width: 160px;
  }

  input {
    flex: 1;
    line-height: 45px;
    padding-left: 20px;
    border: 1px solid #d8d8d8;
    border-radius: 5px;
    font-size: 16px;
  }

  .btns {
    flex: 1;
    display: flex;
    align-items: center;
  }

  &:last-child {
    margin-bottom: 0;
  }

  @media ${({ theme }) => theme.media.mobile} {
    width: 100%;
    flex-direction: column;

    p {
      width: 100%;
      margin-bottom: 20px;
    }
    input,
    .btns {
      width: 100%;
    }

    input {
    }
  }
`;

export const InputBtn = styled.button<{ active: boolean }>`
  flex: 1;
  height: 45px;
  background-color: #fff;
  border: 1px solid #d8d8d8;
  border-color: ${({ active }) => active && "#45b298"};
  border-radius: 5px;
  font-size: 16px;
  font-weight: ${({ active }) => active && 600};
  color: ${({ active }) => (active ? "#45b298" : "#aaa")};
  cursor: pointer;

  &:last-child {
    margin-left: 20px;
  }
`;

export const Select = styled.div`
  flex: 1;
  position: relative;
`;

export const Selected = styled.button`
  width: 100%;
  line-height: 45px;
  padding-left: 20px;
  background-color: #fff;
  border: 1px solid #d8d8d8;
  border-radius: 5px;
  font-size: 16px;
  text-align: left;
`;

export const OptionWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 55px; // selected height + 10px
  padding: 20px;
  background-color: #fff;
  border: 1px solid #d8d8d8;
  border-radius: 5px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

export const Options = styled.ul`
  height: 200px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-track {
    background: #ecf0f1;
    border-radius: 25px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 25px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #b3b3b3;
  }
`;

export const Option = styled.li<{ selected: boolean }>`
  line-height: 30px;
  color: ${({ selected }) => selected && "#45b298"};
  font-weight: ${({ selected }) => selected && 600};
  cursor: pointer;
`;
