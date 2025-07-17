import productModel from "../models/productModel";

export const getAllProducts = async () => {
    return await productModel.find();
}

export const getProduct = async (productId: string) => {
    return await productModel.findById(productId);
}

//only for testing purposes

export const seedInitialProdcuts = async () => {
    try {
        const products = [
            { title: "Wireless Mouse", image: "https://m.media-amazon.com/images/I/71L5ev8-v2L._UF894,1000_QL80_.jpg", price: 30, stock: 50 },
            { title: "Mechanical Keyboard", image: "https://m.media-amazon.com/images/I/815NrpVg4IL.jpg", price: 90, stock: 20 },
            { title: "USB-C Charger", image: "https://i5.walmartimages.com/seo/Google-Original-USB-C-Charger-18W-PD-Wall-Charger-for-Google-Pixel-5-4-4a-4XL-3-3a-3XL-with-3FT-Type-C-Charging-Cable_6d1fa1c4-93c5-467e-a0b3-8cdd6ab0cbde.304adb51df6ef7860edc96164db1b1cd.jpeg", price: 20, stock: 75 },
            { title: "Noise Cancelling Headphones", image: "https://i5.walmartimages.com/seo/VILINICE-Noise-Cancelling-Headphones-Wireless-Bluetooth-Over-Ear-Headphones-with-Microphone-Black-Q8_b994b99c-835f-42fc-8094-9f6be0f9273b.be59955399cdbd1c25011d4a4251ba9b.jpeg", price: 150, stock: 15 },
            { title: "Smart Watch", image: "https://btech.com/media/catalog/product/cache/4709f4e5925590e2003d78a7a1e77edb/0/3/0374c791c1f6eb529e8a2b521a52e5c8f90e3e238b27cc03e3dbf1b5da02cbcd.jpeg", price: 200, stock: 10 },
            { title: "4K Monitor", image: "https://images.philips.com/is/image/philipsconsumer/52d332318b0b44e3a039b01100f11b77?$pnglarge$&wid=1250", price: 330, stock: 8 },
            { title: "Gaming Chair", image: "https://i5.walmartimages.com/seo/GTPLAYER-Gaming-Chair-with-Footrest-and-Ergonomic-Lumbar-Massage-Pillow-Faux-Leather-Office-Chair-White_86133479-a937-469b-bf4f-90a3f05e6b93.2550a814977ea264f357b78c66fc3c04.jpeg", price: 250, stock: 5 },
            { title: "External SSD 1TB", image: "https://smalldog.com/cdn/shop/products/AM.webp?v=1666381358", price: 130, stock: 30 },
            { title: "Bluetooth Speaker", image: "https://api.mobilaty.com/storage/uploads/JBL_GO_4_3_4_LEFT_BLACK_2-1727956821.jpg", price: 40, stock: 60 },
            { title: "Webcam 1080p", image: "https://m.media-amazon.com/images/I/61-K2lXmHQL._AC_UF894,1000_QL80_.jpg", price: 50, stock: 40 },
        ];

        const DB_products = await getAllProducts();

        if(DB_products.length < products.length) {
            for(var i = DB_products.length; i < products.length; i++) {
                await productModel.insertMany(products[i])
            }
        }
    } catch (err) {
        console.error("cannot seed database", err)
    }
    

}