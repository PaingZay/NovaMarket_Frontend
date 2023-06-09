import CustomerModel from "./CustomerModel";

class CartModel {

    id: number;
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

   constructor(id: number, customer: CustomerModel, createdDate:string, status:string){
    this.id = id;
    this.customer = customer;
    this.createdDate = createdDate;
    this.status = status;
}
}
export default CartModel;