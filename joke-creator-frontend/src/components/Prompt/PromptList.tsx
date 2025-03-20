import React from "react";
import { Prompt } from "../../types";
import { generateJoke, deletePrompt } from "../../services/api";

interface PromptListProps {
  prompts: Prompt[];
  onDelete: () => void;
  onGenerate: (joke: any) => void;
}

const PromptList: React.FC<PromptListProps> = ({
  prompts,
  onDelete,
  onGenerate,
}) => {
  const handleGenerate = async (promptId: number) => {
    try {
      const joke = await generateJoke(promptId);
      onGenerate(joke);
    } catch (error) {
      console.error("Failed to generate joke:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePrompt(id);
      onDelete();
    } catch (error) {
      console.error("Failed to delete prompt:", error);
    }
  };

  if (prompts.length === 0) {
    return (
      <p className="text-gray-500 text-center py-4">
        No prompts yet. Create one to get started!
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {prompts.map((prompt) => (
        <div key={prompt.id} className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">{prompt.content}</p>
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-2">
                {prompt.category}
              </span>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleGenerate(prompt.id)}
                className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
              >
                Generate Joke
              </button>
              <button
                onClick={() => handleDelete(prompt.id)}
                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PromptList;
