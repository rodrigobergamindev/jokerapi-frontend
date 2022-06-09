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
import MyJokes from './MyJokes';
import Home from './Home';
import Register from './Register';

function App() {
  return (
    <BrowserRouter>
    
    
    <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='register' element={<Register/>}/>
              <Route path='profile/:slug' element={<MyJokes/>}/>
    </Routes>
 

    </BrowserRouter>
  );
}

export default App;
