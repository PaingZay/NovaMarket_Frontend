import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import OktaAuth from "@okta/okta-auth-js";

function Navbar() {

  const { oktaAuth, authState } = useOktaAuth();

  if (!authState) {
    return <SpinnerLoading />
  }

  const handleLogout = async () => oktaAuth.signOut();

  console.log(authState);

  return (
    <nav className='navbar navbar-expand-lg navbar-dark main-color py-3'>
      <div className='container-fluid'>
        <span className='navbar-brand'>NovaMarket</span>
        <button className='navbar-toggler' type='button'
          data-bs-toggle='collapse' data-bs-target='#navbarNavDropdown'
          aria-controls='navbarNavDropdown' aria-expanded='false'
          aria-label='Toggle Navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavDropdown'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <NavLink href="#" className='nav-link' to='/home'>Index</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/search'>Search Products</NavLink>
            </li>
            {/* {authState.isAuthenticated && */}
            <li className='nav-item'>
              <a href="#" className='nav-link'>Shelf</a>
              {/* <NavLink className='nav-link' to='/shelf'>Shelf</NavLink> */}
            </li>
            {/* } */}
            {/* {authState.isAuthenticated && authState.accessToken?.claims?.userType === 'admin' && */}
            <li className='nav-item'>
              <a href="#" className='nav-link'>Admin</a>
              {/* <NavLink className='nav-link' to='/admin'>Admin</NavLink> */}
            </li>
            {/* } */}
          </ul>
          <ul className='navbar-nav ms-auto'>
            <div className="btn-group">
              <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                PROFILE
              </button>
              <ul className="dropdown-menu">
                <Link to={`/register/trader`}>
                    <button className="dropdown-item">EDIT PROFILE</button>
                </Link>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </div>
            {!authState.isAuthenticated ?
              <li className='nav-item m-1'>
                <Link type='button' className='btn btn-outline-light' to='/login'>Sign in</Link>
              </li>
              :
              <li>
                <button className='btn btn-outline-light' onClick={handleLogout}>Logout</button>
              </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;