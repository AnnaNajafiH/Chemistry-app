import { Link, useLocation } from "react-router-dom";
import { BiAtom } from "react-icons/bi";
import { FaHome, FaCalculator ,FaHistory, FaUser } from "react-icons/fa";



const navigationLinks= [
  { name: <FaCalculator/> , path: "/formula" },
  { name: <FaHistory/>, path: "/history" },
  { name: <FaHome/> , path: "/" },
  { name: <FaUser/>, path: "/user" },
]

function Header() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 border-b">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 py-4 ">
        <Link className="flex items-center" to="/">
          <BiAtom className="h-8 w-8 text-blue-600 mr-2 animate-spin-slow" />
          <h1 className="md:text-2xl font-bold text-gary-900">ChemCalc...</h1>
        </Link>

        <div className="flex" id="">
          <ul className="flex space-x-3 md:space-x-6 lg:space-x-8">
            {navigationLinks.map((link, index) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={index}
                  to={link.path}
                  className={`text-gray-700 hover:text-blue-600 md:text-lg ${
                    isActive
                      ? "text-blue-700 font-semibold border-b-2 border-blue-700 pb-1"
                      : ""
                  }`}
                >
                  <li>{link.name}</li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
