import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { orderModel } from "../models/orderModel";


interface registerParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string
}

interface loginParams {
    email: string;
    password: string
}

export const register = async ({firstName, lastName, email, password}: registerParams) => {
    email = email.toLowerCase();
    const findUser = await userModel.findOne({email})

    if(findUser) {
        return {data: "User already exists!", statusCode : 400}
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({firstName, lastName, email, password:hashPassword});
    await newUser.save();

    return {data: generateJWT({firstName, lastName, email}), statusCode: 200};
}

export const login = async ({email, password}: loginParams) => {
    email = email.toLowerCase();
    const findUser = await userModel.findOne({email})

    if(! findUser) {
        return {data : "User doesn't exist!", statusCode : 400}
    }

    const passowrdMatch = await bcrypt.compare(password, findUser.password)

    if(passowrdMatch) {
        return {data: generateJWT({firstName: findUser.firstName, lastName: findUser.lastName, email: email}), statusCode: 200};
    }
    else {
        return {data : "Incorrect email or password", statusCode : 400}
    }
}

interface GetMyOrdersParams {
    userId: string;
}
export const getMyOrders = async ({userId}: GetMyOrdersParams) => {
    try {
        return {data: await orderModel.find({userId}), statusCode: 200};
    }
    catch (err){
        throw err;
    }
}


const generateJWT = (data: any) => {
    return jwt.sign(data, process.env.JWT_SECRET || "")
}