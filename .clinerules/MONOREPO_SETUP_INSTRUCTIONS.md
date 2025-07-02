# How to Create a Monorepo with Next.js and Payload CMS

This guide provides instructions on how to set up a monorepo containing a Next.js frontend and a Payload CMS backend, similar to this project.

## Prerequisites

- [Node.js](https://nodejs.org/) (v20 or later recommended)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/) (for running a local database)

## Step 1: Prepare The Development Environment

1.  **Set Node.js Version (Recommended)**
    To avoid version conflicts, it's good practice to use a specific Node.js version. If you have `nvm` installed, you can run:
    ```bash
    nvm install 20
    nvm use 20
    ```

2.  **Start the Database**
    We'll use Docker to run a local MongoDB server. Make sure Docker Desktop is running, then run the following command in your terminal:
    ```bash
    docker run -d -p 27017:27017 --name my-mongo-db mongo
    ```
    This will start a MongoDB container named `my-mongo-db` accessible on port `27017`.

## Step 2: Initialize the Monorepo

1.  **Create the root directory for your project:**
    ```bash
    mkdir my-monorepo-project
    cd my-monorepo-project
    ```

2.  **Initialize a root `package.json` with pnpm and create the workspace configuration file:**
    ```bash
    pnpm init
    ```

3.  **Create a file named `pnpm-workspace.yaml`** and add the following content to define the workspaces. This tells pnpm that our packages will live inside the `packages` directory.
    ```yaml
    packages:
      - 'packages/*'
    ```

4.  **Create the directory for our applications:**
    ```bash
    mkdir packages
    ```

## Step 3: Scaffold the CMS and Web Apps

Now, from within the `packages` directory, we will scaffold our two applications.

```bash
cd packages
```

1.  **Scaffold the Payload CMS app:**
    ```bash
    npx create-payload-app cms
    ```
    Follow the prompts during the setup:
    -   Choose **TypeScript**.
    -   Choose **MongoDB** as the database.
    -   Choose the **Blank** template.
    -   For the connection string, use `mongodb://127.0.0.1/cms`.

2.  **Scaffold the Next.js frontend app:**
    ```bash
    npx create-next-app@latest web --typescript --tailwind --eslint
    ```
    This will create a new Next.js application in the `web` directory with TypeScript, Tailwind CSS, and ESLint configured.

After these steps, you will have a monorepo structure with a `cms` and a `web` package inside the `packages` directory. You can now run `pnpm install` from the root of the project to install all dependencies for both applications.

## Step 4: Install Dependencies and Run the Project

1.  **Install all dependencies:**
    Navigate back to the root of your monorepo and run:
    ```bash
    pnpm install
    ```
    This command will install the dependencies for both the `web` and `cms` packages.

2.  **Run the development servers:**
    You can run both applications concurrently. From the root of the monorepo, you can use the following commands:

    To run the Next.js web app:
    ```bash
    pnpm --filter web dev
    ```

    To run the Payload CMS:
    ```bash
    pnpm --filter cms dev
    ```

## Step 5: Connecting Next.js to Payload CMS

To allow the Next.js frontend to communicate with the Payload CMS backend, you need to provide the API URL to the Next.js application.

1.  **Create an environment file for the web app:**
    In the `packages/web` directory, create a new file named `.env.local`.

2.  **Add the Payload API URL:**
    Add the following line to the `.env.local` file:
    ```
    PAYLOAD_API_URL=http://localhost:3007/api
    NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3007
    ```
    The `cms` application, by default, runs on port `3007`. This configuration tells your Next.js application where to send API requests.

## Conclusion

You have now successfully set up a monorepo with a Next.js frontend and a Payload CMS backend. Both applications can be developed and run independently, while being part of the same project structure.

From here, you can start building out your collections in Payload and creating pages and components in your Next.js application to fetch and display the data from the CMS.
