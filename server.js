const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const hotelDataAddedToDBRouter = require("./routes/dataimport.router.js");
const categoryDataAddedToDBRouter = require("./routes/categoryimport.router.js");

const hotelRouter = require("./routes/hotel.router.js");
const categoryRouter = require("./routes/category.router.js");
const singlehotelRouter = require("./routes/singlehotel.router.js");
const authRouter = require("./routes/auth.router.js");
const wishlistRouter = require("./routes/wishlist.router.js");

const connectDB = require("./config/dbconfig.js");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
connectDB();

app.get("/", (req, res) =>{
    res.send("Hello!! welcome to the backend server 🎉🎉")
})

app.use("/api/hoteldata", hotelDataAddedToDBRouter);
app.use("/api/categorydata", categoryDataAddedToDBRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/category", categoryRouter);
app.use("/api/hotels", singlehotelRouter);
app.use("/api/auth", authRouter);
app.use("/api/wishlist", wishlistRouter);

mongoose.connection.once("open", () => {
    console.log("Connected to DB");
    app.listen(process.env.PORT || PORT, () => {
    console.log("Server Started...");
    });
});