import OpenAI from "openai";
import express from "express";
import cors from "cors";

// chatgpt
const openai = new OpenAI({
  apiKey: "anything",
  baseURL: "http://localhost:3040/v1",
});

//Server
const app = express();

app.use(cors());

app.get("/query", async (req, res) => {
  const query = req.query.query;
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: query }],
    model: "gpt-3.5-turbo",
  });
  const message = chatCompletion.choices[0].message.content;
  res.send(message);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
