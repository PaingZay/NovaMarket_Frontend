import { Link } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";


export const SearchProduct: React.FC<{ product: ProductModel }> = (props) => {
    return (
        <div className="card mt-3 shadow p-3 bg-body rounded">
            <div className="row g-0">
                <div className="col-md-2">
                    <div className="d-none d-lg-block">
                        {
                            props.product.imageUrl ?
                            <img
                            src={props.product.imageUrl}
                            width='200'
                            height='200'
                            alt="product"
                            />
                            :
                            <img
                            src="https://www.kindpng.com/picc/m/421-4212275_transparent-default-avatar-png-avatar-img-png-download.png"
                            width='200'
                            height='200'
                            alt="product"
                            />

                        }
                    </div>
                    <div className='d-lg-none d-flex justify-content-center 
                        align-items-center'>
                        {props.product.imageUrl ?
                            <img src={props.product.imageUrl}
                                width='200'
                                height='200'
                                alt='Book'
                            />
                            :
                            <img src={require('../../../Images/BooksImages/book-luv2code-1000.png')}
                                width='200'
                                height='200'
                                alt='Book'
                            />
                        }
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='card-body'>
                        <h5 className='card-title'>
                            {props.product.productName}
                        </h5>
                        <h4>
                            {props.product.categoryId}
                        </h4>
                        <p className='card-text'>
                            {props.product.description}
                        </p>
                    </div>
                </div>
                <div className='col-md-4 d-flex justify-content-center align-items-center'>
                    {/* Got to checkout page by passing the product Id from the current search product page */}
                    <Link className='btn btn-md main-color text-white' href='#' to={`/checkout/${props.product.productId}`}>
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}