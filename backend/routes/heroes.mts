import { Hero } from "./../../frontend/src/components/heroesAddForm/HeroesAddForm.tsx";
import express, { Response } from "express";
import db from "../db/conn.mts";
import { ObjectId } from "mongodb";

interface ParsedQs {
  [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[];
}

const validateHero = (hero: ParsedQs, res: Response): Hero => {
  const { name, description, element, id } = hero;

  if (
    typeof name !== "string" ||
    typeof description !== "string" ||
    typeof element !== "string" ||
    typeof id !== "string"
  ) {
    res.send("Error, bad request!").status(400);

    return;
  }

  return { name, description, element, id: Number(id) };
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
