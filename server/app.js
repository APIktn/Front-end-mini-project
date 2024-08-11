import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import trips from "./db.js";

const app = express();
const port = process.env.PORT || 4000;

// Configure CORS options to allow requests only from your front-end URL
const corsOptions = {
  origin:
    "https://front-end-mini-project-b31jkp6f0-apiktns-projects.vercel.app", // Change this to your front-end URL
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions)); // Apply CORS with options
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/trips", (req, res) => {
  let keywords = req.query.keywords;

  if (keywords === undefined) {
    return res.status(400).json({
      message: "Please send keywords parameter in the URL endpoint",
    });
  }

  const regexKeywords = keywords.split(" ").join("|");
  const regex = new RegExp(regexKeywords, "ig");
  const results = trips.filter((trip) => {
    return (
      trip.title.match(regex) ||
      trip.description.match(regex) ||
      trip.tags.filter((tag) => tag.match(regex)).length
    );
  });

  return res.json({
    data: results,
  });
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
