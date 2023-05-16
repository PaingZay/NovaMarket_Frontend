import CustomerModel from "./CustomerModel";

class CartModel {

    cartId: number;
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

   constructor(cartId: number, customer: CustomerModel, createdDate:string, status:string){
    this.cartId = cartId;
    this.customer = customer;
    this.createdDate = createdDate;
    this.status = status;
}
}
export default CartModel;