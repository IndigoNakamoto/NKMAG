# **Project Plan: Next.js & Payload CMS Blog (Monorepo Story)**

This document walks through the story of setting up and building a modern, flexible blog using a monorepo structure. We'll start from an empty folder and end with a deployed application, creating git commits at key milestones.

### **Act 0: The Collaboration Protocol**

This project will be built using a pair programming model designed for maximum efficiency and collaboration between **Indigo (Human Navigator)** and **aline (Gemini 2.5 Pro LLM Driver)**.

#### **Core Identity: Next.js & Payload Pair Programming Team**

* **aline (LLM Driver)**: You are the **Full-Stack Implementation Driver**, an expert-level AI assistant specializing in Next.js, Payload CMS, and their integration. You will execute code changes, file operations, and detailed implementation work under the guidance of your navigator.  
* **Indigo (Human Navigator)**: You are the **Project Architect & Navigator**, providing strategic direction, architectural decisions, and oversight of the development process.

**Mission**: To collaboratively build a high-quality, feature-complete blog application by defining the backend content model in Payload CMS and constructing the frontend experience in Next.js, following effective pair programming practices.

#### **Collaboration Workflow**

1. **Before Major Changes**: aline must present an implementation plan to Indigo and receive approval before proceeding with significant architectural work (e.g., defining a new collection, building a complex page).  
2. **Decision Points**: When encountering ambiguous or complex scenarios, aline will pause and request navigator guidance.  
3. **Progress Updates**: aline will provide regular status updates and explanations of the changes being made.  
4. **Quality Assurance**: Both partners will review the final output before considering a task or feature complete.

#### **Standard Operating Procedures (SOPs)**

1. **Backend \- Defining Collections (in cms)**:  
   * **aline**: Propose a schema for a new Payload collection or block (e.g., the Posts collection), including fields and data types.  
   * **Indigo**: Review and approve/modify the schema.  
   * **aline**: Implement the approved collection/block files in the packages/cms directory.  
2. **Frontend \- Building Components & Pages (in web)**:  
   * **aline**: Analyze the requirements for a new page or component (e.g., BlockchainDataBlock). Propose a plan for its structure, data fetching, and state management.  
   * **Indigo**: Approve the plan, making key decisions on Server vs. Client component classification and data flow.  
   * **aline**: Create the necessary files in the packages/web directory, converting files to .tsx and implementing the approved logic.  
3. **Data Fetching & Integration**:  
   * **aline**: Identify the need for data fetching (from Payload or an external API like CoinGecko). Propose a fetching strategy (e.g., static generation for posts, dynamic fetching for crypto prices).  
   * **Indigo**: Approve the data fetching strategy.  
   * **aline**: Implement the approved fetching logic within Next.js Server Components.

#### **Communication Protocol**

* **Before Major Changes**: "I'm about to define the Postscollection. My plan is to includetitle, slug, author, and a blocks field for content. Do you approve, or should we add/change any fields?"  
* **During Implementation**: "Creating the BlockchainDataComponent now. I'll make it a Server Component to fetch data directly on the server."  
* **At Decision Points**: "For the post list on the homepage, we could fetch all posts and show them, or implement pagination. Pagination is better for performance but more complex. Which approach do you prefer?"

### **Act 0.5: The Blueprint \- Folder & File Structure**

Here is the high-level folder structure of our monorepo and the key files we'll be focusing on.

nkmag-blog/  
├── .git/               \# Our single, top-level Git directory  
├── packages/  
│   ├── cms/            \# The Payload CMS Application  
│   │   ├── src/  
│   │   │   ├── collections/  
│   │   │   │   ├── Users.ts  
│   │   │   │   └── Posts.ts  \<-- IMPORTANT: We will create this  
│   │   │   ├── components/  
│   │   │   │   └── Blocks/     \<-- IMPORTANT: We will create our content blocks here  
│   │   │   │       ├── RichTextBlock.ts  
│   │   │   │       ├── ImageBlock.ts  
│   │   │   │       └── BlockchainDataBlock.ts  
│   │   │   └── payload.config.ts \<-- IMPORTANT: Main CMS config file  
│   │   └── ...  
│   │  
│   └── web/            \# The Next.js Frontend Application  
│       ├── src/  
│       │   ├── app/  
│       │   │   ├── blog/  
│       │   │   │   └── \[slug\]/  
│       │   │   │       └── page.tsx \<-- IMPORTANT: Renders a single post  
│       │   │   ├── layout.tsx  
│       │   │   └── page.tsx    \<-- IMPORTANT: Our homepage, lists all posts  
│       │   └── components/  
│       │       ├── BlockRenderer.tsx \<-- IMPORTANT: Renders the different content blocks  
│       │       └── BlockchainDataComponent.tsx \<-- IMPORTANT: Fetches and displays crypto data  
│       ├── .env.local  \<-- IMPORTANT: Stores the API URL  
│       └── ...  
│  
├── .gitignore  
├── package.json        \# The ROOT package.json for the whole monorepo  
└── pnpm-workspace.yaml \# Defines the monorepo workspaces ('cms' and 'web')

### **Act I: The Setup \- Building the Foundation**

This is where we lay all the groundwork.

#### **Step 1.1: Prepare The Development Environment**

First, let's make sure our tools are ready.

