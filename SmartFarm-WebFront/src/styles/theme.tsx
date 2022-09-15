import { DefaultTheme } from 'styled-components';

// 디바이스별 분기점
const media = {
  mobile: `screen and (max-width: 480px)`,
  laptop: `screen and (max-width: 1024px)`,
};

// 색상
const colors = {};

// felx 속성
const flex = {
  row: `
    display: flex;
    flex-direction: row;
  `,
  col: `
    display: flex;
    flex-direction: column;
  `,
};

export const theme: DefaultTheme = {
  colors,
  media,
  flex,
};
