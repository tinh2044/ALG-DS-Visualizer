import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const categories = [
    {
      title: "Sorting Algorithms",
      description: "Visualize and learn various sorting algorithms like Bubble Sort, Quick Sort, Merge Sort and more.",
      path: "/sorting",
      icon: "📊"
    },
    {
      title: "Path Finding Algorithms",
      description: "Explore algorithms like BFS, DFS, A* Search and Greedy Best-First Search to find paths in a grid.",
      path: "/pathfinding",
      icon: "🧭"
    },
    {
      title: "Data Structures",
      description: "Interactive visualizations of common data structures like Stack, Queue, Linked List, and Binary Trees.",
      path: "/datastructures",
      icon: "🏗️"
    },
    {
      title: "Maze Generation",
      description: "Watch as different algorithms generate perfect mazes using techniques like Prim's, Kruskal's, and Recursive Backtracking.",
      path: "/pathfinding",
      icon: "🧩"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
            Algorithm & Data Structure Visualizer
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Interactive visualizations to help you understand algorithms and data structures better.
            Explore, learn and visualize how different algorithms work step by step.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link 
                to={category.path}
                className="block h-full"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 h-full border border-gray-200 dark:border-gray-700">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">{category.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300">{category.description}</p>
                  
                  <div className="mt-6 text-indigo-600 dark:text-indigo-400 font-medium flex items-center">
                    Explore
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