1. **Set Node.js Version:** To avoid version conflicts, let's use nvm to switch to Node.js v20.  
   nvm install 20  
   nvm use 20

2. **Start the Database:** We'll use Docker to run a local MongoDB server. Make sure Docker Desktop is running, then run:  
   docker run \-d \-p 27017:27017 \--name my-mongo-db mongo

#### **Step 1.2: Initialize the Monorepo**

1. Create the root directory and initialize a git repository.  
   mkdir nkmag-blog  
   cd nkmag-blog  
   git init

2. Initialize a root package.json with pnpm and create the workspace configuration file.  
   pnpm init

3. Create a file named pnpm-workspace.yaml and add the following:  
   packages:  
     \- 'packages/\*'

4. Create the directory for our apps:  
   mkdir packages

#### **Git Checkpoint 1**

We've set up the basic monorepo structure. Let's commit our progress.

git add .  
git commit \-m "feat: initialize pnpm monorepo"

#### **Step 1.3: Scaffold the CMS and Web Apps**

Now, from within the packages directory:

1. **Scaffold the Payload CMS app:**  
   \# From inside the 'packages' directory  
   npx create-payload-app cms

   Follow the prompts: choose TypeScript, MongoDB, and the Blank template. For the connection string, use mongodb://127.0.0.1/cms.

#### **Git Checkpoint 2**

The CMS is in place. Time for a commit.

git add .  
git commit \-m "feat: scaffold payload cms application"

2. **Scaffold the Next.js frontend app:**  
   \# From inside the 'packages' directory  
   npx create-next-app@latest web \--typescript \--tailwind \--eslint

#### **Git Checkpoint 3**

Our project now contains both the frontend and backend. Let's save this state.

git add .  
git commit \-m "feat: scaffold next.js web application"

### **Act II: The Content Model**

Now, we'll teach our CMS what a "post" is. Work inside the packages/cms directory for this section.

#### **Step 2.1: Define Collections & Blocks**

This is the most crucial part of the backend setup, where we define the structure of our content. A **Collection** in Payload is a model for a specific type of content, like "Posts", "Authors", or "Tags". For our blog, the Posts collection is the star.

Inside the Posts collection, we'll use a powerful blocks field. This feature allows content creators to build articles from a palette of pre-defined components ("blocks"), giving them immense flexibility to create rich, varied layouts without needing a developer.

We will define the Posts collection with the following fields:

* **title**: A required text field for the article's headline.  
* **slug**: A text field that is required and unique. This will serve as the URL-friendly identifier for the post. We'll add a hook to automatically generate this from the title.  
* **author**: A relationship field pointing to the Users collection, linking each post to a specific author.  
* **status**: A select field with Draft and Published options, allowing for a proper content workflow.  
* **content**: The blocks field, which will hold an array of the content blocks listed below.

Next, we will define the individual blocks. Each block is its own schema and corresponds directly to a React component on the frontend:

* **RichTextBlock**: The workhorse for text. It will contain a single richText field, providing a full WYSIWYG editor for paragraphs, headings, lists, quotes, and links.  
* **ImageBlock**: For adding visual media. It will have an image field (a relationship to the Media collection) and an optional caption text field.  
* **CodeBlock**: For technical articles. It will have a language select field (JavaScript, Python, etc.) and a code textarea field for the snippet itself. The frontend will use this to apply syntax highlighting.  
* **BlockchainDataBlock**: Our custom integration. This block will have two select fields: one for the coin (Bitcoin, Litecoin, Dogecoin) and one for the displayStyle (Price Card, Simple Ticker). In the CMS, a user simply selects these options. On the frontend, this block will trigger a live API call to display the requested data.

Once defined, we will register the Posts collection and all these blocks in our payload.config.ts file to make them available in the admin UI.

#### **Git Checkpoint 4**

The heart of our CMS is now defined. A perfect time to commit.

git add .  
git commit \-m "feat(cms): define initial blog collections and content blocks"

### **Act III: The Frontend Build**

Let's switch over to the packages/web directory and build the visual part of our blog.

#### **Step 3.1: Connect to Payload and Build Pages**

1. Create a .env.local file in packages/web with PAYLOAD\_API\_URL=http://localhost:3000/api.  
2. Create the dynamic page routes: /app/page.tsx for the homepage and /app/blog/\[slug\]/page.tsx for individual posts.  
3. Build the master BlockRenderer component and the individual components for each content block you defined in the CMS.

#### **Git Checkpoint 5**

We can now render our CMS content on the frontend. Let's commit.

git add .  
git commit \-m "feat(web): build block renderer and post page structure"

#### **Step 3.2: Integrate Blockchain Data**

Implement the logic within your BlockchainDataComponent to fetch data from the CoinGecko API.

#### **Git Checkpoint 6**

The special crypto integration is complete. Save it.

git add .  
git commit \-m "feat(web): integrate live blockchain data component"

### **The Finale: Deployment**

1. **Create a Production Database:** Set up a free-tier database with MongoDB Atlas.  
2. **Push to GitHub:** Push your entire monorepo to a new GitHub repository.  
3. **Deploy on Vercel:** Connect your GitHub repo to Vercel. Configure the project to use the packages/web directory as the root and add your production environment variables (DATABASE\_URI, PAYLOAD\_SECRET, etc.).

With that, your fully custom blog will be live\!