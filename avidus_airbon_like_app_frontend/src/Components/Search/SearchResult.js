import React from 'react';
import "./SearchResult.css"

import { Box, Card, CardBody, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const SearchResult = ({ searchedData, setSearchedData, onClose }) => {
    console.log('searchedData:', searchedData)
    return (
        <Box marginBottom={"50px"}>
            <Heading paddingTop={5} size="lg" textAlign={"center"}>Property Listings</Heading>
            <Box className="listing_div" >
                {searchedData?.map((property) => (
                    <Box key={property._id}>
                        <Card maxW='sm' onClick={onClose}>
                            <NavLink to={`/property/${property._id}`} onClick={() => setSearchedData([])}>
                                <CardBody>
                                    <Image
                                        src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                                        alt='Green double couch with wooden legs'
                                        borderRadius='lg'
                                        w="100%"
                                    />
                                    <Stack mt='6' spacing='3'>
                                        <Heading size='md'>{property.title}</Heading>
                                        {/* <Text>
                      {description}
                  </Text> */}
                                        <Text>
                                            {property.location}
                                        </Text>
                                        <Text color='blue.600' fontSize='2xl'>
                                            ₹ {property.price}.00/day
                                        </Text>
                                        <Text color='blue.600' fontSize='lg'>
                                            20% Discount
                                        </Text>
                                    </Stack>
                                </CardBody>
                            </NavLink>
                        </Card>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default SearchResult;
