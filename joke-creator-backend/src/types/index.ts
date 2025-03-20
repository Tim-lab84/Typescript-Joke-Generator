export interface Prompt {
  id: number;
  content: string;
  category: string;
  createdAt: Date;
}

export interface Joke {
  id: number;
  content: string;
  promptId: number;
  rating?: number;
  isFavorite: boolean;
  createdAt: Date;
}

export interface PromptCreateInput {
  content: string;
  category: string;
}

export interface JokeCreateInput {
  content: string;
  promptId: number;
  rating?: number;
  isFavorite?: boolean;
}
