import productModel from "../models/productModel";

export const getAllProducts = async () => {
    return await productModel.find();
}

//only for testing purposes

export const seedInitialProdcuts = async () => {
    const products = [
        { title: "Wireless Mouse", image: "1.jpeg", price: 29.99, stock: 50 },
        { title: "Mechanical Keyboard", image: "2.jpeg", price: 89.99, stock: 20 },
        { title: "USB-C Charger", image: "3.jpeg", price: 19.99, stock: 75 },
        // { title: "Noise Cancelling Headphones", image: "4.jpeg", price: 149.99, stock: 15 },
        // { title: "Smart Watch", image: "5.jpeg", price: 199.99, stock: 10 },
        // { title: "4K Monitor", image: "6.jpeg", price: 329.99, stock: 8 },
        // { title: "Gaming Chair", image: "7.jpeg", price: 249.99, stock: 5 },
        // { title: "External SSD 1TB", image: "8.jpeg", price: 129.99, stock: 30 },
        // { title: "Bluetooth Speaker", image: "9.jpeg", price: 39.99, stock: 60 },
        // { title: "Webcam 1080p", image: "10.jpeg", price: 49.99, stock: 40 },
    ];

    const DB_products = await getAllProducts();

    if(DB_products.length < products.length) {
        for(var i = DB_products.length; i < products.length; i++) {
            await productModel.insertMany(products[i])
        }
        
    }

}