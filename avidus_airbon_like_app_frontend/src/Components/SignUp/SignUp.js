import React, { useReducer } from 'react';
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Image,
    Box,
    useToast,
    Text,
    Link,
} from '@chakra-ui/react';
import './SignUp.css';
import { REGISTER_SUCCESS } from '../../Redux/Auth/actionTypes';
import { useNavigate } from 'react-router-dom';
import { register } from '../../Redux/Auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link as SignupLink } from 'react-router-dom';

function reducer(state, action) {
    switch (action.type) {
        case 'name':
            return {
                ...state,
                name: action.payload,
            };
        case 'email':
            return {
                ...state,
                email: action.payload,
            };
        case 'password':
            return {
                ...state,
                password: action.payload,
            };
        default:
            return state;
    }
}
const initialState = {
    name: '',
    email: '',
    password: '',
};
const Signup = () => {
    const [state, setter] = useReducer(reducer, initialState);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();
    let isError = useSelector((state) => state.AuthReducer.isError);
    if (isError) {
        toast({
            title: 'Sign Up Failed',
            description: 'User already registered or password should be minimum 8 Characters',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top',
        });
        window.location.reload();
    }

    const signupHandler = () => {
        if (
            state.name === '' ||
            state.email === '' ||
            state.password === ''
        ) {
            toast({
                title: 'Enter all the information.',
                description: 'Enter all the information for creating a new account.',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
            window.location.reload();
        }
        dispatch(register(state)).then((r) => {
            if (r === REGISTER_SUCCESS) {
                toast({
                    title: 'Account created.',
                    description: "We've created your account for you.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top',
                });
                navigate('/signin', { replace: true });
            }
        });
    };
    {
        return (
            <Box className="signup">
                <Stack minH={'50vh'} direction={{ base: 'column', md: 'row' }}>
                    <Flex p={3} flex={1} align={'center'} justify={'center'}>
                        <Stack className="signupbox" spacing={2} w={'full'} maxW={'md'}>
                            <Heading fontSize={'2xl'}>Create a new account</Heading>
                            <FormControl id="name" isRequired>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    type="name"
                                    value={state.name}
                                    onChange={(e) =>
                                        setter({ type: 'name', payload: e.target.value })
                                    }
                                />
                            </FormControl>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    type="email"
                                    value={state.email}
                                    onChange={(e) =>
                                        setter({ type: 'email', payload: e.target.value })
                                    }
                                />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    value={state.password}
                                    onChange={(e) =>
                                        setter({ type: 'password', payload: e.target.value })
                                    }
                                />
                                <Text>Password Should be minimum 8 Characters</Text>
                            </FormControl>
                            <Stack>
                                <Button
                                    marginTop="20px"
                                    colorScheme={'blue'}
                                    variant={'solid'}
                                    onClick={signupHandler}
                                >
                                    Create Account
                                </Button>
                            </Stack>
                            <Text
                                paddingTop="20px"
                                paddingBottom="20px"
                                fontSize={'lg'}
                                color={'gray.600'}
                            >
                                Already have an account?
                                <br />
                                <SignupLink to="/signin">
                                    <Link color="blue.500">Sign in</Link>
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
export default Signup;