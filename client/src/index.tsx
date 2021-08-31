import * as React from "react";
import ReactDOM from "react-dom";
import { App } from "./App/App";
import { ThemeProvider } from "@material-ui/core/styles";
import { darkTheme, lightTheme } from "./themes/main.theme";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
