# Project Startup Instructions

This document provides the necessary steps to get the development environment for the NKMAG blog up and running.

## 1. Start the Database

This project uses MongoDB as its database. Ensure Docker Desktop is running, then execute the following command to start the MongoDB container:

```bash
docker run -d -p 27017:27017 --name my-mongo-db mongo
```

## 2. Set Node.js Version

To ensure compatibility, switch to the correct Node.js version using `nvm`:

```bash
nvm use 20
```

## 3. Start the Development Servers

The monorepo contains two separate applications: the Payload CMS and the Next.js web frontend. You will need to run both concurrently in separate terminal windows.

### Start the CMS Server

In your first terminal, run the following command to start the Payload CMS, which will be available at `http://localhost:3007`:

```bash
pnpm --filter cms dev
```

### Start the Web Frontend Server

In a second terminal, run the following command to start the Next.js web application, which will be available at `http://localhost:3008`:

```bash
pnpm --filter web dev
```

Once both servers are running, you can access the CMS admin panel at `http://localhost:3007/admin` and the web frontend at `http://localhost:3008`.
