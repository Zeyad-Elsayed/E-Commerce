import express from "express";
import { getAllProducts, getProduct } from "../services/productService";

const router = express.Router()

router.get('/', async (request, response) => {
    const products = await getAllProducts();
    response.status(200).send(products);
});

router.get('/:productId', async (request, response) => {
    try {
        const {productId} = request.params
        const req = await getProduct(productId)
        response.status(200).send(req);
    }
    catch {
        response.status(400).send("CannotFind the product")
    }
})

export default router;