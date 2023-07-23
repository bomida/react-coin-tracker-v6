import Router from './Router';
import GlobalStyle from './GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './Theme';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from './atoms';

function App() {
    const isDark = useRecoilValue(isDarkAtom);

    return (
        <>
            <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
                <GlobalStyle />
                <Router />
            </ThemeProvider>
        </>
    );
}

export default App;
