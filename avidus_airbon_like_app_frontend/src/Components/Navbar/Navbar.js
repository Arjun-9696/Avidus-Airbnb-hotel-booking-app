// import React from 'react';
// import { Box, Flex, Heading, Button, useToast } from '@chakra-ui/react';
// import { NavLink, useNavigate } from 'react-router-dom';


// const Navbar = () => {
//     let isAuth = useSelector((state) => state.AuthReducer.isAuth);
//     const toast = useToast()
//     const dispatch = useDispatch();
//     const logoutHandler = () => {
//         localStorage.removeItem('token');
//         dispatch(logout());
//         toast({
//             title: 'Log Out Successful 👋',
//             description: 'Visit again 🙏',
//             status: 'success',
//             duration: 3000,
//             isClosable: true,
//             position: 'top',
//         });
//     };
//     const navigate = useNavigate();
//     const headingHandle = () => {
//         navigate('/')
//     }
//     return (
//         <Box>
//             <Flex justifyContent="space-between" margin="20px" className="navbar">
//                 <Box h="3.25rem" w="80%" display="flex">
//                     <Box paddingLeft="50px">
//                         <Heading cursor={"pointer"} colorScheme="black" onClick={headingHandle} >Avidus Airbnb App</Heading>
//                     </Box>
//                 </Box>
//                 <Box>
//                     <NavLink to="propertyform">
//                         <Button colorScheme="blue">Add Property</Button>
//                         </NavLink>
//                 </Box>
//                 <Box marginRight="20px">
//                     {isAuth ? (
//                         <Button colorScheme="blue" onClick={logoutHandler}>
//                             Sign Out
//                         </Button>
//                     ) : (
//                         <NavLink to="/signin">
//                             <Button colorScheme="blue">Sign In</Button>
//                         </NavLink>
//                     )}
//                 </Box>
//             </Flex>
//             <hr />
//         </Box>
//     );
// };

// export default Navbar;

import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    useToast,
    Heading,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../Redux/Auth/actions';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getLocalData } from '../../Utils/LocalStorage';
const Links = ['Dashboard', 'Projects', 'Team'];

// const NavLink = ({ children }) => (
//     <Link
//         px={2}
//         py={1}
//         rounded={'md'}
//         _hover={{
//             textDecoration: 'none',
//             bg: useColorModeValue('gray.200', 'gray.700'),
//         }}
//         href={'#'}>
//         {children}
//     </Link>
// );

const Navbar=()=> {
    const [userName,setUserName]=useState("")
    const { isOpen, onOpen, onClose } = useDisclosure();
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
    useEffect(() => {
        const storedData = getLocalData("token")
        let userData = JSON.parse(storedData)
        setUserName(userData.user.name)
    }, []);
    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box paddingLeft="20px">
                                                <Heading cursor={"pointer"} size="sm" colorScheme="black" onClick={headingHandle} >Avidus Airbnb App</Heading>
                                         </Box>
                        {/* <Box>Avidus Airbnb App</Box> */}
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}>
                            <NavLink to="propertyform"
                                px={2}
                                py={1}
                                
                                >
                                <Button colorScheme="gray">
                                    
                                Add Property
                                    </Button> 
                            </NavLink>
                        </HStack>
                    </HStack>
                   
                    <Flex alignItems={'center'}>
                        <NavLink to="/userProfile">
                            <Button
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}
                                marginRight="20px">
                                <Avatar
                                    size={'sm'}
                                    name={userName}
                                   
                                />
                            </Button>
                        </NavLink>
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
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {/* {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))} */}
                            <NavLink to="propertyform"
                                px={2}
                                py={1}

                            >
                                <Button colorScheme="gray">

                                    Add Property
                                </Button>
                            </NavLink>
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}
export default Navbar