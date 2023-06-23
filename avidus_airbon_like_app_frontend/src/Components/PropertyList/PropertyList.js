// components/Listings/PropertyList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./PropertyList.css"
import Cards from '../Card/Card';
function PropertyList() {
    const [properties, setProperties] = useState([]);


    useEffect(() => {
        // Make a GET request to the backend API to fetch property listings
        const fetchProperties = async () => {
            try {
                const response = await axios.get('http://localhost:9080/listings');
                console.log('response:', response)
                setProperties(response.data.listings
);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProperties();
    }, [properties]);
    console.log('properties:', properties)
    return (
        <div className="listing_div">
            <h2>Property Listings</h2>
            {properties?.map((property) => (
                <div key={property._id}>
                    <Cards title={property.title} id={property._id} description={property.description} location={property.location} price={property.price}/>
                </div>
            ))}
        </div>
    );
}

export default PropertyList;
