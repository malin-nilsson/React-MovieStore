import React, { useState } from 'react'
import { ICart } from '../models/ICart';
import { IMovie } from '../models/IMovie'
import Modal from './Modal';
import ShoppingCart from './ShoppingCart';

interface IMoviesProps {
    movies: IMovie[]
}

export default function Movies(props: IMoviesProps) {
    const [cart, setCart] = useState<ICart[]>([]);
    const [modal, setModal] = useState(false);
    const [product, setProduct] = useState<IMovie>(
        {
            id: 0,
            name: "",
            description: "",
            price: 0,
            imageUrl: "",
            year: "",
        }

    );

    ///////////////////
    /* Toggle modal */
    //////////////////
    const toggleModal = (item: IMovie) => {
        setModal(modal => !modal);
        setProduct(item)
    }

    /////////////////////
    /* Display movies */
    /////////////////////
    const movies = props.movies.map((item) => {
        return (

            <div key={item.id} className="movie">
                <button
                    className="movie-image"
                    onClick={() => { toggleModal(item) }}>
                    <img src={item.imageUrl} alt={item.name} />
                </button>
                <div className="movie-info">
                    <span className="movie-title">{item.name}</span>
                    <div className="movie-price">
                        <span>{item.price} SEK</span>
                        <button onClick={() => { addMovieToCart(item) }}>Add to cart</button>
                    </div>
                </div>
            </div>


        )
    })

    ////////////////////////////////
    /* Add movie to shopping cart */
    ////////////////////////////////
    const addMovieToCart = (movie: IMovie) => {
        let movieExists = false;
        let tempCart = [...cart];

        for (let i = 0; i < cart.length; i++) {
            if (cart[i].productId === movie.id) {
                movieExists = true;
                tempCart[i].productAmount++;
            }
        }

        if (!movieExists) {
            setCart([...cart, {
                productId: movie.id,
                productName: movie.name,
                productThumbnail: movie.imageUrl,
                productAmount: 1,
                productPrice: movie.price
            }]);
        } else {
            setCart(tempCart);
        }
    }

    ////////////////////////////////////
    /* Increase item in shopping cart */
    ////////////////////////////////////
    const increaseQuantity = (id: number) => {
        let tempCart = [...cart];
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].productId === id) {
                tempCart[i].productAmount++;
                setCart(tempCart);
            }
        }
    }

    ////////////////////////////////////
    /* Decrease item in shopping cart */
    ////////////////////////////////////
    const decreaseQuantity = (id: number) => {
        let tempCart = [...cart];
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].productId === id) {
                tempCart[i].productAmount--;
                setCart(tempCart);
                if (tempCart[i].productAmount <= 0) {
                    let index = cart.findIndex((item) => item.productId === id);
                    tempCart.splice(index, 1)
                    setCart(tempCart);
                }

            }

        }
    }

    ////////////////////
    /* Get total sum */
    ///////////////////
    const sum = cart.reduce(function (a, b) {
        return a + b.productPrice * b.productAmount
    }, 0);

    ////////////////////////////////////
    /* Remove item from shopping cart */
    ////////////////////////////////////
    const removeItem = (id: number) => {
        let tempCart = [...cart];
        tempCart.splice(id, 1)
        setCart(tempCart)
    }

    return (
        <>
            {modal ? <Modal toggleModal={toggleModal} addMovieFromModal={addMovieToCart} product={product} /> : ""}
            <main className="main-content">
                <section className="movie-box">
                    {movies}
                </section>
                <ShoppingCart cart={cart} sum={sum}
                    removeFromCart={removeItem}
                    increaseQuantity={increaseQuantity}
                    decreaseQuantity={decreaseQuantity}
                />
            </main>
        </>
    )
}

