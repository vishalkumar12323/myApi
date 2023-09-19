require("dotenv").config();
const express = require("express");
const router = require("./routes/router");
const connectDB = require("./db/DataBaseConnection");
const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hi, I am Live");
});

// setup middleware or routes
app.use("/api/products", router);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_DB_URL);
    app.listen(PORT, () => {
      console.log(`Yes I am Connected On Port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
