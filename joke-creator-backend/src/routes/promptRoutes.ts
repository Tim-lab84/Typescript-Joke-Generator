import { Router, Request, Response } from "express";
import {
  getPrompts,
  getPromptById,
  createPrompt,
  updatePrompt,
  deletePrompt,
} from "../controllers/promptController";

const router = Router();

router.get("/", getPrompts as (req: Request, res: Response) => void);
router.get("/:id", getPromptById as (req: Request, res: Response) => void);
router.post("/", createPrompt as (req: Request, res: Response) => void);
router.put("/:id", updatePrompt as (req: Request, res: Response) => void);
router.delete("/:id", deletePrompt as (req: Request, res: Response) => void);

export default router;
