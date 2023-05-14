import React from "react";
//import CustomerModel from "../../../Models/CustomerModel";
import ProductModel from "../../../Models/ProductModel";
// import CartModel from "../../../Models/CartModel";

export const CarouselProduct: React.FC<{product: ProductModel}> = (props) => {
    return (
        <div className='col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3'>
                                <div className='text-center'>
                                    {/* OPEN LATER */}
                                    {props.product.imageUrl?
                                        <img
                                        //src={require('./../../../Images/BooksImages/product-luv2code-1000.png')}
                                        src={props.product.imageUrl}
                                        width='200'
                                        height='200'
                                        alt="product"
                                        />
                                        :
                                        <img
                                        //src={require('./../../../Images/BooksImages/product-luv2code-1000.png')}
                                        src="https://www.kindpng.com/picc/m/421-4212275_transparent-default-avatar-png-avatar-img-png-download.png"
                                        width='200'
                                        height='200'
                                        alt="product"
                                        />
                                    }
                                    {/* <img
                                        //src={require('./../../../Images/BooksImages/product-luv2code-1000.png')}
                                        src="https://wanderer.moe/images/genshin-impact/character-icons/albedo-icon.png"
                                        width='200'
                                        height='200'
                                        alt="product"
                                    /> */}
                                    <h6 className='mt-2'>Avatar</h6>
                                    <p>{props.product.productId}</p>
                                    <p>{props.product.productName}</p>
                                    <p>{props.product.description   }</p>
                                    <a className='btn main-color text-white' href='#'>Buy</a>
                                </div>
                            </div>
    );
}