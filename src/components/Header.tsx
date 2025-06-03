// src/components/Header.tsx
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="border-b-2 border-gray-400 bg-[#12181a] shadow-sm w-full">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-48 h-12 text-xl font-semibold rounded-lg flex items-center justify-center bg-gradient-to-r from-green-700 to-[#2bb361]">
              <h1 className="text-white">🎭 FaceFeel AI</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:!flex">
            <ul className="flex space-x-6">
              <li>
                <Link
                  to="/"
                  className="relative group text-gray-300 hover:text-[#38e07b] transition-colors duration-300"
                >
                  Inicio
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#38e07b] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  to="/realtime"
                  className="relative group text-gray-300 hover:text-[#38e07b] transition-colors duration-300"
                >
                  Tiempo Real
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#38e07b] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  to="/img-capture"
                  className="relative group text-gray-300 hover:text-[#38e07b] transition-colors duration-300"
                >
                  Captura de Imagen
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#38e07b] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  to="/history"
                  className="relative group text-gray-300 hover:text-[#38e07b] transition-colors duration-300"
                >
                  Historial
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#38e07b] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            </ul>
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <div className="w-6 flex flex-col space-y-1.5">
              <span
                className={`h-0.5 w-full bg-gray-600 transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`h-0.5 w-full bg-gray-600 transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`h-0.5 w-full bg-gray-600 transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden ${
            isMenuOpen ? "block" : "hidden"
          } mt-4 pb-4 transition-all duration-300`}
        >
          <ul className="flex flex-col space-y-3">
            <li>
              <Link
                to="/"
                className="block py-2 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 rounded transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/realtime"
                className="block py-2 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 rounded transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Tiempo Real
              </Link>
            </li>
            <li>
              <Link
                to="/img-capture"
                className="block py-2 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 rounded transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Captura de Imagen
              </Link>
            </li>
            <li>
              <Link
                to="/history"
                className="block py-2 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 rounded transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Historial
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
