import React, {useState} from 'react';




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
import SignIn from './SingIn';

import { SessionContext, getSessionCookie, setSessionCookie } from "./contexts/useSession"

function App() {

  const [session, setSession] = useState(getSessionCookie());

  return (
    <BrowserRouter>
    
    <SessionContext.Provider value={session}>
    <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='register' element={<Register/>}/>
              <Route path='profile/:slug' element={<MyJokes/>}/>
              <Route path='create/:slug' element={<Create/>}/>
              <Route path='/signin' element={<SignIn/>}/>
    </Routes>
    </SessionContext.Provider>

    </BrowserRouter>
  );
}

export default App;
