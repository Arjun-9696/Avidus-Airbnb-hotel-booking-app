// components/UserProfile/UserProfile.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getLocalData } from '../../Utils/LocalStorage';
import { Box, Card, CardBody, CardHeader, Heading, Text } from '@chakra-ui/react';

function UserProfile() {
    const [userId, setUserId] = useState("")
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [booked, setBooked] = useState([])
    const [propertyData, setPropertyData] = useState([]);

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
    }, [userId,booked])  
    
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
        console.log('result:', result)
    }, [userId, booked,propertyData])
    
    return (
        <Box maxW={"50%"} margin="auto" marginTop={"2rem"}>
            <Card  variant="filled" py={20}>
                <CardHeader>
                    <Heading size='md'> {userName}</Heading>
                </CardHeader>
                <CardBody>
                    <Text>{userEmail}</Text>
                </CardBody>
            </Card>
            {/* <h2>User Profile</h2>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p> */}
            {/* Additional user profile information */}
        </Box>
    );
}

export default UserProfile;
