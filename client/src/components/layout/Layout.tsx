import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import "./Layout.css";

export const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="container flex-grow-1 py-4">
        <Outlet />
      </main>
      <footer className="bg-light text-center py-3">
        <div className="container">
          <p className="mb-0">© 2025 Chemistry App</p>
        </div>
      </footer>
    </div>
  );
};
