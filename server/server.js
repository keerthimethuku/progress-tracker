const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('YOUR_MONGO_URI_HERE')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Schema & Model
const progressSchema = new mongoose.Schema({
  date: String,
  dsaQuestions: Number,
  csTopic: String,
  projectTask: String,
  mockInterview: String,
  contestRank: String
});

const Progress = mongoose.model('Progress', progressSchema);

// Routes
app.post('/add-progress', async (req, res) => {
  const newProgress = new Progress(req.body);
  await newProgress.save();
  res.send('Progress added!');
});

app.get('/all-progress', async (req, res) => {
  const data = await Progress.find();
  res.json(data);
});

app.delete('/delete-progress/:id', async (req, res) => {
  await Progress.findByIdAndDelete(req.params.id);
  res.send('Progress deleted!');
});

// Server
app.listen(5000, () => console.log('Server running on port 5000'));
