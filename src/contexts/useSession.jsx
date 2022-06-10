import {createContext} from "react";
import { Cookies } from 'react-cookie';

const cookies = new Cookies()


export function setSessionCookie(session){
  
  cookies.remove('token')
  cookies.set('token', session)

};

export function getSessionCookie(){
  
  const sessionCookie = cookies.get('token')
  
  if (sessionCookie === undefined) {
    return {};
  } else {
    return sessionCookie;
  }
};

export const SessionContext = createContext(getSessionCookie());
