import React, { useState } from 'react';
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Box,
    useToast,
    Text,
    Link,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { login } from '../../Redux/Auth/actions';
import { LOGIN_SUCCESS } from '../../Redux/Auth/actionTypes';
import { useNavigate } from 'react-router-dom';
import { Link as SignupLink } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();

    const loginHandler = () => {
        if (email === '' || password === '') {
            toast({
                title: 'Login Failed.',
                description: 'Enter valid email and password',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
        }
        if (email && password) {
            const params = {
                email,
                password,
            };
            dispatch(login(params)).then((r) => {
                if (r === LOGIN_SUCCESS) {
                    toast({
                        title: 'Login Successful 🥳',
                        description: 'Enjoy your job search 👍',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                        position: 'top',
                    });
                    navigate('/', { replace: true });
                } else {
                    toast({
                        title: 'Sign In Failed',
                        description: 'Oops something went wrong! Email/Password is wrong ',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                        position: 'top',
                    });
                }
            });
        }
    };
    {
        return (
            <Box className="signup">
                <Stack minH={'50vh'} direction={{ base: 'column', md: 'row' }}>
                    <Flex p={3} flex={1} align={'center'} justify={'center'}>
                        <Stack className="signupbox" spacing={2} w={'full'} maxW={'md'}>

                            <Heading fontSize={'2xl'}>Sign in</Heading>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    isRequired
                                />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    isRequired
                                />
                            </FormControl>
                            <Stack>
                                <Button
                                    marginTop="20px"
                                    colorScheme={'blue'}
                                    variant={'solid'}
                                    onClick={loginHandler}
                                >
                                    Sign in
                                </Button>
                            </Stack>
                            <Text
                                paddingTop="50px"
                                paddingBottom="20px"
                                fontSize={'lg'}
                                color={'gray.600'}
                            >
                                Ready to take the next step?
                                <br />
                                <SignupLink to="/signup">
                                    <Link color="blue.500">Create an account</Link>
                                </SignupLink>
                                ✌️
                            </Text>
                        </Stack>
                    </Flex>
                </Stack>
            </Box>
        );
    }
};
export default SignIn;