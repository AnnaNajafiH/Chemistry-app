import { Link, useLocation } from "react-router-dom";
import { BiAtom } from "react-icons/bi";
import { FaHome, FaCalculator, FaHistory, FaUser } from "react-icons/fa";

const navigationLinks = [
  { name: <FaCalculator />, path: "/formula" },
  { name: <FaHistory />, path: "/history" },
  { name: <FaHome />, path: "/" },
  { name: <FaUser />, path: "/user" },
];

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 border-b bg-white z-50 shadow-sm">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4">
        <Link className="flex items-center" to="/">
          <BiAtom className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-blue-600 mr-2 animate-[spin_15s_linear_infinite]" />
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-700">
            ChemCalc
          </h1>

          <span className="md:text-2xl font-bold text-gray-600 smooth-bounce">
            .
          </span>
          <span className=" md:text-2xl font-bold text-gray-600 smooth-bounce bounce-delay-1">
            .
          </span>
          <span className="md:text-2xl font-bold text-gray-600 smooth-bounce bounce-delay-2">
            .
          </span>
        </Link>

        <div className="flex" id="">
          <ul className="flex space-x-3 md:space-x-6 lg:space-x-8">
            {navigationLinks.map((link, index) => {
              // Check if the current path starts with the link path to handle nested routes
              const isActive =
                location.pathname === link.path ||
                (link.path !== "/" && location.pathname.startsWith(link.path));
              return (
                <Link
                  key={index}
                  to={link.path}
                  className={`text-xs md:text-lg text-gray-700 hover:text-blue-600 transition-all duration-200 ${
                    isActive
                      ? "!text-blue-600 font-semibold border-b-2 border-blue-600 pb-1 scale-110"
                      : ""
                  }`}
                >
                  <li className={isActive ? "transform scale-110" : ""}>
                    {link.name}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
