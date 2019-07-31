import React from "react";
import { ThemeProvider } from "styled-components";
import { Box, Text } from "rebass";

import TodoContainer from "./todo/TodoContainer";

import GlobalStyle from "./theme/GlobalStyle";
import theme from "./theme/theme";
import mockServer from "./mockServer";

if (process.env.REACT_APP_MOCK_API) {
  mockServer();
}

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Box p={3} style={{ minHeight: "100vh" }}>
          <Text fontFamily="sans">
            <TodoContainer />
          </Text>
        </Box>
      </>
    </ThemeProvider>
  );
};

export default App;
