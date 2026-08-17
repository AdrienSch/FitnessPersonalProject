const express = require('express');


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

// Question: What is the "GET" supposed to do?
app.get('/api/exercise', (req, res) => {
    // const { exercise, sets, reps, weight } = req.query;

});



// Defines the route for the root URL and starts the server
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