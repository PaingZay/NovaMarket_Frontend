import { useEffect, useState } from "react";
import ProductModel from "../../Models/ProductModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarsReview } from "../Utils/StarsReview";
import ReviewModel from "../../Models/ReviewModel";
import CustomerModel from "../../Models/CustomerModel";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";
import { LatestReviews } from "./latestReviews";
import { useOktaAuth } from "@okta/okta-react";
import CartModel from "../../Models/CartModel";


export const CheckoutPage = () => {

    const { authState } = useOktaAuth();

    

    //Split the url and store the splitted parts in an array
    //Then take the third index because it is a path variable
    const productId = (window.location.pathname).split('/')[2];

    
    //CartState
    const [cart, setCart] = useState<CartModel>();
    const [isLoadingCart, setIsLoadingCart] = useState(true);
    

    //Product State
    const [product, setProduct] = useState<ProductModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    

    //Review State
    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReviews, setIsLoadingReviews] = useState(true);
    
    
    //Cart
    useEffect(() => {
        const fetchCart = async () => {
            if(authState && authState.isAuthenticated) {
                const url = `http://localhost:8081/api/cart/secure/1`;

                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                }
            };
            const cartResponse = await fetch(url, requestOptions);
            if(!cartResponse.ok){
                throw new Error('Something went wrong');
            }
            const cartResponseJson = await cartResponse.json();
            const loadedCart: CartModel = {
                cartId:cartResponseJson.id,
                customer: {
                    customerId: cartResponseJson.customer.id,
                    address: cartResponseJson.customer.address,
                    city: cartResponseJson.customer.city,
                    dateOfBirth: cartResponseJson.customer.dateOfBirth,
                    email: cartResponseJson.customer.email,
                    firstName: cartResponseJson.customer.firstName,
                    lastName: cartResponseJson.customer.lastName,
                    password: cartResponseJson.customer.password,
                    phoneNumber: cartResponseJson.customer.phoneNumber,
                    state:cartResponseJson.customer.state,
                    zipCode:cartResponseJson.customer.zipCode                    
                },
                createdDate:cartResponseJson.createdDate,
                status:cartResponseJson.status
            };

            setCart(loadedCart);
            setIsLoadingCart(false);
                // cartId: number;
                // customer:{ 
                //     customerId: number;
                //     address?: string;
                //     city?: string;
                //     dateOfBirth?: Date;
                //     email?: string;
                //     firstName?: string;
                //     lastName?: string;
                //     password?: string;
                //     phoneNumber?: string;
                //     state?: string;
                //     zipCode?: string;
                // };
                // createdDate?: string;
                // status?: string
        }
    }
    fetchCart().catch((error:any) => {
        setIsLoadingCart(false);
        setHttpError(error.message);
    })
},[authState]);

    //Product
    useEffect(() => {
        const fetchProduct = async () => {

            //To be able to concatenate in typescript, need to remove double brackets "". Instead use back tick ``
            //Bektic will allow as to be able to dynamically pass variables.
            const url: string = `http://localhost:8081/api/product/${productId}`;

            //No pagnition is required for a sigle object

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            /*No embedded is needed because when we pass Id, the product object is returned
            there is no global object that we have to loop through*/
            //const responseData = responseJson.content;


            /*We have this console loaded books of book model, which we're saying is an array.
            We don't want this to be an array anymore.
            We just want this to be an object.*/
            //const loadedProducts: ProductModel[] = [];

            const loadedProduct: ProductModel = {
                productId: responseJson.id,
                productName: responseJson.productName,
                description: responseJson.description,
                categoryId: responseJson.categoryId,
                price: responseJson.price,
                sku: responseJson.sku,
                discountPrice:responseJson.discountPrice,
                manufacturer:responseJson.manufacturer,
                imageUrl:responseJson.imageUrl,
                weight:responseJson.weight,
                dimension:responseJson.dimension
            };

            setProduct(loadedProduct);
            setIsLoading(false);
        };
        fetchProduct().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, []);

    //Review
    useEffect(() => {
        const fetchProductReview = async () => {
            const reviewBaseUrl: string = `http://localhost:8081/api/product/${productId}/reviews`;

            //For paginition
            const reviewUrl: string = `${reviewBaseUrl}?pageSize=2&pageNumber=0`;
            //

            const responseReview = await fetch(reviewUrl);

            if (!responseReview.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await responseReview.json();

            const responseData = responseJson.content;

            const loadedReviews: ReviewModel[] = [];

            let weightedStarReviews: number = 0;

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
                    
                    weightedStarReviews = weightedStarReviews + responseData[key].reviewRating;
                    
                }

                if (loadedReviews) {
                    const round = (Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2).toFixed(1);
                    setTotalStars(Number(round));
                }

                setReviews(loadedReviews);
                
                setIsLoadingReviews(false);

            };

            fetchProductReview().catch((error: any) => {
                setIsLoadingReviews(false);
                setHttpError(error.message);
            })
    }, []);

    

    // useEffect(() => {
    //     const fetchProductReviews = async () => {
    //         const baseUrl: string = `http://localhost:8081/api/product/${productId}/reviews`;
    
    //         const reviewUrl: string = `${baseUrl}?pageSize=3&pageNumber=0`;
    
    //         const responseReviews = await fetch(reviewUrl);
    
    //         if (!responseReviews.ok) {
    //             throw new Error('Something went wrong!');
    //         }
    
    //         const responseJsonReviews = await responseReviews.json();
    
    //         const responseData = responseJsonReviews.content;
    
    //         console.log(responseData[0]);
    //         console.log(responseData[1]);
    
    //         const loadedReviews: ReviewModel[] = [];
    
    //         let weightedStarReviews: number = 0;
    
    //         for (const key in responseData) {
    //             loadedReviews.push({
    //                 id: responseData[key].id,
    //                 reviewDate: responseData[key].reviewDate,
    //                 reviewRating: responseData[key].reviewRating,
    //                 reviewText: responseData[key].reviewText,
    //                 customer: {
    //                     id: responseData[key].customer.id,
    //                     address: responseData[key].customer.address,
    //                     city: responseData[key].customer.city,
    //                     dateOfBirth: responseData[key].customer.dateOfBirth,
    //                     email: responseData[key].customer.email,
    //                     firstName: responseData[key].customer.firstName,
    //                     lastName: responseData[key].customer.lastName,
    //                     password: responseData[key].customer.password,
    //                     phoneNumber: responseData[key].customer.phoneNumber,
    //                     state: responseData[key].customer.state,
    //                     zipCode: responseData[key].customer.zipCode
    //                 },
    //                 product: {
    //                     id: responseData[key].product.id,
    //                     productName: responseData[key].product.productName,
    //                     description: responseData[key].product.description,
    //                     categoryId: responseData[key].product.category.id,
    //                     price: responseData[key].product.price,
    //                     sku: responseData[key].product.sku,
    //                     discountPrice: responseData[key].product.discountPrice,
    //                     manufacturer: responseData[key].product.manufacturer,
    //                     imageUrl: responseData[key].product.imageUrl,
    //                     weight: responseData[key].product.weight,
    //                     dimension: responseData[key].product.dimension
    //                 }
    //             });
    //             weightedStarReviews = weightedStarReviews + responseData[key].reviewRating;
    //             console.log(loadedReviews[1].product);
    //         }
    
    //         if (loadedReviews.length > 0) {
    //             const round = (Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2).toFixed(1);
    //             setTotalStars(Number(round));
    //         }
    
    //         setReviews(loadedReviews);
    //         setIsLoadingReviews(false);
    //     };
    
    //     fetchProductReviews().catch((error: any) => {
    //         setIsLoadingReviews(false);
    //         setHttpError(error.message);
    //     })
    // }, []);

    if(isLoading || isLoadingReviews || isLoadingCart) {
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

    return(
        <div>
            <div className="container d-none d-lg-block">
                <div className = 'row mt-5'>
                    <div className="col-sm-2 col-md-2">
                    {product?.imageUrl ?
                        <img
                        src={product?.imageUrl} width='200' height='200' alt='Product'
                        />
                        :
                        <img src="https://www.kindpng.com/picc/m/421-4212275_transparent-default-avatar-png-avatar-img-png-download.png" width='200' height='200' alt="Product" />
                    }
                    </div>
                    <div className="col-4 col-md-4 container">
                        <div className="ml-2">
                            <h2>{product?.productName}</h2>
                            <h5 className="text-primary">{product?.sku}</h5>
                            <p className="lead">{product?.description}</p>
                            <StarsReview rating={totalStars} size={25}/>
                        </div>
                    </div>
                    <CheckoutAndReviewBox product={product} mobile={false} cartId={cart?.cartId}/>    
                </div>
                <hr />
                
                <LatestReviews reviews={reviews} productId={product?.productId} mobile={false} />
            </div>
            
            <div className="container d-lg-none mt-5">
                <div className="d-flex justify-content-center align-items-center">
                    {product?.imageUrl ?
                        <img
                        src={product?.imageUrl} width='200' height='200' alt='Product'
                        />
                        :
                        <img src="https://www.kindpng.com/picc/m/421-4212275_transparent-default-avatar-png-avatar-img-png-download.png" width='200' height='200' alt="Product" />
                    }
                </div>
                
                <div className="mt-4">
                    <div className="ml-2">
                        <h2>{product?.productName}</h2>
                        <h5 className="text-primary">{product?.manufacturer}</h5>
                        <p className="lead">{product?.description}</p>
                        <StarsReview rating={totalStars} size={32}/>
                    </div>
                </div>
                <CheckoutAndReviewBox product={product} mobile={true} cartId={cart?.cartId}/>
                <hr />
                <LatestReviews reviews={reviews} productId={product?.productId} mobile={true} />
            </div>
        </div>
    )
}