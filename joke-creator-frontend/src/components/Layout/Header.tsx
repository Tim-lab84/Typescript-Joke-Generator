import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Joke Creator
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-blue-200">
                Home
              </Link>
            </li>
            <li>
              <Link to="/prompts" className="hover:text-blue-200">
                Prompts
              </Link>
            </li>
            <li>
              <Link to="/jokes" className="hover:text-blue-200">
                Jokes
              </Link>
            </li>
            <li>
              <Link to="/favorites" className="hover:text-blue-200">
                Favorites
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
