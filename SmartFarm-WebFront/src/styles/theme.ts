import { DefaultTheme } from "styled-components";

// 디바이스별 분기점
const media = {
  mobile: `screen and (max-width: 480px)`,
  laptop: `screen and (max-width: 1024px)`,
};

// flex 속성
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

// 색상
const colors = {
  primary: "#005e63",
  primaryLight: "#e5eeef",
  primaryBackground: "#f3f4f1",
  gray1: "#fafafa",
  gray2: "#eaeaea",
  gray3: "#73858f",
  gray4: "#1d3740",
  black: "#202428",
  error: "#dd0000",
};

export const theme = {
  media,
  flex,
  colors,
};

type ThemeTypes = typeof theme;

declare module "styled-components" {
  export interface DefaultTheme extends ThemeTypes {}
}
