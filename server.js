require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// ✅ API Route: Submit Interest Form
app.post("/api/submit", async (req, res) => {
  const { name, mobile, email, model } = req.body;

  // Validation (basic)
  if (!name || !mobile || !model) {
    return res.status(400).json({ error: "Name, Mobile, and Model are required" });
  }

  try {
    const interest = await prisma.interest.create({
      data: { name, mobile, email, model },
    });

    res.status(201).json(interest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ API Route: Get All Submitted Interests
app.get("/api/interests", async (req, res) => {
  try {
    const interests = await prisma.interest.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json(interests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ API Route: Get a Single Interest by ID
app.get("/api/interests/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const interest = await prisma.interest.findUnique({
      where: { id },
    });

    if (!interest) {
      return res.status(404).json({ error: "Interest not found" });
    }

    res.json(interest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ API Route: Delete an Interest by ID
app.delete("/api/interests/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.interest.delete({ where: { id } });
    res.json({ message: "Interest deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
