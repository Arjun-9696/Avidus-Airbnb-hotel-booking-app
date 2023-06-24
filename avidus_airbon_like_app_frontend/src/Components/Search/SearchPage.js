import React, { useState } from 'react';
import axios from 'axios';
import SearchForm from './SearchForm';
import SearchResult from './SearchResult';


const SearchPage = ({ onClose }) => {
    const [searchedData, setSearchedData] = useState([]);
 
    const handleSearch = async (filters) => {
        const params = new URLSearchParams()
        for (const key in filters) {
            if (filters.hasOwnProperty(key) && filters[key] !== '') {
                params.append(key, filters[key]);
            }
        }
        const queryString = params.toString();
        console.log(queryString);
        try {
            const url = `http://localhost:9080/search?${queryString}`;
            const response = await axios.get(url);
            console.log('response:serching', response)
            setSearchedData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Search Properties</h2>
            {searchedData.length > 0 ? <SearchResult onClose={onClose} searchedData={searchedData} setSearchedData={setSearchedData}/> : <SearchForm handleSearch={handleSearch}  />}
           
            
          
        </div>

    );
};

export default SearchPage;
