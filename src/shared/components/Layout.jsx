import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">BrewBook</div>

        <nav className="nav" aria-label="Primary navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/recipes/new"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Add Recipe
          </NavLink>
        </nav>
      </header>

      <main className="app-main">
        <p>Layout is rendering ✅</p>
        <Outlet />
      </main>
    </div>
  );
}
