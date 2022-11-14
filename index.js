const express = require("express");
const app = express();
const port = 3000;
const gameRouter = require("./routes/gameRoutes");

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
);

// Testing to make sure connection is made
app.get('/', (req, res) => {
    res.json({message: "ok"});
});

// Using GET function to display all games
app.use("/games", gameRouter);
// Error checking middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({message: err.message});
    return;
});

// Testing to make sure proper port is used
app.listen(port, () => {
    console.log(`Testing that app is listening on ${port}`);
});