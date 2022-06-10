import React, {useState, useEffect} from 'react'
import {
    Text,
    VStack,
    Grid,
    HStack,
    Heading,
    Button,
  } from '@chakra-ui/react';
import axios from 'axios'
import {useParams, useNavigate} from 'react-router-dom'

export default function Profile() {
    const [jokes, setJokes] = useState([])
    let {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        
        
            async function fetchData() {
                try {
              
                    const response = await axios.get(`http://localhost:8080/user/${slug}/jokes`, {
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
          
            const response = await axios.delete(`http://localhost:8080/${slug}/${joke.id}`, {
                withCredentials: true
            })

            if(response.status === 204){
                const newArray = jokes.filter(item => item.id !== joke.id)
                setJokes([...newArray])
            }
        }

        async function handleRemoveAccount(username){
            
            const response = await axios.delete(`http://localhost:8080/user/${username}`, {
                withCredentials: true
            })

            if(response.status === 204){
                alert('Dados deletados')

                setTimeout(() => navigate('/'), 1000)
            }
        }

        async function handleLogout(){
            
            const response = await axios.post(`http://localhost:8080/logout`, {}, {
                withCredentials: true
            }
            )
            
            if(response.status === 200) {

                navigate('/')
            }
        }

  return (

      <>
      
        
                <VStack width="100%" 
                height="100vh" 
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
                    >
                    <HStack 
                        flex="1"
                        backgroundColor="blue.700"  
                        alignItems="center" 
                        justifyContent="center"
                        textAlign="center" 
                        
                    >
                    <Text fontSize="3xl" fontWeight="black" color="whiteAlpha.900">Joker API</Text>
                   
                </HStack>
                    <Button size="md"
                    onClick={() => handleLogout()}
                    >Sign Out</Button>
                    </HStack>
                

                <VStack spacing={20}>
                <Heading>{`Jokes for ${slug}`}</Heading>
                  <Grid maxWidth="1200px" width="100%" templateColumns='repeat(4, 1fr)' justifyItems="center" gap={6}>
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
