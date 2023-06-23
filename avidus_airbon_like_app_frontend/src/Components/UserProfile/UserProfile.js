// components/UserProfile/UserProfile.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getLocalData } from '../../Utils/LocalStorage';
import { Box, Card, CardBody, CardHeader, Heading, Image, Stack, Text } from '@chakra-ui/react';

function UserProfile() {
    const [userId, setUserId] = useState("")
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [booked, setBooked] = useState([])
    const [propertyData, setPropertyData] = useState([]);
    const [result, setResult] = useState([]);

    useEffect(() => {
        const storedData = getLocalData("token")
        let userData = JSON.parse(storedData)
        setUserName(userData.user.name)
        setUserEmail(userData.user.email)
        setUserId(userData.user._id)

    }, []);
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:9080/booking/${userId}`);
                setBooked(response.data.bookings);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUserProfile();
    }, [userId])

    console.log("booked", booked)
    useEffect(() => {
        const fetchData = async () => {
            const propertyIds = booked?.map(obj => obj.propertyId);
            const requests = propertyIds?.map(propertyId =>
                axios.get(`http://localhost:9080/listings/${propertyId}`)
            );
            try {
                const responses = await Promise.all(requests);
                console.log('responses:Promise.all', responses)
                const propertyData = responses?.map(response => response.data.list);
                setPropertyData(propertyData);
            } catch (error) {
                console.error('Error in fetching property data', error);
            }
        };
        fetchData();
    }, [userId, booked])

    console.log('propertyData:', propertyData)
    // ........................................................................................
    useEffect(() => {
        const result = booked?.map((item) => {
            const fetchedItem = propertyData.find((fetchedItem) => fetchedItem._id === item.propertyId);
            if (fetchedItem) {
                return {
                    title: fetchedItem.title,
                    description: fetchedItem.description,
                    location: fetchedItem.location,
                    startDate: item.startDate,
                    endDate: item.endDate,
                    days: item.days,
                    cost: item.cost
                };
            }
            return null;
        }).filter((item) => item !== null);
       setResult(result)
    }, [userId, booked, propertyData])

    return (
        <>
            <Box maxW={"50%"}  margin="auto" marginTop={"2rem"}>
                <Card variant="filled" py={20} textAlign={"center"} height={"10px"}>
                  
                        <Heading size='md'> {userName}</Heading>
                   
                        <Text>{userEmail}</Text>
                    
                </Card>
            </Box>
            <Box marginBottom={"50px"} >
                <Heading paddingTop={5} size="lg" textAlign={"center"}>Property Booked by {userName}</Heading>
                <Box className="listing_div" >
                    {result?.map((book,index) => (
                        <Box key={index}>
                            <Card maxW='sm' textAlign={"center"} >
                                {/* <NavLink to={`/property/${id}`}> */}
                                    <CardBody>
                                        <Image
                                            src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                                            alt='Green double couch with wooden legs'
                                            borderRadius='lg'
                                            w="100%"
                                        />
                                        <Stack mt='6' spacing='3'>
                                        <Heading size='md'>{book.title}</Heading>
                                            {/* <Text>
                      {description}
                  </Text> */}
                                            <Text>
                                            {book.location}
                                            </Text>
                                            <Text color='blue.600' fontSize='2xl'>
                                            ₹ {book.cost}
                                            </Text>
                                            <Text  fontSize='lg'>
                                            {book.days} days booked
                                            </Text>
                                        <Text  fontSize='lg'>
                                            Start Date : {book.startDate}
                                        </Text>
                                        <Text  fontSize='lg'>
                                            End date: {book.endDate}
                                        </Text>
                                        {/* <Text  fontSize='lg' textAlign={"justify"}>
                                            {book.description}
                                        </Text> */}
                                        </Stack>
                                    </CardBody>
                                {/* </NavLink> */}
                            </Card>
                        </Box>
                    ))}
                </Box>
            </Box>
        </>
    );
}

export default UserProfile;
