import React, { useState, useEffect } from "react";
import JokeList from "../components/Joke/JokeList";
import { getJokes } from "../services/api";
import { Joke } from "../types";

const Jokes: React.FC = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchJokes = async () => {
    try {
      setLoading(true);
      const data = await getJokes();
      setJokes(data);
      setError("");
    } catch (err) {
      setError("Failed to fetch jokes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJokes();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Generated Jokes</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading ? (
        <p className="text-gray-500">Loading jokes...</p>
      ) : (
        <JokeList jokes={jokes} onUpdate={fetchJokes} onDelete={fetchJokes} />
      )}
    </div>
  );
};

export default Jokes;
