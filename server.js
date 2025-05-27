const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/placementTracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const progressSchema = new mongoose.Schema({
    subject: String,
    completedTopics: Number,
    totalTopics: Number,
});

const Progress = mongoose.model("Progress", progressSchema);

// Get all progress
app.get("/all-progress", async (req, res) => {
    const data = await Progress.find();
    res.json(data);
});

// Add progress
app.post("/add-progress", async (req, res) => {
    const newProgress = new Progress(req.body);
    await newProgress.save();
    res.json({ message: "Progress added" });
});

// Delete progress by ID
app.delete("/delete-progress/:id", async (req, res) => {
    await Progress.findByIdAndDelete(req.params.id);
    res.json({ message: "Progress deleted" });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
