import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { JokeCreateInput } from "../types";
import { generateJoke } from "../services/openaiService";

const prisma = new PrismaClient();

// Get all jokes
export const getJokes = async (req: Request, res: Response) => {
  try {
    const jokes = await prisma.joke.findMany({
      include: {
        prompt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(jokes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jokes" });
  }
};

// Get joke by ID
export const getJokeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const joke = await prisma.joke.findUnique({
      where: { id: Number(id) },
      include: { prompt: true },
    });

    if (!joke) {
      return res.status(404).json({ error: "Joke not found" });
    }

    res.json(joke);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch joke" });
  }
};

// Generate joke from prompt
export const generateJokeFromPrompt = async (req: Request, res: Response) => {
  try {
    const { promptId } = req.params;

    const prompt = await prisma.prompt.findUnique({
      where: { id: Number(promptId) },
    });

    if (!prompt) {
      return res.status(404).json({ error: "Prompt not found" });
    }

    const jokeContent = await generateJoke(prompt.content);

    const joke = await prisma.joke.create({
      data: {
        content: jokeContent,
        promptId: Number(promptId),
        isFavorite: false,
      },
      include: {
        prompt: true,
      },
    });

    res.status(201).json(joke);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate joke" });
  }
};

// Update joke (for rating/favorite)
export const updateJoke = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rating, isFavorite } = req.body;

    const joke = await prisma.joke.update({
      where: { id: Number(id) },
      data: {
        rating,
        isFavorite,
      },
    });

    res.json(joke);
  } catch (error) {
    res.status(500).json({ error: "Failed to update joke" });
  }
};

// Delete joke
export const deleteJoke = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.joke.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Joke deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete joke" });
  }
};

// Get favorite jokes
export const getFavoriteJokes = async (req: Request, res: Response) => {
  try {
    const jokes = await prisma.joke.findMany({
      where: {
        isFavorite: true,
      },
      include: {
        prompt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(jokes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch favorite jokes" });
  }
};
