import { Routes, Route } from "react-router-dom";
import Layout from "./shared/components/Layout.jsx";

import HomePage from "./pages/HomePage.jsx";
import RecipePage from "./pages/RecipePage.jsx";
import NewRecipePage from "./pages/NewRecipePage.jsx";
import EditRecipePage from "./pages/EditRecipePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="recipes/new" element={<NewRecipePage />} />
        <Route path="recipes/:id" element={<RecipePage />} />
        <Route path="recipes/:id/edit" element={<EditRecipePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
