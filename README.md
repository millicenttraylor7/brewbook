# BrewBook ☕

BrewBook is a React coffee recipe application that allows users to create, view, edit, delete, and search coffee recipes. Recipe data is persisted using browser localStorage so changes remain after page refresh.

This project was built using React + Vite and demonstrates routing, reusable components, custom hooks, controlled forms, and state persistence.

---

## ✨ Features

- View recipe cards
- Search recipes by name or method
- Add new recipes
- Edit existing recipes
- Delete recipes
- Persistent data using localStorage
- Responsive card layout
- Shared layout components
- Conditional rendering and loading states

---

## 🛠 Tech Stack

- React
- Vite
- React Router DOM
- JavaScript (ES6+)
- CSS
- Google Fonts (Inter + Poppins)

---

## 📂 Project Structure

src/
features/
recipes/
favorites/
preferences/
shared/
components/
pages/

### Key Architecture

- **Custom Hook:** `useRecipes` handles state, persistence, and CRUD operations.
- **Shared Components:** `Card`, `PageHeader`, and `Layout`.
- **Feature-based folder structure** for scalability.
- **React Router** handles navigation with protected page structure.

---

## 🚀 Installation & Running the App

1. Clone the repository:

```bash
git clone https://github.com/YOUR-USERNAME/brewbook.git
```

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

On startup, the app loads saved recipes from localStorage.

If none exist, seed data is loaded.

All create, update, and delete actions automatically update localStorage.

No backend or API key is required.

🌱 Environment Variables

This project does not require any environment variables.

An .env.local.example file is included for rubric compliance.

🌱 Environment Variables

This project does not require any environment variables.

An .env.local.example file is included for rubric compliance.

🎯 Learning Objectives Demonstrated

Functional React components

Controlled form inputs

Custom hooks (useRecipes)

useEffect and useCallback hooks

Conditional rendering

Component composition using children

Shared reusable layout components

Persistent state management

Feature-based project organization

📄 License

This project was created for educational purposes.
