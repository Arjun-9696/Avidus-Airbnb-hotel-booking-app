// components/Listings/PropertyForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Stack, Textarea, useToast } from '@chakra-ui/react';

function PropertyForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState(0);
    const toast = useToast();
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
                // description: 'Enjoy your job search 👍',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top',
            }); // Handle the response as needed
            setDescription("")
            setLocation("")
            setPrice("")
            setTitle("")
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
            {/* <Stack minH={'50vh'} w='100px' direction={{ base: 'column', md: 'column' }}> */}
                {/* <Flex p={3} flex={1} align={'center'} justify={'center'}> */}
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
                {/* </Flex> */}
            {/* </Stack> */}
            {/* <form onSubmit={handleCreateProperty}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                />
                <button type="submit">Create Listing</button>
            </form> */}
        </Box>
    );
}

export default PropertyForm;
