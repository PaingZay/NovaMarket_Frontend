import React from 'react';
import './App.css';
import Navbar from './layouts/NavbarAndFooter/Navbar';
import Footer from './layouts/NavbarAndFooter/Footer';
import { HomePage } from './layouts/Index/HomePage';

//Udemy
export const App = () => {
  return (
    <div>
    <Navbar/>
    <HomePage/>
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