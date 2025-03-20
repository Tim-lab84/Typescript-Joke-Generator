import axios from "axios";
import { Joke, Prompt, PromptFormData } from "../types";

// Note: Use the port your backend is running on (3000 as shown in your logs)
const API_URL = import.meta.env.VITE_API_URL;

// Prompt API calls
export const getPrompts = async (): Promise<Prompt[]> => {
  const response = await axios.get(`${API_URL}/prompts`);
  return response.data;
};

export const getPromptById = async (id: number): Promise<Prompt> => {
  const response = await axios.get(`${API_URL}/prompts/${id}`);
  return response.data;
};

export const createPrompt = async (
  promptData: PromptFormData
): Promise<Prompt> => {
  const response = await axios.post(`${API_URL}/prompts`, promptData);
  return response.data;
};

export const deletePrompt = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/prompts/${id}`);
};

// Joke API calls
export const getJokes = async (): Promise<Joke[]> => {
  const response = await axios.get(`${API_URL}/jokes`);
  return response.data;
};

export const getFavoriteJokes = async (): Promise<Joke[]> => {
  const response = await axios.get(`${API_URL}/jokes/favorites`);
  return response.data;
};

export const generateJoke = async (promptId: number): Promise<Joke> => {
  const response = await axios.post(`${API_URL}/jokes/generate/${promptId}`);
  return response.data;
};

export const updateJoke = async (
  id: number,
  data: { rating?: number; isFavorite?: boolean }
): Promise<Joke> => {
  const response = await axios.put(`${API_URL}/jokes/${id}`, data);
  return response.data;
};

export const deleteJoke = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/jokes/${id}`);
};
