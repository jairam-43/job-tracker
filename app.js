require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log("Failed:", err.message));

const jobSchema = new mongoose.Schema({
  company: String,
  role: String,
  status: String,
  deadline: Date,
  notes: String
});

const Job = mongoose.model("Job", jobSchema);

app.post("/jobs", async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.status(201).json(job);
});

app.get("/jobs", async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

app.get("/jobs/:id", async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: "Job not found" });
  res.json(job);
});

app.put("/jobs/:id", async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!job) return res.status(404).json({ message: "Job not found" });
  res.json(job);
});

app.delete("/jobs/:id", async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: "Job deleted" });
});

app.get("/jobs/stats/summary", async (req, res) => {
  const stats = await Job.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } }
  ]);
  res.json(stats);
});

app.listen(3000, () => console.log("Server running on port 3000"));