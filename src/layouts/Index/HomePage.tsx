import React from "react";
import ProductCatlogue from "./ Components/ProductCatalogue";
import Carousel from "./ Components/Carousel";
import Introduction from "./ Components/Introduction";
import { Slider } from "./ Components/Slider";
import { GameCatalogue } from "./ Components/GameCatalogue";


export const HomePage = () => {
    return (
        <>
            {/* <ProductCatlogue/> */}
            <Slider/>
            <GameCatalogue/>
            {/* <Carousel/> */}
            {/* <Introduction/> */}
        </>
    )
}