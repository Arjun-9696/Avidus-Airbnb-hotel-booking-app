import React from 'react';
import { Box, Flex, Heading, Button, useToast } from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../Redux/Auth/actions';

const Navbar = () => {
    let isAuth = useSelector((state) => state.AuthReducer.isAuth);
    const toast = useToast()
    const dispatch = useDispatch();
    const logoutHandler = () => {
        localStorage.removeItem('token');
        dispatch(logout());
        toast({
            title: 'Log Out Successful 👋',
            description: 'Visit again 🙏',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top',
        });
    };
    const navigate = useNavigate();
    const headingHandle = () => {
        navigate('/')
    }
    return (
        <Box>
            <Flex justifyContent="space-between" margin="20px" className="navbar">
                <Box h="3.25rem" w="80%" display="flex">
                    <Box paddingLeft="50px">
                        <Heading cursor={"pointer"} colorScheme="black" onClick={headingHandle} >Avidus Airbnb App</Heading>
                    </Box>
                </Box>
                <Box>home</Box>
                <Box marginRight="20px">
                    {isAuth ? (
                        <Button colorScheme="blue" onClick={logoutHandler}>
                            Sign Out
                        </Button>
                    ) : (
                        <NavLink to="/signin">
                            <Button colorScheme="blue">Sign In</Button>
                        </NavLink>
                    )}
                </Box>
            </Flex>
            <hr />
        </Box>
    );
};

export default Navbar;