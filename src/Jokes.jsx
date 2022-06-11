import React, {useState, useEffect} from 'react'
import {
    Box,
    Text,
    VStack,
    Grid,
    theme,
    HStack,
    Heading,
  } from '@chakra-ui/react';
import axios from 'axios'


export default function Jokes() {
    const [jokes, setJokes] = useState([])

    useEffect(() => {
        async function fetchData() {
            const data = await axios.get('https://jokerapi-usjt.herokuapp.com/jokes', {
                method: 'get'
            })
            setJokes(data.data)
        }

        fetchData()
    },[])

    

  return (

      <VStack width="100%" height="100%" spacing={8}>
        <HStack 
        width="100%" 
        backgroundColor="blue.700"  
        alignItems="center" 
        justifyContent="center" 
        textAlign="center" 
        borderBottom="1px" 
        borderColor="gray.500"
        padding="10px"
        >
            <Text fontSize="3xl" fontWeight="black" color="whiteAlpha.900">Joker API</Text>
        </HStack>
        <Heading>All Jokes</Heading>
          <Grid maxWidth="1200px" width="100%" templateColumns='repeat(4, 1fr)' justifyItems="center" gap={6}>
                {
                    jokes.map(joke => (
                        <VStack key={joke.id} boxShadow="md" w="350px" h="250px" backgroundColor="tomato" padding="10px">
                            <HStack alignSelf="flex-start" justifyContent="space-between" borderBottom="2px" borderColor="whiteAlpha.900" width="100%" paddingBottom="2">
                            <Text color="white" fontWeight="bold">{joke.category}</Text>
                            <Text fontWeight="bold" color="white">{new Date(joke.createdAt).toLocaleDateString('pt-BR',{
                                dateStyle: "short"
                            })}</Text>
                            </HStack>
                            <Text fontSize="md" fontWeight="bold">{joke.title}</Text>
                            <Text textAlign="justify" overflowY="scroll" css={{
                                '&::-webkit-scrollbar': {
                                    width: '4px',
                                  },
                                  '&::-webkit-scrollbar-track': {
                                    width: '6px',
                                  },
                                  '&::-webkit-scrollbar-thumb': {
                                    background: '#ecf0f1',
                                    borderRadius: '24px',
                                  },
                            }} >{joke.description}</Text>
                            <HStack alignSelf="flex-end" spacing={2}>
                            <Text>Author: @{joke.author.username}</Text>
                            </HStack>
                        </VStack>
                    ))
                }
       
          </Grid>
      </VStack>
   
  )
}
