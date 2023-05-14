import React, { useEffect, useState } from "react";
import {CarouselProduct} from "./CaruoselProduct";
import ProductModel from "../../../Models/ProductModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Link } from "react-router-dom";


function Carousel() {

    // const [products, setProducts] = useState<ProductModel[]>([]);\
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const baseUrl: string = "http://localhost:8081/api/products";

            const url: string = `${baseUrl}?pageSize=6&pageNumber=0`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            if(responseJson != null)
            console.log(responseJson);
            else
            console.log("No data");

            const responseData = responseJson.content;

            console.log(responseData);

            const loadedProducts: ProductModel[] = [];

            for (const key in responseData) {
            const product: ProductModel = new ProductModel(

                responseData[key].id,
                responseData[key].productName,
                responseData[key].description,
                responseData[key].categoryId,
                responseData[key].price,
                responseData[key].sku,
                responseData[key].discountPrice,
                responseData[key].manufacturer,
                responseData[key].imageUrl,
                responseData[key].weight,
                responseData[key].dimension
                
            );
            loadedProducts.push(product);
            }





            /*
            loadedBooks array of type CartModel[]. Inside the for...in loop, we create a new CartModel object named cart, passing in the appropriate properties from responseData.
            For the customer property of the CartModel, we create a new CustomerModel object with the appropriate properties from responseData[key].customer.
            We then push the cart object into the loadedBooks array. Note that this assumes that the properties of the CustomerModel class match the properties of the customer object in responseData.
            You may need to adjust the property names as needed based on the structure of your data.
            */

            //const loadedBooks: CartModel[] = [];

            // for (const key in responseData) {
            // const cart: CartModel = new CartModel(
            //     responseData[key].id,
            //     new CustomerModel(
            //     responseData[key].customer.id,
            //     responseData[key].customer.address,
            //     responseData[key].customer.city,
            //     responseData[key].customer.dateOfBirth,
            //     responseData[key].customer.email,
            //     responseData[key].customer.firstName,
            //     responseData[key].customer.lastName,
            //     responseData[key].customer.password,
            //     responseData[key].customer.phoneNumber,
            //     responseData[key].customer.state,
            //     responseData[key].customer.zipCode
            //     ),
            //     responseData[key].createdDate,
            //     responseData[key].status
            // );
            // loadedBooks.push(cart);
            // }

            console.log(responseData);

            setProducts(loadedProducts);
            setIsLoading(false);
        };
        fetchProducts().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, []);

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

    return (
        <div className="container mt-5" style={{height:550}}>
            <div className="homepage-carousel-title">
                <h3>Find your next "I stayed up too late reading" product.</h3>
            </div>
            <div id="carouselExampleControls" className="carousel carousel-dark slide mt-5
            d-none d-lg-block" data-bs-interval='false'>
                
                {/* Desktop */}
                <div className='carousel-inner'>
                    <div className='carousel-item active'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {
                                
                                products.slice(0,3).map(product => (
                                    <CarouselProduct product = {product} key ={product.productId} />
                                ))                                
                            }
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {
                                products.slice(3,6).map(product => (
                                    <CarouselProduct product = {product} key ={product.productId} />
                                ))    
                            }
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {/* {
                                customers.slice(6,9).map(customer => (
                                    <CarouselProduct customer = {customer} key = {customer.id} />
                                ))
                            } */}
                        </div>
                    </div>
                    <button className='carousel-control-prev' type='button'
                        data-bs-target='#carouselExampleControls' data-bs-slide='prev'>
                        <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                        <span className='visually-hidden'>Previous</span>
                    </button>
                    <button className='carousel-control-next' type='button'
                        data-bs-target='#carouselExampleControls' data-bs-slide='next'>
                        <span className='carousel-control-next-icon' aria-hidden='true'></span>
                        <span className='visually-hidden'>Next</span>
                    </button>
                </div>
                </div>

            {/* Mobile */}
            <div className='d-lg-none mt-3'>
                <div className='row d-flex justify-content-center align-items-center'>
                {  
                    products.slice(0,3).map(product => (
                        <CarouselProduct product = {product} key ={product.productId} />
                    ))                                
                }
                </div>
            </div>
            <div className='homepage-carousel-title mt-3'>
                <Link className='btn btn-outline-secondary btn-lg' to='/search'>View More</Link>
            </div>
        </div>
    );
}

export default Carousel;

// create a nested loop outer loop runs 3 times and inner loops runs 10 times
