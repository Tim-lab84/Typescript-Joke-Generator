import { Router, Request, Response } from "express";
import {
  getJokes,
  getJokeById,
  generateJokeFromPrompt,
  updateJoke,
  deleteJoke,
  getFavoriteJokes,
} from "../controllers/jokeController";

const router = Router();

router.get("/", getJokes as (req: Request, res: Response) => void);
router.get(
  "/favorites",
  getFavoriteJokes as (req: Request, res: Response) => void
);
router.get("/:id", getJokeById as (req: Request, res: Response) => void);
router.post(
  "/generate/:promptId",
  generateJokeFromPrompt as (req: Request, res: Response) => void
);
router.put("/:id", updateJoke as (req: Request, res: Response) => void);
router.delete("/:id", deleteJoke as (req: Request, res: Response) => void);

export default router;
