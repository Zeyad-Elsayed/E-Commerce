import { cartModel } from "../models/cartModel";
import productModel from "../models/productModel";


interface CreateCartForUser {
    userId: string;
}

const createCartForUser = async ({ userId }: CreateCartForUser) => {
    const cart = await cartModel.create({ userId, totalAmount: 0 })
    await cart.save();
    return cart;
}

interface GetActiveCartForUser {
    userId: string;
}


export const getActiveCartForUser = async ({ userId }: GetActiveCartForUser) => {
    let cart = await cartModel.findOne({ userId, status: "active" })

    if (!cart) {
        cart = await createCartForUser({ userId })
    }

    return cart;
}

interface AddItemToCart {
    productId: any;
    quantity: string;
    userId: string;
}

export const addItemToCart = async ({ productId, quantity, userId }: AddItemToCart) => {
    const cart = await getActiveCartForUser({ userId })
    //Check if the item exits in the cart
    const existsInCart = (await cart).items.find((p) => p.product.toString() === productId)

    if (existsInCart) {
        return { data: "Item already exists in cart!", statusCode: 400 }
    }

    const product = await productModel.findById(productId);

    if (!product) {
        return { data: "Product not found!", statusCode: 400 }
    }

    if(product.stock < parseInt(quantity)) {
        return { data: "Low stock for item", statusCode: 400 }
    }

    //product.stock -= parseInt(quantity) 

    cart.items.push({ 
        product: productId, 
        unitPrice: product.price, 
        quantity: parseInt(quantity) 
    })

    //Update the total amount for the cart
    cart.totalAmount += product.price * parseInt(quantity);

    const updatedCart = await cart.save();
    //await product.save();
    return {data: updatedCart, statusCode: 200};
}

interface UpdateItemInCart {
    productId: any;
    quantity: string;
    userId: string;
}

export const updateItemInCart = async ({ productId, quantity, userId }: UpdateItemInCart) => {
    const cart = await getActiveCartForUser({ userId })

    const existsInCart = (await cart).items.find((p) => p.product.toString() === productId)

    if(!existsInCart)
        return { data: "Item doesn't exist in cart!", statusCode: 400 }

    const product = await productModel.findById(productId);

    if (!product) {
        return { data: "Product not found!", statusCode: 400 }
    }

    if(product.stock < parseInt(quantity)) {
        return { data: "Low stock for item", statusCode: 400 }
    }

    
    const otherCartItems = cart.items.filter((p => p.product.toString() != productId))

    let total = otherCartItems.reduce((sum, product) => {
        sum += product.quantity * product.unitPrice;
        return sum;
    }, 0)

    existsInCart.quantity = parseInt(quantity)
    total += existsInCart.quantity * existsInCart.unitPrice;
    cart.totalAmount = total

    const updatedCart = await cart.save();


    return {data: updatedCart, statusCode: 200};
}