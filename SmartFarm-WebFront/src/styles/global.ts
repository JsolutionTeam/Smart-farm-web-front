import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    
    body {
        font-family: 'Pretendard';
    }

    a {
        color: inherit;
        text-decoration: none;
    }
`;
