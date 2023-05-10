import React from "react";
import { Link, NavLink } from "react-router-dom";

function ProductCatlogue() {
    return(
        <div className="p-5 mb-4 bg-dark header">
            <div className="container-fluid py-5 text-white d-flex justify-content-center align-items-center">
                <h1 className="display-5 fw-bold">Find your next adventure</h1>
                <p className="col-md-8 fs-4">Where would you like to go next?</p>
                <Link type="button" className='btn main-color btn-lg text-white' to='/search'>Explore top products</Link>
            </div>
        </div>
    );
}

export default ProductCatlogue;