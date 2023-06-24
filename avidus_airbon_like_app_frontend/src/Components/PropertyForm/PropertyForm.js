import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Stack, Textarea, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function PropertyForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState();
    const toast = useToast();
    const navigate = useNavigate();
    const handleCreateProperty = async (e) => {
        e.preventDefault();
        try {
            // Make a POST request to the backend API to create a property listing
            const response = await axios.post('http://localhost:9080/listings', {
                title,
                description,
                location,
                price,
            });
            toast({
                title: 'Property Listed successfully 🥳',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top',
            });

            setDescription("")
            setLocation("")
            setPrice("")
            setTitle("")
            navigate('/')
        } catch (error) {
            toast({
                title: 'Something went Wrong !',
                description: 'Enter valid Inputs',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
        }
    };

    return (
        <Box className="signup">
            <Box margin="auto" w="40%">
                <Heading fontSize={'2xl'} paddingTop="20px">Create Property Listing</Heading>
                <FormControl isRequired marginTop="20px">
                    <FormLabel>Title</FormLabel>
                    <Input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Location</FormLabel>
                    <Input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </FormControl>
                <FormControl id="email" isRequired>
                    <FormLabel>Price</FormLabel>
                    <Input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                    />
                </FormControl>
                <Stack>
                    <Button marginTop="20px"
                        colorScheme={'blue'}
                        variant={'solid'}
                        onClick={handleCreateProperty}>Create Listing</Button>
                </Stack>
            </Box>
        </Box>
    );
}

export default PropertyForm;
