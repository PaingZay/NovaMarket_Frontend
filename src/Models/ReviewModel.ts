import CustomerModel from "./CustomerModel";
import ProductModel from "./ProductModel";

class ReviewModel {
    id:number;
    reviewDate: string;
    reviewRating: number;
    reviewText: string;
    customer: {
        id: number;
        address: string;
        city: string;
        dateOfBirth: Date;
        email: string;
        firstName: string;
        lastName: string;
        password: string;
        phoneNumber: string;
        state: string;
        zipCode: string;
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
    
    constructor(id: number, reviewDate: string, reviewRating: number, reviewText: string, customer: CustomerModel, product: ProductModel){
        this.id = id;
        this.reviewDate = reviewDate;
        this.reviewRating = reviewRating;
        this.reviewText = reviewText;
        this.customer = customer;
        this.product = product;
    }
}

export default ReviewModel;