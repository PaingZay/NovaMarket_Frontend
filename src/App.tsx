import React from 'react';
import './App.css';
import Navbar from './layouts/NavbarAndFooter/Navbar';
import Footer from './layouts/NavbarAndFooter/Footer';
import { HomePage } from './layouts/Index/HomePage';
import SearchProductPage from './layouts/SearchProductsPage/SearchProductPage';
import { Redirect, Route, Switch, useHistory} from 'react-router-dom';
import { CheckoutPage } from './layouts/CheckoutPage/CheckoutPage';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { oktaConfig } from './lib/oktaConfig';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import LoginWidget from './Auth/LoginWidget';
import { CartPage } from './layouts/CartPage/CartPage';
import { ReviewListPage } from './layouts/CheckoutPage/ReviewListPage/ReviewListPage';
import { GameListingPage } from './layouts/CheckoutPage/GameListing/GameListingPage';
import { RegistrationPage } from './layouts/Registration/RegistrationPage';
const oktaAuth = new OktaAuth(oktaConfig);

//Udemy
export const App = () => {

  const customAuthHandler = () => {
    history.push('/login');
  }

  const history = useHistory();

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
    <div className='d-flex flex-column min-vh-100'>
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
    <Navbar/>
    <div className='flex-grow-1'>
    <Switch>
    <Route path='/' exact>
      <Redirect to='/home' />
    </Route>
    <Route path='/home'>
      <HomePage/>
    </Route>
    <Route path='/search'>
      <SearchProductPage/>
    </Route>
    <Route path='/reviewlist/:productId'>
      <ReviewListPage/> 
    </Route>
    <Route path='/checkout/:productId'>
      <CheckoutPage/>
    </Route>
    <Route path='/cart/:cartId'>
      <CartPage/>
    </Route>
    <Route path='/trade/games'>
      <GameListingPage/>
    </Route>
    <Route path='/register/trader'>
      <RegistrationPage/>
    </Route>
    <Route path='/login' render={
            () => <LoginWidget config={oktaConfig} /> 
            } 
          />
    <Route path='/login/callback' component={LoginCallback} />
    </Switch>
    </div>
    <Footer/>
    </Security>
    </div>
  );
}