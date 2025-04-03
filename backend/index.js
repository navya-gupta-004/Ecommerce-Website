const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes");

const app = express();
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("connnect to DB");
    console.log("Server is running ", process.env.PORT);
  });
});
