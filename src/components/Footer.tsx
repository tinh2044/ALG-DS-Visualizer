import { Link } from "react-router-dom";
import { FaGithub, FaHeart } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-6 mt-auto border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-600 dark:text-gray-300">
          <div className="mb-4 md:mb-0">
            <p className="text-center md:text-left">
              © {currentYear} ALG&DS-Visualizer. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center">
            <span>Developed with</span>
            <FaHeart className="mx-1 text-red-500" />
            <span>by</span>
            <Link 
              to="https://github.com/tinh2044" 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-1 font-medium text-indigo-600 dark:text-indigo-400 flex items-center hover:underline"
            >
              Nguyễn Chí Tình
              <FaGithub className="ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 