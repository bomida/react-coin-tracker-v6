import Router from './Router';
import GlobalStyle from './GlobalStyle';
import { ThemeProvider } from 'styled-components';
import theme from './Theme';

function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Router />
            </ThemeProvider>
        </>
    );
}

export default App;
