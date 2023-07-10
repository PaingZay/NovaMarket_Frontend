import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import ProductModel from "../../../Models/ProductModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Link } from "react-router-dom";

$('.slide-nav').on('click', function (e) {
    e.preventDefault();
    // get current slide
    var current = $('.flex--active').data('slide'),
        // get button data-slide
        next = $(this).data('slide');

    $('.slide-nav').removeClass('active');
    $(this).addClass('active');

    if (current === next) {
        return false;
    } else {
        $('.slider__warpper').find('.flex__container[data-slide=' + next + ']').addClass('flex--preStart');
        $('.flex--active').addClass('animate--end');
        setTimeout(function () {
            $('.flex--preStart').removeClass('animate--start flex--preStart').addClass('flex--active');
            $('.animate--end').addClass('animate--start').removeClass('animate--end flex--active');
        }, 800);
    }
});

export const Slider = () => {

    const { authState } = useOktaAuth();

    // Trending Games
    const [trendingGames, setTrendingGames] = useState<ProductModel[]>([]);
    const [isLoadingTrendingGames, setIsLoadingTrendingGames] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const featchTrendingGames = async () => {
            if (authState && authState.isAuthenticated) {
                const baseUrl: string = "http://localhost:8081/api/products";
                const url: string = `${baseUrl}?pageSize=6&pageNumber=0`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };

                const trendingGamesResponse = await fetch(url, requestOptions);
                if (!trendingGamesResponse.ok) {
                    throw new Error('Error Loading Trending Games');
                }
                const trendingGamesJson = await trendingGamesResponse.json();

                const trendingGamesData = trendingGamesJson.content;

                const loadedTrendingGames: ProductModel[] = [];

                for (const key in trendingGamesData) {
                    const product: ProductModel = new ProductModel(

                        trendingGamesData[key].id,
                        trendingGamesData[key].productName,
                        trendingGamesData[key].description,
                        trendingGamesData[key].categoryId,
                        trendingGamesData[key].price,
                        trendingGamesData[key].sku,
                        trendingGamesData[key].discountPrice,
                        trendingGamesData[key].manufacturer,
                        trendingGamesData[key].imageUrl,
                        trendingGamesData[key].weight,
                        trendingGamesData[key].dimension

                    );
                    loadedTrendingGames.push(product);
                }
                setTrendingGames(loadedTrendingGames);
                console.log(trendingGames);
            }
            setIsLoadingTrendingGames(false);
        }
        featchTrendingGames().catch((error: any) => {
            setIsLoadingTrendingGames(false);
            setHttpError(error.message);
        })
    }, []);

    console.log(trendingGames);

    if (isLoadingTrendingGames) {
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
        // <div></div>
        // <div id="carouselExampleDark" className="carousel carousel-dark slide">
        //     <div className="carousel-indicators">
        //         <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        //         <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
        //         <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
        //     </div>
        //     <div className="carousel-inner">
        //         <div className="carousel-item active" data-bs-interval="10000">
        //             <img src="https://www.gensh.in/wallpaper/genshin/genshin_31_4K.jpeg" className="d-block w-100" alt=""/>
        //                 <div className="carousel-caption d-none d-md-block">
        //                     <h5>First slide label</h5>
        //                     <p>Some representative placeholder content for the first slide.</p>
        //                 </div>
        //         </div>
        //         <div className="carousel-item" data-bs-interval="2000">
        //             <img src="https://www.gensh.in/wallpaper/genshin/genshin_31_4K.jpeg" className="d-block w-100" alt="...2..."/>
        //                 <div className="carousel-caption d-none d-md-block">
        //                     <h5>Second slide label</h5>
        //                     <p>Some representative placeholder content for the second slide.</p>
        //                 </div>
        //         </div>
        //     </div>
        //     <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
        //         <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        //         <span className="visually-hidden">Previous</span>
        //     </button>
        //     <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
        //         <span className="carousel-control-next-icon" aria-hidden="true"></span>
        //         <span className="visually-hidden">Next</span>
        //     </button>
        // </div>
        <div>
            <nav>
  <div className="nav nav-tabs" id="nav-tab" role="tablist">
    <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Home</button>
    <Link className='' href='#' to={`/trade/games`}>
    <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">TRADE</button>
    </Link>
    <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">GAME REVIEW</button>
    {/* <button className="nav-link" id="nav-disabled-tab" data-bs-toggle="tab" data-bs-target="#nav-disabled" type="button" role="tab" aria-controls="nav-disabled" aria-selected="false" disabled>Disabled</button> */}
  </div>
</nav>
<div className="tab-content" id="nav-tabContent">
  <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex={0}>...</div>
  <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex={0}>...</div>
  <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabIndex={0}>...</div>
  <div className="tab-pane fade" id="nav-disabled" role="tabpanel" aria-labelledby="nav-disabled-tab" tabIndex={0}>...</div>
</div>
        </div>
    );
}