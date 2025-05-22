// src/components/Header.tsx
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-dark border-b border-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2 text-light">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text">
            EmoDetect AI
          </h1>
          </div>
        </div>

        <nav>
          <ul className="flex space-x-6 list-none">
            <li>
              <Link
                to="/"
                className="relative group text-gray-400 hover:text-light transition-colors"
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
                Dashboard
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
