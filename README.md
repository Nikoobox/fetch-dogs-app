# Fetch Dogs App

## Troubleshooting Authentication Issues

If you encounter a **401 Authentication error** after signing in, it may be due to your browser not allowing the use of third-party cookies. To resolve this issue:

### For Chrome Users:

1. Open Chrome settings.
2. Navigate to **Privacy and security**.
3. Click on **Cookies and other site data**.
4. Ensure that **Allow all cookies** or **Block third-party cookies in Incognito** is selected.

After adjusting these settings, try logging in again.

## Visit the Site

Check out the live application at [Fetch a Dog](https://fetch-a-dog-ns.netlify.app/).

## Overview

Welcome to the Fetch Dogs App! This application is dedicated to dog lovers and allows users to explore a database of shelter dogs, helping them find loving homes. Users can log in, filter through various dog breeds, and create matches based on their favorite dogs.

## Technology Stack

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A superset of JavaScript that provides static typing.
- **Redux**: A predictable state container for JavaScript apps.
- **Redux Toolkit**: A library for efficient Redux development.
- **Redux-Saga**: A middleware library for handling side effects in Redux.
- **Material-UI (MUI)**: A popular React UI framework for implementing Google's Material Design, offering a wide range of pre-designed components to speed up development. MUI's grid system is leveraged to ensure the app remains responsive across different screen sizes, from mobile to desktop. Custom theming was used to provide consistency and reduce code duplication across the app.
- **Responsive Design**:
  The app layout adapts seamlessly to all device types, providing a user-friendly experience whether on mobile, tablet, or desktop.
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
