# **Autumn - Project Management Platform**

## Description
Autumn is a project management platform inspired by Trello. The platform allows users to create and manage projects in an intuitive and organized way. Like Trello, it focuses on organizing projects into boards, lists, and cards. Users can perform CRUD (Create, Read, Update, Delete) operations on lists and cards. 

The platform also supports:
- **Authentication**: Users can sign up, log in, and authenticate using JWT tokens.
- **Sign-up & Email Verification**: New users can sign up, and email verification is required before they can start using the platform.
- **Password Recovery**: Users can recover their passwords via email using JWT tokens.

The primary goal of Autumn is to provide a simple and efficient way for teams and individuals to manage their projects, similar to Trello's visual approach, using lists and cards as the core organizational structure.

## Project Structure

### Frontend (public)
The `public` folder contains everything related to the frontend:
- **index.html**: Contains only a single HTML line. All the content is dynamically rendered from JavaScript.
- **js**: This folder contains the main JavaScript file, `router.js`, which handles routing and the rendering of different views. The views are modular and located in the `views` folder. Other important files are:
  - **controllers**: Handles the interaction between views and the data.
  - **api**: Contains functions to interact with the backend API.
- **css**: The CSS folder is organized by views, with each view having its own styles. There is also a general styles file for shared styling.
- **assets**: Contains images and other static files.
- **components**: Previously used for PHP modular design but is not in use at the moment.

### Backend (backend)
The `backend` folder contains everything related to the server-side logic:
- **config**: Contains environment variables managed with `dotenv`.
- **db**: Handles the configuration of Sequelize CLI, database connections, model structure, relationships, and migrations.
- **libs**: Contains the Sequelize configuration that is used outside of the CLI and other general utility libraries.
- **middlewares**: Manages error handling and data validation.
- **routes**: Contains the API endpoints for handling requests.
- **schemas**: Defines data validation schemas using JOI.
- **services**: Implements business logic using Object-Oriented Programming (OOP).
- **utils**: Stores Passport.js strategies for authentication and a CRON job that deletes unverified users after 7 days.
- **index.js**: The main entry point for the backend, which centralizes all the configurations and initializes the server.

## Requirements to Run

1. Install the necessary dependencies using npm:
    ```bash
    npm install
    ```

2. For development, run the following:
    ```bash
    npm run dev
    ```

3. For production, use:
    ```bash
    npm run start
    ```

## Installation and Usage Instructions

1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Configure the `.env` file in the root of the backend directory. Ensure the required environment variables (such as database URL, JWT secret, etc.) are correctly set.

4. In the `public/js/api/api.js` file, change the base URL of the API depending on whether you're in development or production mode.

5. Run the development server:
    ```bash
    npm run dev
    ```

   Or for production:
    ```bash
    npm run start
    ```

## License

This project is licensed under the MIT License.

