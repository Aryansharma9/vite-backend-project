const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // <-- This line enables CORS
app.use(express.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI;
mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define Mongoose Schemas and Models
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

const athleteSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    activityType: { type: String },
    metrics: { type: Object },
    lastUpdated: { type: Date, default: Date.now }
});
const Athlete = mongoose.model('Athlete', athleteSchema);

// API Routes
// Sign up a new user
app.post('/api/signup', async (req, res) => {
    const { name, password, userType } = req.body;
    try {
        const newUser = new User({ name, password, userType });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(400).json({ message: 'Error signing up', error });
    }
});

// Login a user
app.post('/api/login', async (req, res) => {
    const { name, password } = req.body;
    try {
        const user = await User.findOne({ name, password });
        if (user) {
            res.status(200).json({ userType: user.userType, userId: user._id });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Fetch all athletes
app.get('/api/athletes', async (req, res) => {
    try {
        const athletes = await Athlete.find();
        res.status(200).json(athletes);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Fetch a single athlete by userId
app.get('/api/athletes/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const athlete = await Athlete.findOne({ userId });
        if (athlete) {
            res.status(200).json(athlete);
        } else {
            res.status(404).json({ message: 'Athlete not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Update or create an athlete's metrics
app.post('/api/athletes', async (req, res) => {
    const { userId, name, activityType, metrics } = req.body;
    try {
        const updatedAthlete = await Athlete.findOneAndUpdate(
            { userId }, 
            { name, activityType, metrics, lastUpdated: new Date() },
            { new: true, upsert: true } // upsert creates a new document if one doesn't exist
        );
        res.status(200).json(updatedAthlete);
    } catch (error) {
        res.status(500).json({ message: 'Error updating athlete data', error });
    }
});

// Serve Vite frontend build in production
const path = require("path");

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
}


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
