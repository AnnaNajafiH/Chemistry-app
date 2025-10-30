import { BiAtom } from "react-icons/bi";
import {Link} from "react-router-dom";
import "./HomePage.css";
import MoleculeViewer from "../../animations/moleculeAnimation/MoleculeViewer";

const HomePage: React.FC = () => {
  return (
    <div className="mx-auto px-4">
      <div className="flex flex-col justify-center min-h-[20vh] lg:min-h-[40vh]">
        <div className="flex justify-center items-center mt-5 pt-6">
          <BiAtom className="h-10 w-10 md:h-14 md:w-14 lg:h-16 lg:w-16 text-blue-600 mr-2 animate-spin-slow" />
          <span className="font-bold text-3xl md:text-5xl lg:text-7xl text-gray-700">
            ChemCalc
          </span>
          <span className="font-bold text-3xl md:text-5xl lg:text-7xl text-gray-700 smooth-bounce">
            .
          </span>
          <span className="font-bold text-3xl md:text-5xl lg:text-7xl text-gray-700 smooth-bounce bounce-delay-1">
            .
          </span>
          <span className="font-bold text-3xl md:text-5xl lg:text-7xl text-gray-700 smooth-bounce bounce-delay-2">
            .
          </span>
        </div>
        <p className="text-base md:text-xl lg:text-2xl text-gray-500 text-center mt-4 md:mt-8">
          Calculate, Visualize, and Explore Chemical Compounds
        </p>
        <div className="flex justify-center mt-6">
          <Link to="/formula" className="btn btn-brand">
            Let's Calculate
          </Link>
        </div>
      </div>
      <MoleculeViewer />
    </div>
  );
};

export default HomePage;
