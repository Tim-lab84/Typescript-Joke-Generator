import React from "react";
import { Joke } from "../../types";
import JokeCard from "./JokeCard";

interface JokeListProps {
  jokes: Joke[];
  onUpdate: () => void;
  onDelete: () => void;
}

const JokeList: React.FC<JokeListProps> = ({ jokes, onUpdate, onDelete }) => {
  if (jokes.length === 0) {
    return (
      <p className="text-gray-500 text-center py-4">
        No jokes yet. Generate some to see them here!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {jokes.map((joke) => (
        <JokeCard
          key={joke.id}
          joke={joke}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default JokeList;
