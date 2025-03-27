const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to Mongo hosted cloud, using DBAdmin and MTUPASS25 as the password
mongoose.connect('mongodb+srv://DBAdmin:MTUPASS25@jedcluster0.lvw9a.mongodb.net/?retryWrites=true&w=majority&appName=JEDCluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Schema/ Model used NOTE as a test, just adding Content as a string for now, in future it will be a list
const blogSchema = new mongoose.Schema({
    title: String,
    Category: String
    Content: String,
    createdAt: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Blog', blogSchema);

// Route to handle POST request from frontend
app.post('/submit-blog', async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required.' });
    }

    try {
        const newBlog = new Blog({ title, content });
        await newBlog.save();
        res.status(201).json({ message: 'Blog saved successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong.' });
    }
});

// Start the server
app.listen(3000, () => console.log('Server Running'));
