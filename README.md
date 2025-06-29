# Nakamotoist Content Platform

Welcome to the official repository for the Nakamotoist blog. This project is a modern, flexible content platform built on a monorepo architecture, featuring a Next.js frontend and a Payload CMS backend.

This platform is designed to replace our previous Ghost.com instance, providing greater control, a more dynamic authoring experience, and custom features tailored to our content.

## For Developers

This project is a pnpm-managed monorepo.

-   `packages/cms`: The Payload CMS application (backend).
-   `packages/web`: The Next.js frontend application.

### Getting Started

1.  **Set Node.js Version**:
    ```bash
    nvm use
    ```
2.  **Start Database**:
    ```bash
    docker run -d -p 27017:27017 --name my-mongo-db mongo
    ```
3.  **Install Dependencies**:
    ```bash
    pnpm install
    ```
4.  **Run Development Servers**:
    ```bash
    pnpm dev
    ```

    This will start both the CMS (on `http://localhost:3007`) and the web frontend (on `http://localhost:3008`).
