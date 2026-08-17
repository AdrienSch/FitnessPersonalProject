const express = require('express');
const { saveExercise, getRecentExercises } = require('./db');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

// API endpoint to retrieve recent exercises
app.get('/api/exercise', (req, res) => {
    // Retrieve recent exercises from the database
    const exercises = getRecentExercises(50).map((exercise) => ({
        // Calculate total weight lifted for each exercise
        ...exercise,
        totalWeight: Number(exercise.sets) * Number(exercise.reps) * Number(exercise.weight)
    }));

    res.json(exercises);
});

app.post('/api/exercise', (req, res) => {
    const exercise = String(req.body.exercise || '').trim();
    const sets = Number(req.body.sets);
    const reps = Number(req.body.reps);
    const weight = Number(req.body.weight);

    if (!exercise) {
        return res.status(400).json({ message: 'Exercise name is required.' });
    }

    if (!Number.isFinite(sets) || !Number.isFinite(reps) || !Number.isFinite(weight)) {
        return res.status(400).json({ message: 'Sets, reps, and weight must be valid numbers.' });
    }

    if (sets <= 0 || reps <= 0 || weight <= 0) {
        return res.status(400).json({ message: 'Sets, reps, and weight must be greater than zero.' });
    }

    const savedExercise = saveExercise(exercise, sets, reps, weight);

    res.status(201).json({
        ...savedExercise,
        totalWeight: sets * reps * weight
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

/* "POST" Example */
app.post("/api/example", (req, res) => {
    const name = String(req.body.name || "").trim();

    if (!name) {
        return res.status(400).json({
            message: "Name is required."
        });
    }

    res.json({
        message: `Hello, ${name}!`
    });
});