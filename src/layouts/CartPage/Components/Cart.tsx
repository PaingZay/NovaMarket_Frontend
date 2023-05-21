import CartItemModel from "../../../Models/CartItemModel"
import CartModel from "../../../Models/CartModel"

export const Cart:React.FC<{ cart:CartModel | undefined, cartItem: CartItemModel | undefined, mobile:boolean, quantityChanges: number, increaseQuantity: any, decreaseQuantity:any}> = (props) => {
    return (
        <div>
            
            <tr>
            <td className="product">

                {props.cartItem?.product?.imageUrl ?
                                    <img src={props.cartItem?.product.imageUrl}
                                        className="product-image"
                                        width='200'
                                        height='200'
                                        alt='Product'
                                    />
                                    :
                                    <img src={require('../../../Images/BooksImages/book-luv2code-1000.png')}
                                        width='200'
                                        height='200'
                                        alt='Product'
                                    />
                                }

                {props.cartItem?.product.productName}
            </td>
            <td className="price">${props.cartItem?.pricePerUnit}</td>
            <td><button onClick={() => props.decreaseQuantity(props.cartItem?.product.id)}>-</button></td>
            {/* <button onClick={() => {
                props.decreaseQuantity();
                props.calculateTotal();
            }}>-</button> */}
            <td>{props.cartItem?.quantity}</td>
            <td><button onClick={() => props.increaseQuantity(props.cartItem?.product.id)}>+</button></td>
            {/* <button onClick={() => {
                props.increaseQuantity();
                props.calculateTotal();
            }}>+</button> */}
            <td className="subtotal">{props.cartItem?.totalPrice}</td>
            <td><button className="btn btn-remove">Remove</button></td>
            </tr>
            {/* <tr>
            <td className="product">
                <img className="product-image" src="product2.jpg" alt="Product Image" />
                Product 2
            </td>
            <td className="price">$19.99</td>
            <td>1</td>
            <td className="subtotal">$19.99</td>
            <td><button className="btn btn-remove">Remove</button></td>
            </tr> */}

    </div>
    )
}