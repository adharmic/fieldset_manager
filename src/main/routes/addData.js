import { Router } from "express";
import { addDataToMongoDB } from "../../db/mongodb.js";
import { addDataToElasticsearch } from "../../db/elasticsearch.js";

const router = Router();

router.post("/", async (req, res) => {
  const { name, description } = req.body;
  try {
    await addDataToMongoDB({ name, description });
    await addDataToElasticsearch({ name, description });
    res.json({ message: "Data added successfully" });
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).json({ error: "Failed to add data" });
  }
});

export default router;