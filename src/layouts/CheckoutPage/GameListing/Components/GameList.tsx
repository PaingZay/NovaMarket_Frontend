import { Game } from "./Game";

export const GameList = () => {
    return (
        <div className="card game-catalogue-bg p-5" style={{width: '100%'}}>
            <div className="row">
            <div className="col">
            <h3>TRENDING</h3>
            </div>
            </div>
            <div className="row">
            <Game/>
            <Game/>
            <Game/>
            <Game/>
            <Game/>
            <Game/>
            </div>
            <div className="row mt-5">
                <div className="col-12">
                    <div className="d-flex justify-content-center">
                        <button className="custom-btn btn-3"><span>Read More</span></button>
                    </div>
                </div>
            </div>
        </div>
    );
}