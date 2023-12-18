import express, { Response } from "express";
import db from "../db/conn.js";

interface ParsedQs {
  [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[];
}
export interface Hero {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly element: Element;
}

export type Element = "fire" | "water" | "wind" | "earth" | ""; // TODO: think about npm package for these types
const ELEMENTS = ["fire", "water", "wind", "earth", ""] as const;
type ElementKey = (typeof ELEMENTS)[number];

export const isElementKey = (string: string): string is ElementKey => {
  return ELEMENTS.includes(string as ElementKey);
};

const validateHero = (hero: ParsedQs, res: Response): Hero => {
  const { name, description, element, id } = hero;

  if (
    typeof name !== "string" ||
    typeof description !== "string" ||
    typeof element !== "string" ||
    typeof id !== "string" ||
    isElementKey(element)
  ) {
    res.send("Error, bad request!").status(400);

    return;
  }
};

const router = express.Router();

router.get("/", async (req, res) => {
  const collection = await db.collection("heroes");
  const results = await collection.find({}).toArray();
  res.status(200).send(results);
});

router.post("/create", async (req, res) => {
  const { name, description, element, id } = req.query;

  const heroQuery = { name, description, element, id };

  const newHero = validateHero(heroQuery, res);

  const collection = await db.collection("heroes");

  const result = await collection.insertOne(newHero);

  res.send(result).status(200);
});

router.delete("/delete/:id", async (req, res) => {
  const query = { id: Number(req.params.id) };

  const collection = await db.collection("heroes");
  const result = await collection.deleteOne(query);
  res.send(result).status(200);
});

router.delete("/delete-all", async (req, res) => {
  const collection = await db.collection("heroes");
  const result = await collection.deleteMany({});
  res.send(result).status(200);
});

export default router;
