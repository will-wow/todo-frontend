import { createGlobalStyle } from "styled-components";
import { fontSize } from "styled-system";

const GlobalStyle = createGlobalStyle`
  html {
    ${fontSize}
  }
  body {
    min-height: 100vh;
    margin: 0;
  }
`;

GlobalStyle.defaultProps = {
  fontSize: 3
};

export default GlobalStyle;
