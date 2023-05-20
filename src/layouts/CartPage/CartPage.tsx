//THERE IS NO ERROR BUT CLEAN THE CODE

import { useEffect, useState } from "react";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { useOktaAuth } from "@okta/okta-react";
import CartModel from "../../Models/CartModel";
import CartItemModel from "../../Models/CartItemModel";
import { Cart } from "./Components/Cart";
import ProductModel from "../../Models/ProductModel";
import CustomerModel from "../../Models/CustomerModel";
// import './styles.css';

export const CartPage = () => {

    const { authState } = useOktaAuth();

    //CartState
    const [cart, setCart] = useState<CartModel>();
    const [isLoadingCart, setIsLoadingCart] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const [cartItems, setCartItems] = useState<CartItemModel[]>([]);
    const [isLoadingCartItem, setIsLoadingCartItem] = useState(true);

    //If updated load data
    const[quantityChanges, setQuantityChanges] = useState(0);
    const[isLoadingUpdatedStatus, setIsLoadingUpdatedStatus] = useState(true);

    const customerId = (window.location.pathname).split('/')[2];
    //const [cartId, setCartId] = useState(0);

        //Cart
        useEffect(() => {
            const fetchCart = async () => {
                if(authState && authState.isAuthenticated) {

                    //Path variable is no longer need We are using JWT
                    //So only logged in user's information will be displayed and processed
                    const url = `http://localhost:8081/api/cart/secure/${customerId}`;
    
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
            }
        }
        fetchCart().catch((error:any) => {
            setIsLoadingCart(false);
            setHttpError(error.message);
        })
    },[authState,customerId]);//CUSTOMERID JUST ADDED NEED TO READ REVIEW PRODUCT

    //     //CartItem
    //     useEffect(() => {
    //         const fetchCart = async () => {
    //             if(authState && authState.isAuthenticated) {

    //                 const url = `http://localhost:8081/api/cart/items/secure/${cart?.cartId}`;
                    

    //                 const requestOptions = {
    //                     method: 'GET',
    //                     headers: {
    //                         Authorization: `Bearer ${authState.accessToken?.accessToken}`,
    //                         'Content-Type': 'application/json'
    //                 }
    //             };
    //             const cartResponse = await fetch(url, requestOptions);
    //             if(!cartResponse.ok){
    //                 throw new Error('Something went wrong');
    //             }
    //             const responseData = await cartResponse.json();

    //             const loadedCartItems: CartItemModel[] = [];

    //         for(const key in responseData) {
    //             const cartItem: CartItemModel = new CartItemModel(
    //                 responseData[key].id,
    //                     new CartModel(
    //                         responseData[key].cart.id,
    //                         new CustomerModel(
    //                             responseData[key].cart.customer.id,
    //                             responseData[key].cart.customer.address,
    //                             responseData[key].cart.customer.city,
    //                             responseData[key].cart.customer.dateOfBirth,
    //                             responseData[key].cart.customer.email,
    //                             responseData[key].cart.customer.firstName,
    //                             responseData[key].cart.customer.lastName,
    //                             responseData[key].cart.customer.password,
    //                             responseData[key].cart.customer.phoneNumber,
    //                             responseData[key].cart.customer.state,
    //                             responseData[key].cart.customer.zipCode
    //                             ),
    //                             responseData[key].cart.createdDate,
    //                             responseData[key].cart.status
    //                     ),
    //                     new ProductModel(
    //                         responseData[key].product.id,
    //                         responseData[key].product.productName,
    //                         responseData[key].product.description,
    //                         responseData[key].product.category.id,
    //                         responseData[key].product.price,
    //                         responseData[key].product.sku,
    //                         responseData[key].product.discountPrice,
    //                         responseData[key].product.manufacturer,
    //                         responseData[key].product.imageUrl,
    //                         responseData[key].product.weight,
    //                         responseData[key].product.dimension
    //                     ),
    //                     responseData[key].quantity,
    //                     responseData[key].pricePerUnit,
    //                     responseData[key].totalPrice
    //                 );
                    
    //                 loadedCartItems.push(cartItem);
    //             }

    //             setCartItems(loadedCartItems);
    //             setIsLoadingCartItem(false);
    //         }
    //     }
    //     fetchCart().catch((error:any) => {
    //         setIsLoadingCartItem(false);
    //         setHttpError(error.message);
    //     })
    // },[authState]);

    //Udemy Dynamic Technique Haven't tested.
    
    useEffect(() => {
        const fetchCartItems = async () => {
          if (cart && authState && authState.isAuthenticated) {
            /*FrontEnd retrieve the cartItems using cartID of a specific customer with pathVariable
            This is also ok since the user cannot manually edit the value of cartId in the url
            But we need to put cart at the button. I need to learn for that*/
            const url = `http://localhost:8081/api/cart/items/secure/${cart.cartId}`;
            
            /*Backend retrieve the cartItem using cartID of a specific customer passed by Jason Web Token
            Notice that we dont need any cartId path variable here since we already pass JWT to api*/
            //const url = `http://localhost:8081/api/cart/items/secure/2`;

            const requestOptions = {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
              }
            };
    
            try {
              const cartItemsResponse = await fetch(url, requestOptions);
              if (!cartItemsResponse.ok) {
                throw new Error('Something went wrong');
              }
              const responseData = await cartItemsResponse.json();
    
              const loadedCartItems: CartItemModel[] = [];
    
              for (const key in responseData) {
                const cartItem: CartItemModel = new CartItemModel(
                  responseData[key].id,
                  new CartModel(
                    responseData[key].cart.id,
                    new CustomerModel(
                      responseData[key].cart.customer.id,
                      responseData[key].cart.customer.address,
                      responseData[key].cart.customer.city,
                      responseData[key].cart.customer.dateOfBirth,
                      responseData[key].cart.customer.email,
                      responseData[key].cart.customer.firstName,
                      responseData[key].cart.customer.lastName,
                      responseData[key].cart.customer.password,
                      responseData[key].cart.customer.phoneNumber,
                      responseData[key].cart.customer.state,
                      responseData[key].cart.customer.zipCode
                    ),
                    responseData[key].cart.createdDate,
                    responseData[key].cart.status
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
                  ),
                  responseData[key].quantity,
                  responseData[key].pricePerUnit,
                  responseData[key].totalPrice
                );
    
                loadedCartItems.push(cartItem);
              }
    
              setCartItems(loadedCartItems);
              setIsLoadingCartItem(false);
            } catch (error:any) {
              setIsLoadingCartItem(false);
              setHttpError(error.message);
            }
          }
        };
    
        fetchCartItems();
      }, [quantityChanges, cart, authState]);

      async function updateCart(productId:number) {
        const url = `http://localhost:8081/api/cart/items/quantity/secure/${productId}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
    };
    const updateResponse = await fetch(url, requestOptions);
    if(!updateResponse.ok) {
        throw new Error('Something went wrong!');
    }
    setQuantityChanges(quantityChanges+1);
    setIsLoadingUpdatedStatus(false);
    }

    if(isLoadingCart || isLoadingCartItem ) {
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
            <div className="container">
            <h1>Shopping Cart</h1>
            <table className="table table-striped">
            <thead>
                <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
            {cartItems.map(cartItem => (
                            <Cart cart={cart} cartItem={cartItem} mobile={false} isUpdated={quantityChanges} updateCart={updateCart}></Cart>
                        ))
            }
            </tbody>
            </table>
            <div className="card">
            <div className="card-body">
                <h5 className="card-title">Cart Summary</h5>
                <p className="card-text">Total Items: 3</p>
                <p className="card-text">Total Price: $41.97</p>
                <a href="#" className="btn btn-primary btn-checkout">Checkout</a>
            </div>
            </div>
        </div>
        </div>
    );
}