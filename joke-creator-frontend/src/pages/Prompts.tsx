import React, { useState, useEffect } from "react";
import PromptForm from "../components/Prompt/PromptForm";
import PromptList from "../components/Prompt/PromptList";
import { getPrompts } from "../services/api";
import { Prompt, Joke } from "../types";
import { useNavigate } from "react-router-dom";

const Prompts: React.FC = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchPrompts = async () => {
    try {
      setLoading(true);
      const data = await getPrompts();
      setPrompts(data);
      setError("");
    } catch (err) {
      setError("Failed to fetch prompts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  const handleJokeGenerated = (joke: Joke) => {
    navigate("/jokes");
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Joke Prompts</h1>

      <div className="mb-8">
        <PromptForm />
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Your Prompts</h2>
        {loading ? (
          <p className="text-gray-500">Loading prompts...</p>
        ) : (
          <PromptList
            prompts={prompts}
            onDelete={fetchPrompts}
            onGenerate={handleJokeGenerated}
          />
        )}
      </div>
    </div>
  );
};

export default Prompts;
