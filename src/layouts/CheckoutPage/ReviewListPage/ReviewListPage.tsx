import { useEffect, useState } from "react";
import ReviewModel from "../../../Models/ReviewModel"
import CustomerModel from "../../../Models/CustomerModel";
import ProductModel from "../../../Models/ProductModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Review } from "../../Utils/Review";
import { Pagination } from "../../Utils/Pagination";

export const ReviewListPage = () => {
    const  [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [reviewPerPage] = useState(5);
    const [totalAmountOfReview, setTotalAmountOfReview] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const productId = (window.location.pathname).split('/')[2];

    useEffect(() => {
        const fetchProductReview = async () => {
            const reviewBaseUrl: string = `http://localhost:8081/api/product/${productId}/reviews`;

            //For paginition
            const reviewUrl: string = `${reviewBaseUrl}?pageSize=${reviewPerPage}&pageNumber=${currentPage-1}`;
            //

            const responseReview = await fetch(reviewUrl);

            if (!responseReview.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await responseReview.json();

            const responseData = responseJson.content;

            setTotalAmountOfReview(responseJson.totalElements)

            const loadedReviews: ReviewModel[] = [];
            
            for(const key in responseData) {
                const review: ReviewModel = new ReviewModel(
                    responseData[key].id,
                    responseData[key].reviewDate,
                    responseData[key].reviewRating,
                    responseData[key].reviewText,
                    new CustomerModel(
                            responseData[key].customer.id,
                            responseData[key].customer.address,
                            responseData[key].customer.city,
                            responseData[key].customer.dateOfBirth,
                            responseData[key].customer.email,
                            responseData[key].customer.firstName,
                            responseData[key].customer.lastName,
                            responseData[key].customer.password,
                            responseData[key].customer.phoneNumber,
                            responseData[key].customer.state,
                            responseData[key].customer.zipCode
                            ),
                    new ProductModel(
                            responseData[key].product.id,
                            responseData[key].product.productName,
                            responseData[key].product.description,
                            responseData[key].product.category.id,
                            responseData[key].product.price,
                            responseData[key].product.sku,
                            responseData[key].product.discountPrice,
                            responseData[key].product.manufacturer,
                            responseData[key].product.imageUrl,
                            responseData[key].product.weight,
                            responseData[key].product.dimension
                        )
                    );
                    
                    loadedReviews.push(review);
                    
                }

                setReviews(loadedReviews);
                setIsLoading(false);

            };

            fetchProductReview().catch((error: any) => {
                setIsLoading(false);
                setHttpError(error.message);
            })
    }, [currentPage]);

    if(isLoading) {
        return(
            <div className="container m-5">
                <SpinnerLoading/>
            </div>
        )
    }

    if(httpError) {
        return(
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    const indexOfLastReview: number = currentPage * reviewPerPage;
    const indexOfFirstReview: number = indexOfLastReview - reviewPerPage;

    let lastItem = reviewPerPage * currentPage <= totalAmountOfReview ? reviewPerPage * currentPage : totalAmountOfReview;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return(
        <div className='container m-5'>
            <div>
                <h3>Comments: ({reviews.length})</h3>
            </div>
            <p>
                {indexOfFirstReview + 1} to {lastItem} of {totalAmountOfReview} items:
            </p>
            <div className="row">
                {reviews.map(review => (
                    <Review review={review} key={review.id}/>
                ))}
            </div>

            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>}

        </div>
    );
    
}