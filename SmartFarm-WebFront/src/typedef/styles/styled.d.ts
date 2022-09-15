import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {};
    media: {
      mobile: string;
      laptop: string;
    };
    flex: {
      row: string;
      col: string;
    };
  }
}
