import {Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import userModel from "../models/userModel";

interface ExtendRequest extends Request {
    user?: any;
}

const validateJWT = (req : ExtendRequest, res: Response, next: NextFunction) => {
    const authorizationHeader = req.get('authorization')

    if(!authorizationHeader) {
        return res.status(403).send("Authorization header is not provided");
    }


    const token = authorizationHeader.split(" ")[1]

    if(!token) {
        return res.status(403).send("Bearer token not found")
    }


    jwt.verify(token, 'ED2757BDB36381CC713D29245DE3C', async (err, payload) => {
        if(err) {
            return res.status(403).send("Invalid token")
        }

        if(!payload) {
            return res.status(403).send("Invalid token payload")
        }

        const userPayload = payload as {
            email: string;
            firstName: string;
            lastName: string; 
        };

        // Fetch User from database based on payload
        const user = await userModel.findOne({email: userPayload.email});
        req.user = user;
        next();
    })

}

export default validateJWT;