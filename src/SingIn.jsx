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
import { SessionContext, getSessionCookie, setSessionCookie } from "./contexts/useSession"
import jwt_decode from "jwt-decode";

export default function SignIn() {

    const [session, setSession] = useState(getSessionCookie());


    const navigate = useNavigate()
    
    function validate(value) {
        let error
        if (!value) {
          error = 'This field is required'
        } 
        return error
      }

      useEffect(() => {
        
        
        setTimeout(async () => {
          if(session){
           const user = jwt_decode(session)
           navigate(`/profile/${user.user}`)
          }
        }, 100)
    },[session])

  return (

      <VStack width="100%" height="100vh" alignItems="center" justifyContent="center" spacing={8}>
       
        <Heading>Sign In</Heading>
          
        <VStack spacing={8}>
        <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={(values, actions) => {
        const {username, password} = values
       setTimeout(async () => {
     
        try {
            const sendValues = await axios.post('https://jokerapi-usjt.herokuapp.com/auth', {
                username,
                password
            },
            {
                withCredentials: true
            })
    
        if(sendValues.data.token){
            setSessionCookie(sendValues.data.token)

            if(getSessionCookie()){
              const username = jwt_decode(sendValues.data.token)
              navigate(`/profile/${username.user}`)
            }
  
        }

       
        actions.setSubmitting(false)
        } catch (error) {
            console.log(error)
            if(error.response.status === 400){
                alert('Dados inválidos')
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
            Sign In
          </Button>
        
          
        </Form>
      )}
    </Formik>

       <Link to="/register">
        <Text color="blue.400">
        You're new? create an account
        </Text>
       </Link>
        </VStack>

      </VStack>

  )
}
