const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { json } = require("body-parser");
require("dotenv").config();

const userRoute = require("./Route/userRoute");
const dbConnect = require("./db/database")
dbConnect()

const app = express();
app.use(cookieParser());
app.use(json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.disable("x-powered-by");

const PORT = process.env.PORT || 1997;

app.use("/", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
