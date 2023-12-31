import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { StyleSheetManager } from 'styled-components';
import { App } from 'components/App';

const theme = {
  colors: {
    black: '#212121',
    white: '#fff',
    red: 'red',
    green: 'green',
    orange: 'orange',
    error: 'red',
  },
  radii: {
    sm: '4px',
    md: '8px',
    // lg: '16px',
  },
  spacing: value => `${value * 4}px`,
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StyleSheetManager shouldForwardProp={prop => prop !== 'level'}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StyleSheetManager>
  </React.StrictMode>
);
