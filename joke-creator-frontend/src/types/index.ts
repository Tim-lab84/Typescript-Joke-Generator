export interface Prompt {
  id: number;
  content: string;
  category: string;
  createdAt: string;
}

export interface Joke {
  id: number;
  content: string;
  promptId: number;
  prompt: Prompt;
  rating?: number;
  isFavorite: boolean;
  createdAt: string;
}

export interface PromptFormData {
  content: string;
  category: string;
}
