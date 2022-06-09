
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import Jokes from './Jokes';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Register from './Register';


const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <>
  <ChakraProvider theme={theme}>
    <App/>
  </ChakraProvider>
  </>
);


