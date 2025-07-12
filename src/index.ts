import mongoose from "mongoose"
import express from "express";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute"
import { seedInitialProdcuts } from "./services/productService";


const app = express()
const port = 3001


app.use(express.json())

mongoose.connect('mongodb://localhost:27017/ecommerce')
    .then(() => console.log('Mongo Connected!'))
    .catch(err => console.error('Connection error:', err));

//seed the products from DB
seedInitialProdcuts();


app.use('/user', userRoute)
app.use('/product', productRoute)

app.listen(port,() => {
    console.log("running on localhost on port " + port)
})