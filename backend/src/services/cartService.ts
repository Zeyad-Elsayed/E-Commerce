import { cartModel } from "../models/cartModel";
import { IorderItem, orderModel } from "../models/orderModel";
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
    populateProduct?: boolean;
}


export const getActiveCartForUser = async ({ userId, populateProduct }: GetActiveCartForUser) => {
    let cart;

    if (populateProduct) {
        cart = await cartModel.findOne({ userId, status: "active" }).populate("items.product");
    }
    else {
        cart = await cartModel.findOne({ userId, status: "active" })
    }

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

    if (product.stock < parseInt(quantity)) {
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

    await cart.save();
    //await product.save();
    return {
        data: await getActiveCartForUser({ userId, populateProduct: true }),
        statusCode: 200
    };
}

interface UpdateItemInCart {
    productId: any;
    quantity: string;
    userId: string;
}

export const updateItemInCart = async ({ productId, quantity, userId }: UpdateItemInCart) => {
    const cart = await getActiveCartForUser({ userId })

    const existsInCart = (await cart).items.find((p) => p.product.toString() === productId)

    if (!existsInCart)
        return { data: "Item doesn't exist in cart!", statusCode: 400 }

    const product = await productModel.findById(productId);

    if (!product) {
        return { data: "Product not found!", statusCode: 400 }
    }

    if (product.stock < parseInt(quantity)) {
        return { data: "Low stock for item", statusCode: 400 }
    }


    cart.totalAmount -= existsInCart.quantity * existsInCart.unitPrice

    existsInCart.quantity = parseInt(quantity)

    cart.totalAmount += existsInCart.quantity * existsInCart.unitPrice;

    await cart.save();


    return {
        data: await getActiveCartForUser({ userId, populateProduct: true }),
        statusCode: 200
    };
}

interface DeleteItemFromCart {
    productId: any;
    userId: string;
}

export const deleteItemFromCart = async ({ userId, productId }: DeleteItemFromCart) => {
    const cart = await getActiveCartForUser({ userId })

    const existsInCart = (await cart).items.find((p) => p.product.toString() === productId)

    if (!existsInCart)
        return { data: "Item doesn't exist in cart!", statusCode: 400 }


    const otherCartItems = cart.items.filter((p => p.product.toString() != productId))
    let newTotal = cart.totalAmount - (existsInCart.quantity * existsInCart.unitPrice)

    cart.totalAmount = newTotal
    cart.items = otherCartItems

    await cart.save();

    return {
        data: await getActiveCartForUser({ userId, populateProduct: true }),
        statusCode: 200
    };
}

interface ClearCart {
    userId: string;
}

export const clearCart = async ({ userId }: ClearCart) => {
    const cart = await getActiveCartForUser({ userId })

    if (!cart) {
        return { data: "The cart is empty", statusCode: 200 }
    }

    cart.items = [];
    cart.totalAmount = 0

    const updatedCart = await cart.save();

    return { data: updatedCart, statusCode: 200 };
}

interface Checkout {
    userId: string;
    address: string;
}


export const checkout = async ({ userId, address }: Checkout) => {
    if (!address) {
        return { data: "Please add the address", statusCode: 400 }
    }

    const cart = await getActiveCartForUser({ userId });

    const orderItems: IorderItem[] = []

    for (const item of cart.items) {
        const product = await productModel.findById(item.product);

        if (!product) {
            return { data: "Product not found!", statusCode: 400 }
        }

        const orderItem: IorderItem = {
            prodcutName: product.title,
            image: product.image,
            quantity: item.quantity,
            unitPrice: item.unitPrice
        }

        orderItems.push(orderItem);
    }

    const order = await orderModel.create({
        orderItems: orderItems,
        total: cart.totalAmount,
        address: address,
        userId: userId
    })

    await order.save();

    //update the cart status to be complete
    cart.status = "completed"
    await cart.save;

    return { data: order, statusCode: 200 }
}
