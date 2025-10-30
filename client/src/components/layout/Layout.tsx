import { Outlet } from "react-router-dom";
import Header from "./Header";
import "./Layout.css";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow welcome-page-container flex flex-col">
        <main className="flex-grow py-1 md:py-2 lg:py-3">
          <Outlet />
        </main>
        <div className="flex justify-center mt-auto mb-4 md:mb-6 lg:mb-9 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Layout;
