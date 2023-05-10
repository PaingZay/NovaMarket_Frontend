import { useEffect, useState } from "react";
import ProductModel from "../../Models/ProductModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";

export const CheckoutPage = () => {

    const [product, setProduct] = useState<ProductModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    //Split the url and store the splitted parts in an array
    //Then take the third index because it is a path variable
    const productId = (window.location.pathname).split('/')[2];

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
                id: responseJson.id,
                productName: responseJson.productName,
                description: responseJson.description,
                categoryId: responseJson.categoryId,
                price: responseJson.price,
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
                            <h5 className="text-primary">{product?.manufacturer}</h5>
                            <p className="lead">{product?.description}</p>
                        </div>
                    </div>
                </div>
                <hr />
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
                    </div>
                </div>
                <hr />
            </div>
        </div>
    )
}