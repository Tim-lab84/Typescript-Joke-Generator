import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { PromptCreateInput } from "../types";

const prisma = new PrismaClient();

// Get all prompts
export const getPrompts = async (req: Request, res: Response) => {
  try {
    const prompts = await prisma.prompt.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(prompts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch prompts" });
  }
};

// Get prompt by ID
export const getPromptById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const prompt = await prisma.prompt.findUnique({
      where: { id: Number(id) },
      include: { jokes: true },
    });

    if (!prompt) {
      return res.status(404).json({ error: "Prompt not found" });
    }

    res.json(prompt);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch prompt" });
  }
};

// Create new prompt
export const createPrompt = async (req: Request, res: Response) => {
  try {
    const { content, category }: PromptCreateInput = req.body;

    const prompt = await prisma.prompt.create({
      data: {
        content,
        category,
      },
    });

    res.status(201).json(prompt);
  } catch (error) {
    res.status(500).json({ error: "Failed to create prompt" });
  }
};

// Update prompt
export const updatePrompt = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { content, category }: PromptCreateInput = req.body;

    const prompt = await prisma.prompt.update({
      where: { id: Number(id) },
      data: {
        content,
        category,
      },
    });

    res.json(prompt);
  } catch (error) {
    res.status(500).json({ error: "Failed to update prompt" });
  }
};

// Delete prompt
export const deletePrompt = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.prompt.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Prompt deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete prompt" });
  }
};
