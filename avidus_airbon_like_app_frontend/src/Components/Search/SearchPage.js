import React, { useState } from 'react';
import axios from 'axios';
import SearchForm from './SearchForm';
import SearchResult from './SearchResult';


const SearchPage = () => {
    const [properties, setProperties] = useState([]);
 
    const handleSearch = async (filters) => {
        try {
            const response = await axios.get('/api/search', { params: filters });
            setProperties(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Search Properties</h2>
            <SearchForm handleSearch={handleSearch} />
            <SearchResult properties={properties} />
          
        </div>

    );
};

export default SearchPage;
