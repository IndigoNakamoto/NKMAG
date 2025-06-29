# Project Startup Instructions

This document provides the necessary steps to get the development environment for the NKMAG blog up and running.

## 1. Start the Database

This project uses MongoDB as its database. Ensure Docker Desktop is running, then execute the following command to start the MongoDB container:

```bash
docker run -d -p 27017:27017 --name my-mongo-db mongo
```

## 2. Set Node.js Version

To ensure compatibility, switch to the correct Node.js version using `nvm`. Thanks to the `.nvmrc` file, you can just run:

```bash
nvm use
```

## 3. Install Dependencies

If you haven't already, install the project dependencies:

```bash
pnpm install
```

## 4. Start the Development Servers

This command will start both the CMS and the web frontend concurrently from the root of the project.

```bash
pnpm dev
```

Once running, you can access:
- **Web Frontend**: `http://localhost:3008`
- **CMS Admin Panel**: `http://localhost:3007/admin`
