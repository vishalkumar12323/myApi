require("dotenv").config();
const connectDB = require("./db/DataBaseConnection");
const productSchema = require("./models/productsSchema");
const productItems = require("./productItems.json");

const sendData = async () => {
  try {
    await connectDB(process.env.MONGO_DB_URL);
    await productSchema.deleteMany();
    await productSchema.create(productItems);
    console.log("Data Stored Successfully");
  } catch (error) {
    console.log(error);
  }
};

sendData();
