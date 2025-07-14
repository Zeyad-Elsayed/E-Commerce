import mongoose, {Schema, Document, ObjectId, mongo} from "mongoose"

export interface IorderItem {
    prodcutName: string;
    image: string;
    unitPrice: number;
    quantity: number;
}

export interface IOrder extends Document {
    orderItems: IorderItem[];
    total: number;
    address: string;
    userId: ObjectId | string;
}

const orderItemSchema = new Schema<IorderItem>({
    prodcutName: {type: String, required: true},
    image: { type: String, required: true},
    unitPrice: { type: Number, required: true},
    quantity: { type: Number, required: true},
})

const orderSchema = new Schema<IOrder>({
    orderItems: [orderItemSchema],
    total: { type: Number, required: true},
    address: { type: String, required: true},
    userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
})


export const orderModel = mongoose.model<IOrder>("Order", orderSchema)