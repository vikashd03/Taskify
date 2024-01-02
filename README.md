# Taskify - MERN Stack Todo List App

Taskify is a simple Todo List application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and TypeScript.

## Features

- Add, edit, and delete tasks
- Mark tasks as completed
- Organize tasks into categories
- User authentication (coming soon)

## Tech Stack

- MongoDB: Database for storing tasks
- Express.js: Backend framework for handling API requests
- React.js: Frontend library for building the user interface
- Node.js: Server-side runtime for running the backend
- TypeScript: Language for adding static types to JavaScript

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/vikashd03/Taskify.git
   ```

2. Install dependencies for the server:

   ```bash
   cd taskify/server
   npm install
   ```

3. Install dependencies for the client:

   ```bash
   cd ../client
   npm install
   ```

4. Create a `.env` file in the `server` directory with your MongoDB connection string and port:

   ```env
   MONGO_URI=your_mongo_connection_string
   PORT=server_port
   ```

5. Run the server:

   ```bash
   cd ../server
   npm start
   ```

6. Create a `.env` file in the `client` directory with your client port:

   ```env
   PORT=client_port
   ```

7. Run the client:

   ```bash
   cd ../client
   npm start
   ```

## Contributing

Contributions are welcome! Feel free to open issues and pull requests.

## License

This project is licensed under the [MIT License](LICENSE).