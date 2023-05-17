import CartModel from "./CartModel";
import ProductModel from "./ProductModel";

class CartItemModel {
    cartItemId: number;
    cart:{
        cartId:number;
        customer:{ 
            customerId: number;
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
        productId: number;
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


    constructor (cartItemId: number, cart: CartModel, product: ProductModel, quantity: number, pricePerUnit: number, totalPrice: number) {
            this.cartItemId = cartItemId;
            this.cart = cart;
            this.product = product;
            this.quantity = quantity;
            this.pricePerUnit = pricePerUnit;
            this.totalPrice = totalPrice;
    }
}

export default CartItemModel;