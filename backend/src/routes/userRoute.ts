import express from "express";
import { getMyOrders, login, register } from "../services/userService";
import { ExtendRequest } from "../types/ExtendedRequest";
import validateJWT from "../middlewares/validateJWT";

const router = express.Router()



router.post('/register', async (request, response) => {
    const {firstName, lastName, email, password} = request.body;
    const {statusCode, data} = await register({firstName, lastName, email, password})

    response.status(statusCode).json(data)
});


router.post('/login', async (request, response) => {
    const {email, password} = request.body;
    const {statusCode, data} = await login({email, password})

    response.status(statusCode).json(data)
});

router.get('/my-orders', validateJWT, async (request: ExtendRequest, response) => {
    const userId = request.user._id;
    const {statusCode, data} = await getMyOrders({userId})
    response.status(statusCode).send(data)
});


export default router