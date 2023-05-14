import CustomerModel from "./CustomerModel";
import ProductModel from "./ProductModel";

class ReviewModel {
    reviewId:number;
    reviewDate: string;
    reviewRating: number;
    reviewText: string;
    customer: {
        customerId: number;
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
    
    constructor(reviewId: number, reviewDate: string, reviewRating: number, reviewText: string, customer: CustomerModel, product: ProductModel){
        this.reviewId = reviewId;
        this.reviewDate = reviewDate;
        this.reviewRating = reviewRating;
        this.reviewText = reviewText;
        this.customer = customer;
        this.product = product;
    }
}

export default ReviewModel;