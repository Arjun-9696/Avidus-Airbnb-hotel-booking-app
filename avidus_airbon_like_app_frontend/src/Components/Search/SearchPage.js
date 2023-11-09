import React, { useState } from 'react';
import axios from 'axios';
import SearchForm from './SearchForm';
import SearchResult from './SearchResult';
import { Box, Text } from '@chakra-ui/react';

const SearchPage = ({ onClose }) => {
    const [searchedData, setSearchedData] = useState([]);

    // Fetching the searched data from search
    const handleSearch = async (filters) => {
        const params = new URLSearchParams()
        for (const key in filters) {
            if (filters.hasOwnProperty(key) && filters[key] !== '') {
                params.append(key, filters[key]);
            }
        }

        const queryString = params.toString();
        try {
            const url = `https://avidus-backend.onrender.com/search?${queryString}`;
            const response = await axios.get(url);
            setSearchedData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box>
            {searchedData.length > 0 ? <SearchResult onClose={onClose} searchedData={searchedData} setSearchedData={setSearchedData} /> : <SearchForm handleSearch={handleSearch} />}
        </Box>
    );
};

export default SearchPage;
