import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  const text = messages?.[0]?.content;
  console.log(messages)

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-8b-8192",
        messages: [{ role: "user", content: text }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Groq API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch from Groq API" });
  }
});

app.get('/', (req, res) => {
  res.send('Hello from Vercel!');
});


app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
