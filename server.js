const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { json } = require("body-parser");
require('dotenv').config();


const app = express();
app.use(cookieParser());
app.use(json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.disable('x-powered-by');

const PORT = process.env.PORT || 1997;

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
