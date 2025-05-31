// src/components/Header.tsx
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-dotted border-x-0 border-y-2">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div>
          <div className="w-8 h-8 border-l-indigo-950 from-primary-900 to-accent-600 rounded-lg flex items-center justify-center">
          <h1 className=" shadow-accent-500">
            FaceFeel AI 
          </h1>
          </div>
        </div>

        <nav>
          <ul className="flex space-x-6 list-inside mix-blend-plus-lighter shadow-md">
            <li>
              <Link
                to="/"
                className="relative group text-gray-400 hover:text-light transition-colors peer-active:text-sm"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="relative group text-gray-400 hover:text-light transition-colors peer-active:text-sm"
              >
                Tiempo Real
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                to="/history"
                className="relative group text-gray-400 hover:text-light transition-colors"
              >
                Historial
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="relative group text-gray-400 hover:text-light transition-colors"
              >
                Image Capture
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full"></span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
