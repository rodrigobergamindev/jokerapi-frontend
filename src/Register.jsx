import React, {useState, useEffect} from 'react'
import {
    Box,
    Text,
    VStack,
    HStack,
    Heading,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
    
  } from '@chakra-ui/react';
import axios from 'axios'
import {Formik, Field, Form} from 'formik'
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

export default function Register() {

    const [cookies, setCookie] = useCookies(['token']);

    const navigate = useNavigate()
    
    function validate(value) {
        let error
        if (!value) {
          error = 'This field is required'
        } 
        return error
      }

  return (

      <VStack width="100%" height="100vh" alignItems="center" justifyContent="center" spacing={8}>
       
        <Heading>Register</Heading>
          
        <VStack>
        <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={(values, actions) => {
        const {username, password} = values
       setTimeout(async () => {
        try {
            const sendValues = await axios.post('https://jokerapi-usjt.herokuapp.com/user', {
                username,
                password
            },
            {
                withCredentials: true
            })
    
        if(sendValues.data.token){
            setCookie('token', sendValues.data.token)
           navigate(`profile/${sendValues.data.username}`)
        }

       
        actions.setSubmitting(false)
        } catch (error) {
            console.log(error)
            if(error.response.status === 409){
                alert('Usuário já existe')
            }
            actions.setSubmitting(false)
        }
      }, 1000)
      }}

    >
      {(props) => (
        <Form>
          <Field name='username' validate={validate}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.username && form.touched.username}>
                <FormLabel htmlFor='username'>Username</FormLabel>
                <Input {...field} id='username' placeholder='username' />
                <FormErrorMessage>{form.errors.username}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

            
          <Field name='password' validate={validate}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.password && form.touched.password}>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <Input {...field} id='password' placeholder='password' />
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>


          <Button
            mt={4}
            colorScheme='blue'
            isLoading={props.isSubmitting}
            type='submit'
          >
            Sign Up
          </Button>
        </Form>
      )}
    </Formik>
        </VStack>

      </VStack>
   
  )
}
