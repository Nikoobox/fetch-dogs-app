# Fetch Dogs App

## Overview

Welcome to the Fetch Dogs App! Here at Fetch, we love dogs and hope you do too! This application allows users to search through a database of shelter dogs to help find them a loving home. Users can log in, filter through dog breeds, and generate matches based on their favorite dogs.

## Technology Stack

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A superset of JavaScript that provides static typing.
- **Redux**: A predictable state container for JavaScript apps.
- **Redux Toolkit**: A library for efficient Redux development.
- **Redux-Saga**: A middleware library for handling side effects in Redux.
- **Material-UI (MUI)**: A popular React UI framework for implementing Google's Material Design.
- **REST API**: For communication with the backend service.
- **Vite**: A build tool that provides a fast development experience.

## App Functionality and Overview

The application allows users to:

1. **Login**: Users enter their name and email on a login screen and authenticate via a REST API.
2. **Search for Dogs**: After logging in, users can search for available dogs with the following features:
   - Filter by breed, age, or zipcode.
   - Paginate results.
   - Sort results alphabetically by breed, with options for ascending or descending order, age or name.
   - View all fields of the Dog object.
   - Select favorite dogs from search results.
3. **Generate Matches**: Users can generate a match based on their favorites by sending the IDs to the `/dogs/match` endpoint.
4. **Logot**: Hit this endpoint to end a user’s session. This will invalidate the auth cookie.

## How to Run the Project Locally

1. Clone the repository:

   ```
   git clone
   ```

2. Navigate to the project directory:

   ```
   cd fetch-dogs-app
   ```

3. Install dependencies:

   ```
   npm install
   ```

   or

   ```
   yarn
   ```

4. Start the development server:

   ```
   npm run dev
   ```

   or

   ```
   yarn run dev
   ```

Happy fetching!
