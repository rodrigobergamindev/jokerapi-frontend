import React from 'react'
import {
    Box,
    Text,
    VStack,
    HStack,
    Heading,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
    Textarea,
    
  } from '@chakra-ui/react';
import axios from 'axios'
import {Formik, Field, Form} from 'formik'
import { useNavigate, useParams } from "react-router-dom";

export default function Create() {

    const navigate = useNavigate()
    let {slug} = useParams()

    function validate(value) {
        let error
        if (!value) {
          error = 'This field is required'
        } 
        return error
      }


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
                <Heading>Create a Joke</Heading>
                  
                  <Box width="450px" height="650px">
                    <VStack width="100%" height="100%" alignItems="center" justifyContent="center" border="1px" borderColor="gray.400" borderStyle="solid" borderRadius="10px">
                    <Formik
                        initialValues={{ category: '', title: '', description: '' }}
                        onSubmit={(values, actions) => {
                            const {category, title, description} = values
                           setTimeout(async () => {
                            try {
                                const sendValues = await axios.post(`https://jokerapi-usjt.herokuapp.com/${slug}`, {
                                    category,
                                    title,
                                    description
                                },
                                {
                                    withCredentials: true
                                })
                                
                           
                           if(sendValues.status === 201){
                            actions.setSubmitting(false)
                            navigate(`/profile/${slug}`)
                           }
                            } catch (error) {
                                console.log(error)
                                if(error.response.status === 404){
                                    alert('Ocorreu um erro ao criar piada')
                                }
                                actions.setSubmitting(false)
                            }
                          }, 1000)
                          }}>
      {(props) => (
        <Form>
          <Field name='category' validate={validate}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.category && form.touched.category}>
                <FormLabel htmlFor='category'>Categoria</FormLabel>
                <Input {...field} id='category' placeholder='category' />
                <FormErrorMessage>{form.errors.category}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

            
          <Field name='title' validate={validate}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.title && form.touched.title}>
                <FormLabel htmlFor='title'>Título</FormLabel>
                <Input {...field} id='title' placeholder='title' />
                <FormErrorMessage>{form.errors.title}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Field name='description' validate={validate}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.description && form.touched.description}>
                <FormLabel htmlFor='description'>Descrição</FormLabel>
                <Input {...field} as={Textarea} id='description' placeholder='description' width="250px" height="250px" />
                <FormErrorMessage>{form.errors.description}</FormErrorMessage>
              </FormControl>
            )}
          </Field>


          <Button
            mt={4}
            colorScheme='blue'
            isLoading={props.isSubmitting}
            type='submit'
          >
            Enviar
          </Button>
        </Form>
      )}
    </Formik>
                    </VStack>
                  </Box>
              </VStack>
          
      
   
  )
}
