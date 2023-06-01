class ReviewRequestModel {
    reviewRating: number;
    productId: number;
    reviewText?: string;

    constructor(reviewRating: number, productId: number, reviewText: string) {
        this.reviewRating = reviewRating;
        this.productId = productId;
        this.reviewText = reviewText;
    }
}

export default ReviewRequestModel;