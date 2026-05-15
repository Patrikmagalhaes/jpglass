import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }


  @font-face {
    font-family: 'adrip';

    src: url('/fonts/adrip1.ttf') format('truetype');


  }


  html {
    scroll-behavior: smooth;
  }

  body {
    background: #000;
    color: #fff;

    overflow-x: hidden;

    -webkit-font-smoothing: antialiased;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    border: none;
    background: none;
  }
`;