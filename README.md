# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

While this project uses React, Vite supports many popular JS frameworks. [See all the supported frameworks](https://vitejs.dev/guide/#scaffolding-your-first-vite-project).

## Deploy Your Own

Deploy your own Vite project with Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/examples/tree/main/framework-boilerplates/vite-react&template=vite-react)

_Live Example: https://vite-react-example.vercel.app_

### Deploying From Your Terminal

You can deploy your new Vite project with a single command from your terminal using [Vercel CLI](https://vercel.com/download):

```shell
$ vercel
```
# 👥 User Management Dashboard

A modern, responsive web application built with **React.js** to demonstrate core front-end development concepts, including component architecture, state management via Context, and API integration.

## 🚀 Key Features

* **User Listing:** Displays a list of users fetched from a public API.
* **Search/Filter:** Allows filtering users by name or email in real-time.
* **Routing:** Dedicated pages for Home, User Details, and Add New User.
* **User Details:** Shows comprehensive information for a selected user.
* **Add User:** A controlled form with validation to add new users locally.
* **Professional UI:** A responsive, bluish-dark theme built using Tailwind CSS utility classes.
* **Persistence (Bonus):** Newly added users are stored locally using **`localStorage`**.

---

## 🛠️ Setup and Installation

Follow these steps to get the project running on your local machine.

### Prerequisites

You need **Node.js** and **npm** (or yarn) installed on your system.

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd user-management-dashboard
2. Install Dependencies
Install the required packages, including React Router DOM and Tailwind CSS dependencies.

Bash

npm install
(Note: If you need to set up Tailwind CSS from scratch, run: npm install -D tailwindcss postcss autoprefixer and follow the configuration steps.)

3. Run the Application
Start the development server. The application will typically open in your browser at http://localhost:3000 (or another port if 3000 is occupied).

Bash

npm start
# OR (if using a modern setup like Vite)
npm run dev
🧠 Architectural Approach
This application follows a modern, maintainable React architecture, heavily utilizing functional components and hooks.

1. Component-Based Design
The UI is broken down into reusable components (e.g., UserCard, SearchBar, LoadingSpinner) and distinct Pages (HomePage, UserDetailsPage, AddUserPage) to ensure modularity and separation of concerns.

2. State Management (Context API)
We use React's built-in Context API (UserContext.js) to manage the global list of users. This simplifies state sharing for the following reasons:

Initial Fetch: Loads users and handles initial loading/error states.

Local Additions: Provides the addUser function to update the list locally, making the new user immediately visible on the dashboard.

Persistence: Integrates localStorage within the Context to ensure locally added users persist across browser sessions (Bonus).

3. Routing (React Router v6)
We use React Router DOM v6 for client-side navigation:

Path Parameters: The UserDetailsPage uses the dynamic route /user/:id and the useParams hook to fetch and display data for a specific user ID.

Programmatic Navigation: The useNavigate hook is used in AddUserPage to redirect the user back to the dashboard upon successful form submission.

4. API Integration
All data fetching is abstracted into a clean service layer (api/userApi.js) using the native Fetch API. This separates data access logic from the UI components, making the code easier to test and maintain.

5. UI/UX
The application is styled with Tailwind CSS, focusing on responsiveness (desktop and mobile views) and clear, professional aesthetics, including dedicated components for loading states and empty search results.
