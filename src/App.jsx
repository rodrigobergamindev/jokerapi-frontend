import React from 'react';




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
import Create from './Create';

function App() {
  return (
    <BrowserRouter>
    
    
    <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='register' element={<Register/>}/>
              <Route path='profile/:slug' element={<MyJokes/>}/>
              <Route path='create/:slug' element={<Create/>}/>
    </Routes>
 

    </BrowserRouter>
  );
}

export default App;
