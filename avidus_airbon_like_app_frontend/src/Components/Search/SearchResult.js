import React from 'react';

const SearchResult = ({ properties }) => {
    return (
        <div>
            {properties.map((property) => (
                <div key={property.id}>
                    <h2>{property.title}</h2>
                    <p>{property.description}</p>
                    <p>{property.location}</p>
                    <p>{property.price}</p>
                    <p>{property.startDate}</p>
                    <p>{property.endDate}</p>
                </div>
            ))}
        </div>
    );
};

export default SearchResult;
