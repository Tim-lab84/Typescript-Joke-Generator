import React, { useState, useEffect } from "react";
import JokeList from "../components/Joke/JokeList";
import { getFavoriteJokes } from "../services/api";
import { Joke } from "../types";

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Joke[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const data = await getFavoriteJokes();
      setFavorites(data);
      setError("");
    } catch (err) {
      setError("Failed to fetch favorite jokes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Favorite Jokes</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading ? (
        <p className="text-gray-500">Loading favorites...</p>
      ) : (
        <JokeList
          jokes={favorites}
          onUpdate={fetchFavorites}
          onDelete={fetchFavorites}
        />
      )}
    </div>
  );
};

export default Favorites;
