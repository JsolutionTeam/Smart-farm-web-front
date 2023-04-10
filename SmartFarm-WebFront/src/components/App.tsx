import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "@styles/global";
import { theme } from "@styles/theme";
import RootNavigation from "@routes/RootNavigation";
import rootReducer from "@store/rootReducer";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(rootReducer, composeWithDevTools());

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <RootNavigation />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
