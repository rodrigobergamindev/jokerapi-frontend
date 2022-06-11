import React, {useState, useEffect} from 'react'
import {
    Text,
    VStack,
    Grid,
    HStack,
    Heading,
    Button,
    Box,
  } from '@chakra-ui/react';
import axios from 'axios'
import {useParams, useNavigate, Link} from 'react-router-dom'
import { logout } from './contexts/useSession';

export default function Profile() {
    const [jokes, setJokes] = useState([])
    let {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        
        
            async function fetchData() {
                try {
              
                    const response = await axios.get(`https://jokerapi-usjt.herokuapp.com/user/${slug}/jokes`, {
                       withCredentials: true
                    })
    
                    setJokes(response.data)
                
            } catch (error) {
                 
                  if(error.response.status === 401){
                      navigate('/')
                  }
                
                
            }
            }

            fetchData()
        },[])

        
        async function handleDelete(joke){
          
            const response = await axios.delete(`https://jokerapi-usjt.herokuapp.com/jokes/${slug}/${joke.id}`, {
                withCredentials: true
            })

            if(response.status === 204){
                const newArray = jokes.filter(item => item.id !== joke.id)
                setJokes([...newArray])
            }
        }

        async function handleRemoveAccount(username){
            
            const response = await axios.delete(`https://jokerapi-usjt.herokuapp.com/user/${username}`, {
                withCredentials: true
            })

            if(response.status === 204){
                logout()
                alert('Dados deletados')

                setTimeout(() => navigate('/'), 1000)
            }
        }

        async function handleLogout(){
            
            const response = await axios.post(`https://jokerapi-usjt.herokuapp.com/logout`, {}, {
                withCredentials: true
            }
            )
            
            if(response.status === 200) {
                logout()
                navigate('/')
            }
        }

  return (

      <>
      
        
                <VStack width="100%" 
                justifyContent="space-between" 
                spacing={8} 
                backgroundColor="gray.300" 
                
                >
                <VStack width="100%" height="100%">
                    <HStack 
                    backgroundColor="blue.700" 
                    width="100%" 
                    padding="10px"
                    borderColor="gray.400" 
                    borderBottom="1px"
                    alignItems="center" 
                    justifyContent="center"
                    textAlign="center" 
                    >
                 
                    <Box flex="1">
                        <Link to="/">
                        <Text fontSize="3xl" fontWeight="black" color="whiteAlpha.900" flex="1">Joker API</Text>
                        </Link>
                    </Box>
                   
             
                    <Button size="md"
                    onClick={() => handleLogout()}
                    >Sign Out</Button>
                    </HStack>
                

                <VStack spacing={10}>
                <Heading paddingTop="20px" fontSize="lg" alignSelf="flex-start">{`Hello ${slug}, these are your jokes`}</Heading>
                  <Grid maxWidth="1200px" width="100%" templateColumns='repeat(3, 1fr)' justifyItems="center" alignContent="center" gap={6}>
                        {
                            jokes.map(joke => (
                                <VStack key={joke.id} boxShadow="md" w="350px" h="250px" backgroundColor="gray.400" padding="10px">
                                    <HStack alignSelf="flex-start" justifyContent="space-between" borderBottom="2px" borderColor="whiteAlpha.900" width="100%" paddingBottom="2">
                                    <Text color="white" fontWeight="bold">{joke.category}</Text>
                                    <Text fontWeight="bold" color="white">{new Date(joke.createdAt).toLocaleDateString('pt-BR',{
                                        dateStyle: "short"
                                    })}</Text>
                                    <Button size="sm" colorScheme="red" onClick={() => handleDelete(joke)}> 
                                        X
                                    </Button>
                                    </HStack>
                                    <Text fontSize="md" fontWeight="bold">{joke.title}</Text>
                                    <Text textAlign="justify" maxW="100%" height="100%" overflowY="scroll" css={{
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
                
                  </VStack>

                  <HStack
                  position="absolute" 
                  bottom="20px" 
                  right="20px" 
                  >
                    <Button 
                  colorScheme="blue" 
                  size="lg" 
                  borderRadius="100px" 
                  fontSize="xl"
                  onClick={() => navigate(`/create/${slug}`)}
                  >Contribua</Button>

                    <Button 
                  colorScheme="red" 
                  size="lg" 
                  borderRadius="100px" 
                  fontSize="xl"
                  onClick={() => handleRemoveAccount(slug)}
                  >Excluir conta</Button>  
                  </HStack>
                  
              </VStack>

          
      
      </>
   
  )
}
