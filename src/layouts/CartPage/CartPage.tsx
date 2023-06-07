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
  const [quantityChanges, setQuantityChanges] = useState(0);
  const [isLoadingUpdatedStatus, setIsLoadingUpdatedStatus] = useState(true);

  //Calculate Total
  const [total, setTotal] = useState(0);

  const customerId = (window.location.pathname).split('/')[2];
  //const [cartId, setCartId] = useState(0);

  //Cart
  useEffect(() => {
    const fetchCart = async () => {
      if (authState && authState.isAuthenticated) {

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
        if (!cartResponse.ok) {
          throw new Error('Something went wrong');
        }
        const cartResponseJson = await cartResponse.json();

        const loadedCart: CartModel = {
          id: cartResponseJson.id,
          customer: {
            id: cartResponseJson.customer.id,
            address: cartResponseJson.customer.address,
            city: cartResponseJson.customer.city,
            dateOfBirth: cartResponseJson.customer.dateOfBirth,
            email: cartResponseJson.customer.email,
            firstName: cartResponseJson.customer.firstName,
            lastName: cartResponseJson.customer.lastName,
            password: cartResponseJson.customer.password,
            phoneNumber: cartResponseJson.customer.phoneNumber,
            state: cartResponseJson.customer.state,
            zipCode: cartResponseJson.customer.zipCode
          },
          createdDate: cartResponseJson.createdDate,
          status: cartResponseJson.status
        };

        setCart(loadedCart);
        setIsLoadingCart(false);
      }
    }
    fetchCart().catch((error: any) => {
      setIsLoadingCart(false);
      setHttpError(error.message);
    })
  }, [authState, customerId]);//CUSTOMERID JUST ADDED NEED TO READ REVIEW PRODUCT


  useEffect(() => {
    const fetchCartItems = async () => {
      if (cart && authState && authState.isAuthenticated) {
        /*FrontEnd retrieve the cartItems using cartID of a specific customer with pathVariable
        This is also ok since the user cannot manually edit the value of cartId in the url
        But we need to put cart at the button. I need to learn for that*/
        const url = `http://localhost:8081/api/cart/items/secure/${cart.id}`;

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
          let total = 0;
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
            total += responseData[key].totalPrice;
          }
          setTotal(total);
          setCartItems(loadedCartItems);
          setIsLoadingCartItem(false);

        } catch (error: any) {
          setIsLoadingCartItem(false);
          setHttpError(error.message);
        }
      }
    };

    fetchCartItems();
  }, [quantityChanges, cart, authState]);
  //Every time updated successful quantityChanges state changed to true
  //This useEffect stop working when it changed nothing like true changed to true
  //That's why every time updatedCart function executed this useEffect should restart.
  //I think.

  //INCREASE QUANTITY

  async function increaseQuantity(productId: number) {
    const url = `http://localhost:8081/api/cart/items/secure/increase/${productId}`;
    const requestOptions = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        'Content-Type': 'application/json'
      }
    };
    const updateResponse = await fetch(url, requestOptions);
    if (!updateResponse.ok) {
      throw new Error('Something went wrong!');
    }
    setQuantityChanges(quantityChanges + 1);
    setIsLoadingUpdatedStatus(false);
  }

  //DECREASE QUANTITY

  async function decreaseQuantity(productId: number) {
    const url = `http://localhost:8081/api/cart/items/secure/decrease/${productId}`;
    const requestOptions = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        'Content-Type': 'application/json'
      }
    };
    const updateResponse = await fetch(url, requestOptions);
    if (!updateResponse.ok) {
      throw new Error('Something went wrong!');
    }
    setQuantityChanges(quantityChanges + 1);
    setIsLoadingUpdatedStatus(false);
  }

  //CALCULATE SUBTOTAL
  // async function calculateTotal() {
  //   const url = `http://localhost:8081/api/cart/items/secure/total`;
  //   const requestOptions = {
  //     method: 'PUT',
  //     headers: {
  //       Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
  //       'Content-Type': 'application/json'
  //     }
  //   };
  //   const updateResponse = await fetch(url, requestOptions);
  //   console.log("UpdateResponse" + updateResponse);
  //   if (!updateResponse.ok) {
  //     throw new Error('Something went wrong!');
  //   }
  //   const responseData = await updateResponse.json();
  //   console.log("ResponseData" + responseData);
  //   setQuantityChanges(quantityChanges + 1);
  //   setIsLoadingUpdatedStatus(false);
  //   setTotal(responseData);
  // }

  if (isLoadingCart || isLoadingCartItem) {
    return (
      <div className="container m-5">
        <SpinnerLoading />
      </div>
    )
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    )
  }



  return (
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
              <Cart cart={cart} cartItem={cartItem} mobile={false} quantityChanges={quantityChanges} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity}></Cart>
            ))
            }
          </tbody>
        </table>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Cart Summary</h5>
            <p className="card-text">Total Items: 3</p>
            <p className="card-text">Total Price: ${total}</p>
            <a href="#" className='btn btn-success btn-lg'>Checkout</a>
          </div>
        </div>
      </div>
    </div>
  );
}