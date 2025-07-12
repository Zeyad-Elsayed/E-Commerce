import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


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


const generateJWT = (data: any) => {
    return jwt.sign(data, 'ED2757BDB36381CC713D29245DE3C')
}