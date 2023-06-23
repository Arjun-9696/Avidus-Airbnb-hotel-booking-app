import { Box, Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Property = () => {
    const [property, setProperty] = useState([]);
    console.log('property:', property)
    const { id } = useParams(); // Extract the ID from the URL
    console.log('id:', id)

    const fetchProperties = async () => {
        try {
            const response = await axios.get(`http://localhost:9080/listings/${id}`);
            console.log('response:', response)
            setProperty(response.data.list);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchProperties();
    }, [id]);

    // if (!person) {
    //     return <div>Loading...</div>;
    // }

    return (
        <Box w="lg" margin={"auto"} py={20}>
            <Card
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
            >
                <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '200px' }}
                    src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                    alt='Caffe Latte'
                />

                <Stack >
                    <CardBody>
                        <Heading size='lg'>{property.title}</Heading>

                        <Text py='2'>
                        {property.description}
                        </Text>
                        <Text fontSize={20}>
                        {property.location}
                        </Text>
                        <Text py='2' color='blue.600' fontSize='2xl'>
                            ₹ {property.price}
                        </Text>
                    </CardBody>

                    <CardFooter>
                        <Button variant='solid' colorScheme='blue'>
                            Buy Latte
                        </Button>
                    </CardFooter>
                </Stack>
            </Card>
        </Box>
    );
};

export default Property;
