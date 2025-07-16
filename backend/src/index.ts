import dotenv from "dotenv"
import mongoose from "mongoose"
import express from "express";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute"
import cartRoute from "./routes/cartRoute"
import { seedInitialProdcuts } from "./services/productService";
import cors from "cors";

dotenv.config()

const app = express()
const port = 3001


app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_CONNECTION || "")
    .then(() => console.log('Mongo Connected!'))
    .catch(err => console.error('Connection error:', err));

//seed the products from DB
seedInitialProdcuts();


app.use('/user', userRoute)
app.use('/product', productRoute)
app.use('/cart', cartRoute)

app.listen(port,() => {
    console.log("running on localhost on port " + port)
})