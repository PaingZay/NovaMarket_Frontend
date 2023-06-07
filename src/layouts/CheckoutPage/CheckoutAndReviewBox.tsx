import { Link } from "react-router-dom";
import ProductModel from "../../Models/ProductModel";
import { LeaveReview } from "../Utils/LeaveReview";

export const CheckoutAndReviewBox:React.FC<{ product:ProductModel | undefined, mobile:boolean, cartId: number | undefined, isAuthenticated: any, isReviewLeft: boolean, submitReview: any, addToCart: any}> = (props) => {

    function reviewRender() {
        if(props.isAuthenticated && !props.isReviewLeft) {
            return(
                <LeaveReview submitReview={props.submitReview}/>
            )
        } else if (props.isAuthenticated && props.isReviewLeft) {
            return(<p><b>Thank you for your review.</b></p>)
        }
        return (<div><hr/><p>Sign in to be able to leave a review.</p></div>)
    }

    return (
        <div className={props.mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}>
            <div className='card-body container'>
                <div className='mt-3'>
                    <p>
                        <b>{props.cartId}/5 </b>
                        books checked out
                    </p>
                    <hr />
                    {props.product && props.product.sku && props.product.sku > 0 ?
                        <h4 className='text-success'>
                            Available
                        </h4>
                        :
                        <h4 className='text-danger'>
                            Wait List
                        </h4>
                    }
                    <div className='row'>
                        <p className='col-6 lead'>
                            <b>{props.product?.sku} </b>
                            copies
                        </p>
                        <p className='col-6 lead'>
                            <b>{props.product?.sku} </b>
                            available
                        </p>
                    </div>
                </div>
                {/* <Link to='/#' className='btn btn-success btn-lg'>Sign in</Link> */}
                <Link type='button' onClick={props.addToCart} className='btn btn-success btn-lg'
                                to={`/cart/${props.cartId}`}>AddToCart
                            </Link>
                <hr />
                <p className='mt-3'>
                    This number can change until placing order has been complete.
                </p>
                {/* <p> */}
                    {reviewRender()}
                {/* </p> */}
                {/* React rule violation */}
            </div>
        </div>
    );
}