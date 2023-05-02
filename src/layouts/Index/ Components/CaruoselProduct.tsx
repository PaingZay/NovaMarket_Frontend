import React from "react";
import CustomerModel from "../../../Models/CustomerModel";
import BookModel from "../../../Models/BookModel";

export const CarouselProduct: React.FC<{book: BookModel}> = (props) => {
    return (
        <div className='col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3'>
                                <div className='text-center'>
                                    {/* OPEN LATER */}
                                    {/* {props.customer.img?
                                        <img
                                        //src={require('./../../../Images/BooksImages/book-luv2code-1000.png')}
                                        src={props.customer.img}
                                        width='200'
                                        height='200'
                                        alt="product"
                                        />
                                        :
                                        <img
                                        //src={require('./../../../Images/BooksImages/book-luv2code-1000.png')}
                                        src="https://wanderer.moe/images/genshin-impact/character-icons/albedo-icon.png"
                                        width='200'
                                        height='200'
                                        alt="product"
                                        />
                                    } */}
                                    <img
                                        //src={require('./../../../Images/BooksImages/book-luv2code-1000.png')}
                                        src="https://wanderer.moe/images/genshin-impact/character-icons/albedo-icon.png"
                                        width='200'
                                        height='200'
                                        alt="product"
                                    />
                                    <h6 className='mt-2'>Avatar</h6>
                                    <p>{props.book.id}</p>
                                    <a className='btn main-color text-white' href='#'>Buy</a>
                                </div>
                            </div>
    );
}