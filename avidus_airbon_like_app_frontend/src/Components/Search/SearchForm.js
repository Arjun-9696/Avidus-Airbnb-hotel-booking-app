import React, { useEffect, useState } from 'react';
import { Box, Image, Input, SimpleGrid, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Bangalore from "../../Images/bangalore.png"
import Hydrabad from "../../Images/hydrabad.png"
import Mysore from "../../Images/mysore.png"
import Goa from "../../Images/goa.jpg";
import Channai from "../../Images/chennai.jpg"
import Mumbai from "../../Images/mumbai.jpg"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';

const SearchForm = ({ handleSearch }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());


    // ................................................................................
    const [startDay, setStartDay] = useState("");
    const [endDay, setEndDay] = useState("");
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
    useEffect(() => {
        setStartDay(formatDate(startDate))
        setEndDay(formatDate(endDate))
    }, [handleSelect])
    // ........................................................................
    // const [location, setLocation] = useState("")
    const handleClick = (item) => {
        setLocation(item)
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const filters = {
            title,
            description,
            location,
            price,
            startDate,
            endDate,
        };
        handleSearch(filters);
    };

    return (<>
        <form onSubmit={handleFormSubmit}>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
            <input type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
            <input type="text" placeholder="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <input type="text" placeholder="End Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            <button type="submit">Search</button>
        </form>
        <>
            <Tabs variant='soft-rounded' colorScheme='green'>
                <TabList>
                    <Tab>Location</Tab>
                    <Tab>Title</Tab>
                    <Tab>Date</Tab>
                    <Tab>Price</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Stack>
                            <SimpleGrid columns={[2, null, 3]} spacing='30px'>
                                <Box bg='tomato' height='200px'
                                    onClick={() => handleClick("Banaglore")}>
                                    <Image src={Bangalore} width={"100%"} height={"100%"} />
                                </Box>
                                <Box bg='tomato' height='200px' onClick={() => handleClick("Mysore")}> <Image src={Mysore} width={"100%"} height={"100%"} /></Box>
                                <Box bg='tomato' height='200px' onClick={() => handleClick("Goa")}> <Image src={Goa} width={"100%"} height={"100%"} /></Box>
                                <Box bg='tomato' height='200px'

                                    onClick={() => handleClick("Hyderabad")}> <Image src={Hydrabad} width={"100%"} height={"100%"} /></Box>
                                <Box bg='tomato' height='200px' onClick={() => handleClick("Chennai")}> <Image src={Channai} width={"100%"} height={"100%"} /></Box>
                                <Box bg='tomato' height='200px' onClick={() => handleClick("Mumbai")}> <Image src={Mumbai} width={"100%"} height={"100%"} /></Box>
                            </SimpleGrid>
                        </Stack>
                    </TabPanel>
                    <TabPanel>
                        <Input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </TabPanel>
                    <TabPanel>
                        <div className='calendNavBarHodl mx-auto'>
                            <div className='NavBarCalendar'>
                                <DateRangePicker color='black' ranges={[selectionRange]} minDate={new Date()} rangeColors={["#black"]} onChange={handleSelect} />
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <p>price!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>


    </>

    );
};

export default SearchForm;
