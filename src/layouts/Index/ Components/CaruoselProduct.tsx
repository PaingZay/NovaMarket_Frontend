import React from "react";
import CustomerModel from "../../../Models/CustomerModel";
//import BookModel from "../../../Models/BookModel";

export const CarouselProduct: React.FC<{book: CustomerModel}> = (props) => {
    return (
        <div className='col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3'>
                                <div className='text-center'>
                                    {/* OPEN LATER */}
                                    {props.book.zipCode?
                                        <img
                                        //src={require('./../../../Images/BooksImages/book-luv2code-1000.png')}
                                        src={props.book.zipCode}
                                        width='200'
                                        height='200'
                                        alt="product"
                                        />
                                        :
                                        <img
                                        //src={require('./../../../Images/BooksImages/book-luv2code-1000.png')}
                                        src="https://www.kindpng.com/picc/m/421-4212275_transparent-default-avatar-png-avatar-img-png-download.png"
                                        width='200'
                                        height='200'
                                        alt="product"
                                        />
                                    }
                                    {/* <img
                                        //src={require('./../../../Images/BooksImages/book-luv2code-1000.png')}
                                        src="https://wanderer.moe/images/genshin-impact/character-icons/albedo-icon.png"
                                        width='200'
                                        height='200'
                                        alt="product"
                                    /> */}
                                    <h6 className='mt-2'>Avatar</h6>
                                    <p>{props.book.id}</p>
                                    <p>{props.book.firstName}</p>
                                    <p>{props.book.lastName}</p>
                                    <a className='btn main-color text-white' href='#'>Buy</a>
                                </div>
                            </div>
    );
}