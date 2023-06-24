# `Avidus-Assignment` Airbnb-like Application

This is a simple Airbnb-like application built using the MERN stack (`MongoDB`, `Express.js`, `React`, `Node.js`). The application allows users to `register`, `create property listings`, `search for properties`, `book properties`, and `view user profiles`.

## Features

- User Registration and Authentication: `Users can register and create an account`. Basic authentication using a `username` and `password` is implemented.

- Property Listings: Users can create property listings with information such as `title`, `description`, `location`, and `price`. Property listings are displayed on the homepage.

- Search Page with Filters: Users can `search for properties` based on various filters, including a date filter for specifying a stay range, location, and size.

- Bookings: Users can `book` properties by selecting a property and a date range. `Booked` properties and their corresponding date ranges are displayed on the user's `profile page`.

- User Profiles: Each user has a profile page displaying their `basic information`. Users can view their own profile information and `Booked` properties and their corresponding date ranges are displayed on the user's `profile page`

## Technologies Used

- `MongoDB`: A NoSQL database used for storing property listings, user information, and bookings.

- `Express.js`: A web application framework used for handling server-side logic and API endpoints.

- `React`: A JavaScript library used for building user interfaces and rendering components.

- `Node.js`: A runtime environment used for server-side JavaScript execution.

## Installation

1. Clone the repository:
- avidus_airbon_like_app_backend (Backend)
- avidus_airbon_like_app_frontend (Frontend)
2. Install dependencies for both the client and server:
# `cd avidus_airbon_like_app_backend` for backend
# `cd avidus_airbon_like_app_frontend` for frontend
## `npm install`

3. Configure the database `Backend`:
- Create a MongoDB database and obtain the connection URI. 
- Update the `.env` file in the server directory with your MongoDB connection URI.

4. Run the application:
## `npm start`
