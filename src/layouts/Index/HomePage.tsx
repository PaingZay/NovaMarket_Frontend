import React from "react";
import ProductCatlogue from "./ Components/ProductCatalogue";
import Carousel from "./ Components/Carousel";
import Introduction from "./ Components/Introduction";

export const HomePage = () => {
    return (
        <>
            <ProductCatlogue/>
            <Carousel/>
            <Introduction/>
        </>
    )
}