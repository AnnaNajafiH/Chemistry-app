import { Outlet } from "react-router-dom";
import Header from "./Header";
import "./Layout.css"


function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16 px-7">
        <Outlet />
      </main>
      <footer className="flex justify-center text-center p-4 bg-blue-100 border-t mt-8">
        <div className="container">
          <div className="mb-0 text-warning">
            <span>&copy; {new Date().getFullYear()}</span> ChemIon. All rights
            reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout