const path = require("path");
const Database = require("better-sqlite3");

// Create a new database connection
const dbPath = path.join(__dirname, "data", "app.db");
// Ensure the "data" directory exists
const db = new Database(dbPath);

// Set the journal mode to WAL (Write-Ahead Logging) for better concurrency
db.pragma("journal_mode = WAL");

// Check if the "exercises" table exists, and create it if it doesn't
const columns = db.prepare("PRAGMA table_info(exercises)").all();
const hasWeightColumn = columns.some((column) => column.name === "weight");

if (!columns.length) {
    db.exec(`
        CREATE TABLE exercises (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            exercise TEXT NOT NULL,
            sets INTEGER NOT NULL,
            reps INTEGER NOT NULL,
            weight REAL NOT NULL DEFAULT 0
        );
    `);
} else if (!hasWeightColumn) {
    db.exec("ALTER TABLE exercises ADD COLUMN weight REAL NOT NULL DEFAULT 0;");
}

// Function to insert an exercise into the database
function saveExercise(exercise, sets, reps, weight) {
    const exerciseStatement = db.prepare(`
        INSERT INTO exercises (exercise, sets, reps, weight)
        VALUES (?, ?, ?, ?)
        `);

    const result = exerciseStatement.run(exercise, sets, reps, weight);

    return {
        id: result.lastInsertRowid,
        exercise,
        sets,
        reps,
        weight
    };
}

// Function to retrieve recent exercises from the database
function getRecentExercises(limit = 10) {
    return db.prepare(`
        SELECT id, exercise, sets, reps, weight
        FROM exercises
        ORDER BY id DESC
        LIMIT ?
        `).all(limit);
}

module.exports = {
    db,
    saveExercise,
    getRecentExercises
}