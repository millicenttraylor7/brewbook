BrewBook ☕

BrewBook is a React coffee recipe application that allows users to create, view, edit, delete, and search coffee recipes. Recipes are persisted using browser localStorage so changes remain after page refresh.

On first load, the app seeds built-in coffee recipes and appends coffee-based drinks imported from TheCocktailDB API. After that, the combined data is saved locally for fast reloads and full CRUD functionality.

This project was built using React + Vite and demonstrates routing, reusable components, custom hooks, controlled forms, API integration, and persistent state management.

✨ Features

View recipe cards

Search recipes by name or brewing method

Add new recipes

Edit existing recipes

Delete recipes

Persistent data using localStorage

Automatic import of coffee drinks from TheCocktailDB (first load only)

Responsive card layout

Shared reusable layout components

Conditional rendering and loading states

🌐 External API Integration

BrewBook integrates with:

TheCocktailDB API
https://www.thecocktaildb.com

On first load:

Starter coffee recipes are loaded.

Coffee-related drinks are fetched from TheCocktailDB.

Both datasets are merged.

The combined result is saved to localStorage.

If the API fails, the app gracefully falls back to starter recipes.

No API key is required.

🛠 Tech Stack

React (functional components only)

Vite

React Router DOM

JavaScript (ES6+)

CSS (no UI frameworks)

Google Fonts (Inter + Poppins)

Browser localStorage

📂 Project Structure
src/
features/
recipes/
favorites/
preferences/
shared/
components/
pages/
Architecture Highlights

Custom Hook: useRecipes manages recipe state, persistence, and CRUD logic.

API Layer: CocktailDB requests are isolated in a dedicated API module.

Shared Components: Card, PageHeader, and Layout promote reuse.

Feature-Based Organization: Keeps logic modular and scalable.

React Router: Handles navigation and wildcard routes.

🚀 Installation & Running the App

Clone the repository:

git clone https://github.com/YOUR-USERNAME/brewbook.git

Navigate into the project folder:

cd brewbook

Install dependencies:

npm install

Start the development server:

npm run dev

Open the app in your browser:

http://localhost:5173
💾 Data & Persistence

This application uses browser localStorage to persist recipe data.

Startup behavior:

If localStorage contains recipes, they are loaded.

If not, starter recipes are loaded and CocktailDB drinks are appended.

All create, update, and delete actions automatically update localStorage.

No backend server is required.

🌱 Environment Variables

This project does not require environment variables.

An .env.local.example file is included for rubric compliance.

🎯 Learning Objectives Demonstrated

Functional React components

Controlled form inputs with validation

Custom hooks (useRecipes)

useEffect (startup + persistence)

useCallback for stable handlers

Conditional rendering

Component composition using children

Reusable shared components

Feature-based project structure

Asynchronous external API communication

Persistent state management

📄 License

This project was created for educational purposes.
