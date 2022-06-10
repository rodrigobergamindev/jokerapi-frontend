import { Grid, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Logo } from './Logo'
import {Link} from 'react-router-dom'

export default function Home() {
  return (
    <VStack textAlign="center" fontSize="xl">
      
        <Grid minH="100vh" p={3} justifyItems="center" alignContent="center">
          <VStack spacing={8}>

          <Text fontSize="6xl" fontWeight="black">Joker API</Text>

            <Logo h="40vmin" pointerEvents="none" />

            <HStack spacing={8}>
            <Text color="blue.500" fontSize="2xl" fontWeight="semibold">
              Database
            </Text>
            <Text fontSize="2xl" fontWeight="normal">
              Contribute
            </Text>
            </HStack>

          </VStack>
        </Grid>
      </VStack>
  )
}
