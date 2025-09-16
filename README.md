# Simple Blog Application

This is a full-stack blog application built with Node.js, Express, and Sequelize for the backend, and plain HTML, CSS, and JavaScript for the frontend. It provides basic functionalities for user registration, login, and creating/managing blog posts.

## Features

  * **User Authentication**: Users can register for a new account and log in. Authentication is handled using JSON Web Tokens (JWT).
  * **CRUD Operations for Posts**: Authenticated users can create, read, update, and delete (CRUD) their own blog posts.
  * **RESTful API**: A well-structured API for handling all backend operations.
  * **Simple Frontend**: A clean and simple user interface built with Bootstrap 5 for a responsive experience.
  * **SQLite Database**: Uses SQLite for a lightweight and file-based database.

## Technologies Used

  * **Backend**: Node.js, Express.js, Sequelize ORM, SQLite3
  * **Authentication**: `jsonwebtoken` for creating tokens, `bcryptjs` for hashing passwords.
  * **Frontend**: HTML, CSS, JavaScript, Bootstrap 5
  * **Development**: `nodemon` for automatic server restarts, `@faker-js/faker` for database seeding.

## Setup and Installation

To get this project up and running on your local machine, follow these steps:

**1. Clone the repository:**

```bash
git clone <your-repository-url>
cd <your-repository-directory>
```

**2. Install dependencies:**
Make sure you have Node.js and npm installed. Then, run the following command in the project's root directory:

```bash
npm install
```

**3. Set up the database:**
This project uses Sequelize for database migrations. To create the database and its tables, run:

```bash
npx sequelize-cli db:migrate
```

This will create a `database.sqlite` file in the root directory with the necessary `Users` and `Posts` tables.

**4. (Optional) Seed the database:**
To populate the database with some initial dummy data, run the following command:

```bash
npx sequelize-cli db:seed:all
```

This will add 10 fake users and 20 fake posts to your database.

**5. Run the application:**
You can run the server in two modes:

  * **For production:**
    ```bash
    npm start
    ```
  * **For development (with auto-reload):**
    ```bash
    npm run dev
    ```

The server will start on `http://localhost:3000`.

## API Endpoints

The application exposes the following RESTful API endpoints under the `/api` prefix:

### Authentication

  * `POST /api/register`: Register a new user.
      * **Body**: `{ "name": "...", "email": "...", "password": "..." }`
  * `POST /api/login`: Log in an existing user and receive a JWT token.
      * **Body**: `{ "email": "...", "password": "..." }`

### Posts

  * `GET /api/posts`: Get a list of all posts (Public).
  * `GET /api/posts/:id`: Get a single post by its ID (Public).
  * `POST /api/posts`: Create a new post (Protected - requires authentication).
      * **Headers**: `{ "Authorization": "Bearer <token>" }`
      * **Body**: `{ "title": "...", "content": "..." }`
  * `PUT /api/posts/:id`: Update an existing post (Protected - requires authentication).
      * **Headers**: `{ "Authorization": "Bearer <token>" }`
      * **Body**: `{ "title": "...", "content": "..." }`
  * `DELETE /api/posts/:id`: Delete a post (Protected - requires authentication).
      * **Headers**: `{ "Authorization": "Bearer <token>" }`

## Database Structure

The database consists of two main tables:

  * **`Users`**: Stores user information (`id`, `name`, `email`, `password`).
  * **`Posts`**: Stores blog post content (`id`, `title`, `content`, `userId`).

There is a one-to-many relationship where one `User` can have many `Posts`.

## Project Structure

```
.
├── config/
│   └── config.json         # Database configuration
├── controllers/
│   ├── authController.js   # Logic for user registration and login
│   └── postsController.js  # Logic for post-related operations
├── middleware/
│   └── auth.js             # JWT authentication middleware
├── migrations/
│   ├── ...-create-user.js  # Migration for Users table
│   └── ...-create-post.js  # Migration for Posts table
├── models/
│   ├── user.js             # Sequelize model for User
│   ├── post.js             # Sequelize model for Post
│   └── index.js            # Sequelize model loader
├── public/
│   ├── index.html          # Main HTML file for the frontend
│   └── main.js             # Frontend JavaScript logic
├── routes/
│   ├── auth.js             # Authentication routes
│   ├── posts.js            # Post routes
│   └── index.js            # Main router file
├── seeders/
│   ├── ...-demo-user.js    # Seeder for creating dummy users
│   └── ...-demo-post.js    # Seeder for creating dummy posts
├── .gitignore
├── app.js                  # Main application entry point
├── database.sqlite         # SQLite database file
└── package.json            # Project dependencies and scripts
```
