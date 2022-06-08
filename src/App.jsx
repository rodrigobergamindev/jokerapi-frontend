import React from 'react';
import {
  Box,
  Text,
  VStack,
  Code,
  Grid,
  HStack,
} from '@chakra-ui/react';

import { Logo } from './Logo';

import {
  BrowserRouter as Router,
  Route,
  Link,
  BrowserRouter,
  Routes
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    
    
      <VStack textAlign="center" fontSize="xl">
      
        <Grid minH="100vh" p={3} justifyItems="center" alignContent="center">
          <VStack spacing={8}>

          <Text fontSize="6xl" fontWeight="black">Joker API</Text>

            <Logo h="40vmin" pointerEvents="none" />

            <HStack spacing={8}>
            <Text color="blue.500" fontSize="2xl" fontWeight="semibold">
              See all jokes
            </Text>
            <Text fontSize="2xl" fontWeight="normal">
              Contribute
            </Text>
            </HStack>

          </VStack>
        </Grid>
      </VStack>
 

    </BrowserRouter>
  );
}

export default App;
