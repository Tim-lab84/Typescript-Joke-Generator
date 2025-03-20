import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Joke Creator
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Create your own joke prompts and let AI generate hilarious jokes for
          you!
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/prompts"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            Create Prompts
          </Link>
          <Link
            to="/jokes"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            View Jokes
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <ol className="list-decimal pl-6 space-y-3">
          <li>
            Create a joke prompt (e.g., "Tell me a dad joke about programming")
          </li>
          <li>Our AI will generate a custom joke based on your prompt</li>
          <li>Rate the jokes and save your favorites</li>
          <li>Share the best ones with your friends!</li>
        </ol>
      </div>
    </div>
  );
};

export default Home;
