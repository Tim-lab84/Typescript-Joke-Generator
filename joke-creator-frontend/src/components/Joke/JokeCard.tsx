import React, { useState } from "react";
import { Joke } from "../../types";
import { updateJoke, deleteJoke } from "../../services/api";

interface JokeCardProps {
  joke: Joke;
  onUpdate: () => void;
  onDelete: () => void;
}

const JokeCard: React.FC<JokeCardProps> = ({ joke, onUpdate, onDelete }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggleFavorite = async () => {
    try {
      setIsUpdating(true);
      await updateJoke(joke.id, { isFavorite: !joke.isFavorite });
      onUpdate();
    } catch (error) {
      console.error("Failed to update joke:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteJoke(joke.id);
      onDelete();
    } catch (error) {
      console.error("Failed to delete joke:", error);
    }
  };

  const handleRatingChange = async (rating: number) => {
    try {
      setIsUpdating(true);
      await updateJoke(joke.id, { rating });
      onUpdate();
    } catch (error) {
      console.error("Failed to update joke rating:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-3">
        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
          {joke.prompt.category}
        </span>
        <button
          onClick={handleToggleFavorite}
          disabled={isUpdating}
          className={`text-2xl focus:outline-none ${
            joke.isFavorite ? "text-yellow-500" : "text-gray-300"
          }`}
        >
          ★
        </button>
      </div>
      <p className="text-gray-600 italic mb-4">"{joke.prompt.content}"</p>
      <p className="text-lg font-medium mb-4">{joke.content}</p>
      <div className="flex justify-between items-center">
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRatingChange(star)}
              className={`focus:outline-none ${
                (joke.rating || 0) >= star ? "text-yellow-500" : "text-gray-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>
        <button
          onClick={handleDelete}
          className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default JokeCard;
