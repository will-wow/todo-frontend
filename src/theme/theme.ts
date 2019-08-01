import { Theme } from "styled-system";

const SCALE = 2;

const scale = (n: number) => n * SCALE;

const theme: Theme = {
  colors: {
    blue: "#397FB3",
    lightBlue: "#99B5C9",
    red: "#B3413E",
    salmon: "#FFA5A3",
    yellow: "#FAFAE3",
    gray: "#808080"
  },
  fonts: {
    sans: '"Fira Sans", "sans-serif"',
    mono: 'source-code-pro, Menlo, Monaco, Consolas, "Courier New"'
  },
  fontSizes: [0, 12, 14, 16, 20, 24, 32, 48, 64].map(scale),
  space: [0, 4, 8, 16, 32, 64].map(scale)
};

export default theme;
