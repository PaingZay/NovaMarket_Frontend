// import CartItemModel from "../../../Models/CartItemModel"
// import CartModel from "../../../Models/CartModel"

// export const Cart:React.FC<{ cart:CartModel | undefined, cartItem: CartItemModel | undefined, mobile:boolean, quantityChanges: number, increaseQuantity: any, decreaseQuantity:any}> = (props) => {
//     return (
//         <div>
            
//             <tr>
//             <td className="product">

//                 {props.cartItem?.product?.imageUrl ?
//                                     <img src={props.cartItem?.product.imageUrl}
//                                         className="product-image"
//                                         width='200'
//                                         height='200'
//                                         alt='Product'
//                                     />
//                                     :
//                                     <img src={require('../../../Images/BooksImages/book-luv2code-1000.png')}
//                                         width='200'
//                                         height='200'
//                                         alt='Product'
//                                     />
//                                 }

//                 {props.cartItem?.product.productName}
//             </td>
//             <td className="price">${props.cartItem?.pricePerUnit}</td>
//             <td><button className="btn main-color btn-lg text-white" onClick={() => props.decreaseQuantity(props.cartItem?.product.id)}>-</button></td>
//             {/* <button onClick={() => {
//                 props.decreaseQuantity();
//                 props.calculateTotal();
//             }}>-</button> */}
//             <td>{props.cartItem?.quantity}</td>
//             <td><button className="btn main-color btn-lg text-white" onClick={() => props.increaseQuantity(props.cartItem?.product.id)}>+</button></td>
//             {/* <button onClick={() => {
//                 props.increaseQuantity();
//                 props.calculateTotal();
//             }}>+</button> */}
//             <td className="subtotal">{props.cartItem?.totalPrice}</td>
//             <td><button className="btn btn-remove">Remove</button></td>
//             </tr>
//             {/* <tr>
//             <td className="product">
//                 <img className="product-image" src="product2.jpg" alt="Product Image" />
//                 Product 2
//             </td>
//             <td className="price">$19.99</td>
//             <td>1</td>
//             <td className="subtotal">$19.99</td>
//             <td><button className="btn btn-remove">Remove</button></td>
//             </tr> */}

//     </div>
//     )
// }



import CartItemModel from "../../../Models/CartItemModel";
import CartModel from "../../../Models/CartModel";
import "../styles.scss";


export const Cart:React.FC<{ cart:CartModel | undefined, cartItem: CartItemModel | undefined, mobile:boolean, quantityChanges: number, increaseQuantity: any, decreaseQuantity:any, calculateTotal:any}> = (props) => {
    
    return (
        <div className="product">
        <div className="product-image">
        {props.cartItem?.product?.imageUrl ?
                                    <img src={props.cartItem?.product.imageUrl}
                                        className="product-image"
                                        width='200'
                                        height='200'
                                        alt='Product'
                                    />
                                    :
                                    <img src={require('../../../Images/BooksImages/book-luv2code-1000.png')}
                                        width='800'
                                        height='200'
                                        alt='Product'
                                    />
                                }
        </div>
        <div className="product-details">
        <div className="product-title"></div>
        <p className="product-description">The best dog bones of all time. Holy crap. Your dog will be begging for these things! I got curious once and ate one myself. I'm a fan.</p>
        </div>
        <div className="product-price">{props.cartItem?.pricePerUnit}</div>
        {/* <div><button className="btn main-color btn-lg text-white" onClick={() => props.decreaseQuantity(props.cartItem?.product.id)}> - </button></div> */}
             {/* <button onClick={() => {
                 props.decreaseQuantity();
                 props.calculateTotal();
             }}> cal </button> */}
        <div className="product-quantity">
        <input type="number" value={props.cartItem?.quantity} min="1"/>
        </div>
        {/* <div><button className="btn main-color btn-lg text-white" onClick={() => props.increaseQuantity(props.cartItem?.product.id)}> + </button></div> */}
             {/* <button onClick={() => {
                 props.increaseQuantity();
                 props.calculateTotal();
             }}> cal </button> */}
        <div className="product-removal">
        <button className="remove-product">
            Remove
        </button>
        </div>
        <div className="product-line-price">25.98</div>
        </div>
    );
}