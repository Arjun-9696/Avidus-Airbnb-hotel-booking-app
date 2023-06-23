import { Box, Button, Heading } from '@chakra-ui/react';
import React from 'react'
import { NavLink } from 'react-router-dom';

const Error = () => {
    return (
        <Box>
            <Heading
                textAlign="center"
                padding="10%"
                as="h1"
                size="2xl"
                noOfLines={1}
            >
                404 ERROR
                <br />
                <br />
                Page Not Found 😥!
            </Heading>
            <NavLink to="/">
                <Button marginLeft="45%" >Goto Home</Button>
            </NavLink>
        </Box>
    );
}

export default Error