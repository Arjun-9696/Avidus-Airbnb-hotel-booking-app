import { Box, Button, Card, CardBody, CardFooter, Flex, Heading, Image, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { differenceInDays } from 'date-fns'
import { getLocalData } from '../../Utils/LocalStorage';

const Property = () => {
    const [property, setProperty] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [startDay, setStartDay] = useState("");
    const [endDay, setEndDay] = useState("");
    const { id } = useParams(); // Extract the ID from the URL
    const toast = useToast();
    // .................................................................................


    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear());
        return `${day}-${month}-${year}`;
    };

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate)
    }
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection"
    }
    var daysCheck = differenceInDays(endDate, startDate);
    console.log('daysCheck:', daysCheck)

    useEffect(() => {
        setStartDay(formatDate(startDate))
        setEndDay(formatDate(endDate))
    }, [handleSelect])
    console.log('startDay:', startDay)
    console.log('endday:', endDay)

    // .................................................................................


        const storedData = getLocalData("token")
        let userId=JSON.parse(storedData)
   


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

    let Total = (daysCheck + 1) * property.price;
    let discount=Total*0.2;
    let finalPrice =Total-discount;

    const handleBooking = async (e) => {
        e.preventDefault();
        try {
            const data = {
                propertyId: id,
                userId: userId.user._id,
                startDate: startDay,
                endDate: endDay,
                days: daysCheck + 1,
                cost: finalPrice
            };
            // Make a POST request to the backend API to create a booking
            const response = await axios.post('http://localhost:9080/booking', data);
            toast({
                title: 'Property Booked Successfully 🥳',
                description: 'Enjoy your vacation 👍',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top',
            }); // Handle the response as needed
        } catch (error) {
            console.error(error);
            toast({
                title: 'Something went Wrong !',
                description: "Server is down !😔",
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
        }
    };

    return (
        <>
            <Box>
                <Stack minH={'50vh'} direction={{ base: 'column', sm: 'row' }}>

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
                                        ₹ {property.price} / day
                                    </Text>
                                    <Text py='2' color='blue.600' fontSize='lg'>
                                        20% Discount
                                    </Text>
                                </CardBody>
                            </Stack>
                        </Card>
                    </Box>
                    <Box marginRight={40} marginTop={20}>
                        <div className='calendNavBarHodl mx-auto'>
                            <div className='NavBarCalendar'>
                                <DateRangePicker color='black' ranges={[selectionRange]} minDate={new Date()} rangeColors={["#black"]} onChange={handleSelect} />
                            </div>
                        </div>
                        <Stack direction={{ base: 'column', sm: 'row' }} >
                            <Box  margin={"auto"}>
                                <Text>Total Amount for {daysCheck + 1} days </Text>
                                <Heading size="md" py={2} textDecoration={"line-through"} >₹ {Total}</Heading>
                                <Heading size="md" py={2} fontSize='2xl' color='blue.600' >₹ {finalPrice}</Heading>
                                <Button variant='solid' my={2} colorScheme='blue' w="100%" onClick={(e) => { handleBooking(e)}}>
                                    Book
                                </Button>
                            </Box>
                        </Stack>
                    </Box>

                </Stack>
            </Box>
        </>
    );
};

export default Property;
