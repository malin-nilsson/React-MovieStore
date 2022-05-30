import React from 'react'
import { IMovie } from '../models/IMovie';

interface IModalMovieProps {
    product: IMovie;
    toggleModal: (product: IMovie) => void;
    addMovieFromModal: (product: IMovie) => void;
}

export default function MovieModal(props: IModalMovieProps) {

    const addMovieFromModal = (product: IMovie) => {
        props.addMovieFromModal(product)
    }

    return (
        <div className="modal-container">
            <div className="modal">
                <div className="modal-header">
                    <button className="btn-close-modal"
                        onClick={() => {
                            props.toggleModal(props.product);
                        }}><span>X</span></button>

                </div>
                <div className="modal-content">
                    <div className="modal-image">
                        <img src={props.product.imageUrl} alt={props.product.name} />
                    </div>
                    <div className="modal-info">
                        <h2>{props.product.name}</h2>

                        <p className="year">Year: {props.product.year}</p>
                        <p>{props.product.description}.</p>
                        <div className="button-box">
                            <span className="price">{props.product.price} SEK</span>
                            <button
                                onClick={() => { addMovieFromModal(props.product) }}>
                                Add to cart
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    height="20px"
                                    viewBox="0 0 576 512">
                                    <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" /></svg>
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}