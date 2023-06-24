import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./PropertyList.css"
import Cards from '../Card/Card';
import { Box, Heading, Spinner } from '@chakra-ui/react';
function PropertyList() {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        // Make a GET request to the backend API to fetch property listings
        const fetchProperties = async () => {
            try {
                const response = await axios.get('https://avidus-assignment-production.up.railway.app/listings');
                console.log('response:', response)
                setProperties(response.data.listings
                );
            } catch (error) {
                console.error(error);
            }
        };
        fetchProperties();
    }, []);

    return (
        <>
            <Box marginBottom={"50px"}>
                <Heading paddingTop={5} size="lg" textAlign={"center"}>Property Listings</Heading>
                {properties.length > 0 ? (<Box className="listing_div" >
                    {properties?.map((property) => (
                        <Box key={property._id}>
                            <Cards title={property.title} id={property._id} description={property.description} location={property.location} price={property.price} />
                        </Box>
                    ))}
                </Box>) : (<Box display={"flex"} marginTop={10} justifyContent={"center"} alignItems={"center"}>
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />
                </Box>)}

            </Box>
        </>
    );
}

export default PropertyList;
