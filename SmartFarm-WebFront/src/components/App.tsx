import RootNavigation from '@routes/RootNavigation';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { theme } from '@styles/theme';
import rootReducer from '@store/rootReducer';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import '../styles/core.css';

const store = createStore(rootReducer, composeWithDevTools());

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RootNavigation />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
