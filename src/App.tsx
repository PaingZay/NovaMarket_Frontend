import React from 'react';
import './App.css';
import Navbar from './layouts/NavbarAndFooter/Navbar';
import Footer from './layouts/NavbarAndFooter/Footer';
import { HomePage } from './layouts/Index/HomePage';
import SearchProductPage from './layouts/SearchProductsPage/SearchProductPage';
import { Redirect, Route, Switch } from 'react-router-dom';
import { CheckoutPage } from './layouts/CheckoutPage/CheckoutPage';

//Udemy
export const App = () => {
  return (
    <div className='d-flex flex-column min-vh-100'>
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
    <Route path='/checkout/:productId'>
      <CheckoutPage/>
    </Route>
    </Switch>
    </div>
    <Footer/>
    </div>
  );
}

//Angela
// function App() {
//   return (
//     <div>
//     <Navbar/>
//     <HomePage/>
//     <Footer/>
//     </div>
//   );
// }

// export default App;