import express from "express"
import { getActiveCartForUser } from "../services/cartService";
import validateJWT from "../middlewares/validateJWT";

const router = express.Router();

router.get('/', validateJWT, async (req : any, res) => {
    const userId = req.user._id;
    //getActiveCartForUser
    // TO DO: get userID from jwt, after validating from middleware
    const cart = await getActiveCartForUser({userId})
    res.status(200).send(cart)
})


export default router;