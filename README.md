# Student Debt Issues Platform

## Description

The Student Debt Issues Platform is a web application that addresses student debt challenges through community-driven discussions, resources, and tools. This platform features a Ruby on Rails API backend and a React frontend, providing users with a seamless and interactive experience.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)

## Installation

To set up the Student Debt Issues Platform locally, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/Tolulope-Awoyomi/phase4-app 
   ```

2. Navigate to the project directory:

   ```bash
   cd phase4-app
   ```

3. Install project dependencies for both the frontend and backend:

   ```bash
   cd client
   npm install
   cd phase4-app
   bundle install
   ```

4. Configure environment variables as needed (e.g., database connection, authentication settings).

5. Set up the database and run migrations:

   ```bash
   rails db:create
   rails db:migrate
   ```

6. Start the Rails server and the React development server:

   ```bash
   rails s
   cd client
   npm start
   ```

## Usage

Once the platform is up and running, users can:

- Browse and search for discussions related to student debt issues.
- Share personal stories, challenges, and insights regarding student loan debt.
- Discover resources, tips, and strategies for managing and reducing student debt.
- Engage in discussions with other users, offering advice and support.
- Contribute to the community by sharing articles, tools, and financial literacy content.

## Features

Key features of the Student Debt Issues Platform include:

- User registration and authentication with secure password protection.
- User sessions to allow users to stay logged in.
- Discussion boards organized by topics (e.g., loan forgiveness, budgeting).
- Commenting and thread-based discussions for each topic.
- User profiles showcasing contributions and discussions.
- Resource library with educational articles, calculators, and tools.
- Real-time notifications for responses to user contributions.
- Three different client-side routes using React Router for easy navigation.

## Backend Details

- Backend built using Ruby on Rails.
- Three primary models: User, Discussion Topic, and Resource.
- Reciprocal many-to-many relationship between Discussion Topics and Users, implemented with two has-many-through relationships and a joins table.
- Full CRUD actions for Discussion Topics and Resources.
- RESTful routing convention for backend routes.
- Active Record validations for most attributes.
- Controller validations to handle error responses for failed actions.

## Frontend Details

- Frontend built using React.
- React Context API used to persist the logged-in user's object in frontend state, eliminating prop drilling.
- Three different client-side routes using React Router for a seamless user experience.

## Contributing

Contributions to the Student Debt Issues Platform are encouraged! If you wish to contribute, please follow these guidelines:

1. Fork the project repository.
2. Create a new branch for your feature, improvement, or bug fix.
3. Implement your changes, commit them, and push to your fork.
4. Submit a pull request to the main repository, clearly describing your changes and their purpose.

Ensure your code adheres to the project's coding standards and includes relevant tests.

## License

This project is licensed under the MIT License. Refer to the [LICENSE.md](LICENSE.md) file for more details.
