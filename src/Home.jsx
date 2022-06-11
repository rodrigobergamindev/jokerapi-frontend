import { Grid, HStack, Text, VStack, Link as ChakraLink } from '@chakra-ui/react'
import React, {useState} from 'react'
import { Logo } from './Logo'
import {Link} from 'react-router-dom'
import { SessionContext, getSessionCookie, setSessionCookie } from "./contexts/useSession"

import jwt_decode from "jwt-decode";

export default function Home() {
  const [session, setSession] = useState(getSessionCookie());
  
  const username = session ? jwt_decode(session) : ''
  console.log(session)

  return (
    <VStack textAlign="center" fontSize="xl">
      
        <Grid minH="100vh" p={3} justifyItems="center" alignContent="center">
          <VStack spacing={8}>

          <Text fontSize="6xl" fontWeight="black">Joker API</Text>

            <Logo h="40vmin" pointerEvents="none" />

            <HStack spacing={8}>
            <Link to="/jokes">
            <Text color="blue.500" fontSize="2xl" fontWeight="semibold">
              Database
            </Text>
            </Link>
            <Text fontSize="2xl" fontWeight="normal">
              {
                !!session ? (
                  <Link to={`/profile/${username.user}`}>Contribute</Link>
                ) : (
                  <Link to={`/signin`}>Contribute</Link>
                )
              }
            </Text>
            </HStack>
            
            <ChakraLink href='https://jokerapi-usjt.herokuapp.com/api-docs'><Text fontSize="md" _hover={{color:"blue.500", transition:"0.2s"}}>Documentation 📄</Text></ChakraLink>
          </VStack>
        </Grid>
      </VStack>
  )
}
