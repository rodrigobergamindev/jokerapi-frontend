import React, {useState} from 'react';




import {
  BrowserRouter as Router,
  Route,
  Link,
  BrowserRouter,
  Routes
} from "react-router-dom";
import Profile from './Profile';
import Home from './Home';
import Register from './Register';
import Create from './Create';
import SignIn from './SingIn';

import { SessionContext, getSessionCookie, setSessionCookie } from "./contexts/useSession"
import Jokes from './Jokes';

function App() {

  const [session, setSession] = useState(getSessionCookie());

  return (
    <BrowserRouter>
    
    <SessionContext.Provider value={session}>
    <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='register' element={<Register/>}/>
              <Route path='profile/:slug' element={<Profile/>}/>
              <Route path='create/:slug' element={<Create/>}/>
              <Route path='signin' element={<SignIn/>}/>
              <Route path='jokes' element={<Jokes/>}/>
    </Routes>
    </SessionContext.Provider>

    </BrowserRouter>
  );
}

export default App;
