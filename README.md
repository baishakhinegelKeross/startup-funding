# Startup-Funding

A Next.js application designed to streamline startup funding processes, built on top of MongoDB. This project provides an intuitive interface for fundraising campaigns, enabling startups and investors to manage and track investments seamlessly.

---

## Table of Contents

1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [Installation](#installation)
4. [Environment Variables](#environment-variables)
5. [Running the Application](#running-the-application)
6. [Additional Scripts](#additional-scripts)
7. [Contributing](#contributing)
8. [License](#license)

---

## Overview

- **Repository URL**: [https://github.com/baishakhinegelKeross/startup-funding](https://github.com/baishakhinegelKeross/startup-funding)
- **Tech Stack**:
  - **Frontend**: [Next.js](https://nextjs.org/)
  - **Backend**: Node.js, MongoDB
  - **Styling**: [Tailwind CSS](https://tailwindcss.com/)

This application helps startups to organize and manage fundraising campaigns while offering a secure and scalable foundation for future growth.

---

## Getting Started

To run this application locally, ensure you have the following tools installed:

- [Node.js](https://nodejs.org/) (LTS or Current)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) package manager
- A running [MongoDB](https://www.mongodb.com/) database instance (local or remote)

---

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/baishakhinegelKeross/startup-funding.git
   cd startup-funding
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

---

## Environment Variables

Create a `.env` file in the project root and include the following key-value pair:

```bash
NEXT_PUBLIC_REACT_APP_API_URL=http://192.168.3.217:8090/api/fundraiser
NEXT_PUBLIC_BACKEND_API_URL=http://192.168.3.217:8090
```

Note: Adjust the value to point to your desired API endpoint if needed.

If you have additional configuration (e.g., MongoDB connection string), include those as well, using the same format:

```bash
MONGODB_URI=mongodb://localhost:27017/yourDatabase
```

---

## Running the Application

### Development Server

Launch the development server with live reload:

```bash
npm run dev
# or
yarn dev
```

By default, the application should be accessible at [http://localhost:3000](http://localhost:3000).

### Production Build

Generate a production-ready build:

```bash
npm run build
# or
yarn build
```

Then start the production server:

```bash
npm run start
# or
yarn start
```

---

## Additional Scripts

- **Linting**: Check the codebase for style and formatting issues using ESLint.

  ```bash
  npm run lint
  # or
  yarn lint
  ```

- **Type Checking**: Verify all TypeScript types across the application.

  ```bash
  npm run typecheck
  # or
  yarn typecheck
  ```

---

## Contributing

Contributions are welcome! If you would like to make changes or report issues, feel free to open a pull request or create an issue in the GitHub repository.

---

## License

This project is licensed under the MIT License, permitting commercial and private use, modification, distribution, and private use.

---

Happy coding and welcome aboard the startup-funding project!
