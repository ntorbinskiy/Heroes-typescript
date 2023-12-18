import express from "express";
import cors from "cors";
import "./loadEnvironment.js";
import router from "./routes/heroes.js";
import bodyParser from "body-parser";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Load the /heroes routes
app.use("/heroes", router);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.");
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
