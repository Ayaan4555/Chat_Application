import React, { useState } from 'react'
import { FormControl, FormLabel, VStack , Input, InputGroup, InputRightElement, Button} from '@chakra-ui/react';
import {useToast} from '@chakra-ui/react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../Context/ChatProvider';

const Login = () => {

    
        const [show , setShow] = useState(false)
        const [email , setEmail] = useState();
        const [password , setPassword] = useState();
        const [loading , setLoading] = useState(false);
    
        const toast = useToast();
        const navigate = useNavigate();
        const handleClick = () => setShow(!show);

        const {setUser} = ChatState();
    
       
    
        const submitHandler = async () => {
            setLoading(true);
            if(!email || !password){
                toast({
                    title: "Please Fill all the Fields",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom,"
                });
                setLoading(false);
                return;
            }

            //console.log(email , password);

            try {
                const config = {
                    headers: {
                        "Content-type" : "application/json",
                    },
                };

                const {data} = await axios.post("/api/user/login" , {email , password},config);

                // console.log(JSON.stringify(data));

                toast({
                    title: "Login Successful",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom,"
                });
                setUser(data);
                localStorage.setItem("userInfo", JSON.stringify(data));
                setLoading(false);
                navigate("/chats");
            } catch (error) {
                toast({
                    title: "Error Occured!",
                    description: error.response.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom,"
                });
                setLoading(false);
            }
        };
    

  return (
    <VStack spacing='5px' color='black'>
            
    
            <FormControl id='email' isRequired>
                <FormLabel >Email</FormLabel>
                <Input
                    placeholder='Enter Your Email'
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                />
            </FormControl>
    
            <FormControl id='password' isRequired>
                <FormLabel >Password</FormLabel>
                <InputGroup>
                <Input
                    type={show ? 'text':'password'}
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                />
    
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                         {show ? "Hide" : "Show"}
                        </Button>
                
                    </InputRightElement>
                </InputGroup>
            </FormControl>
    
    
           
    
            <Button
                colorScheme='blue'
                width='100%'
                style={{marginTop:15}}
                onClick={submitHandler}
                isLoading={loading}
            >
                Login
            </Button>

            {/* <Button
                variant='solid'
                colorScheme='red'
                width='100%'
                onClick={()=>{
                    setEmail("guest@example.com");
                    setPassword("123456")
                }}
            >
                Get Guest User Credentials
            </Button> */}

        </VStack>
  )
}

export default Login
