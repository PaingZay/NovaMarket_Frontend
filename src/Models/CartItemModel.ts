import CartModel from "./CartModel";
import ProductModel from "./ProductModel";

class CartItemModel {
    id: number;
    cart:{
        id:number;
        customer:{ 
            id: number;
            address?: string;
            city?: string;
            dateOfBirth?: Date;
            email?: string;
            firstName?: string;
            lastName?: string;
            password?: string;
            phoneNumber?: string;
            state?: string;
            zipCode?: string;
    };
    createdDate?: string;
    status?: string
    };
    product: {
        id: number;
        productName: string;
        description: string;
        categoryId: number;
        price: number;
        sku: number;
        discountPrice: number;
        manufacturer: string;
        imageUrl: string;
        weight: number;
        dimension: string;
    };
    quantity: number;
    pricePerUnit:number;
    totalPrice: number;


    constructor (id: number, cart: CartModel, product: ProductModel, quantity: number, pricePerUnit: number, totalPrice: number) {
            this.id = id;
            this.cart = cart;
            this.product = product;
            this.quantity = quantity;
            this.pricePerUnit = pricePerUnit;
            this.totalPrice = totalPrice;
    }
}

export default CartItemModel;