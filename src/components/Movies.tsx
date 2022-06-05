import React, { useState } from 'react'
import { ICart } from '../models/ICart';
import { IMovie } from '../models/IMovie'
import MovieModal from './MovieModal';
import OrderModal from './OrderModal';
import ShoppingCart from './ShoppingCart';

interface IMoviesProps {
    movies: IMovie[]
    placeholder: string;
}

export default function Movies(props: IMoviesProps) {
    const [cart, setCart] = useState<ICart[]>([]);
    const [movieModal, setMovieModal] = useState(false);
    const [orderModal, setOrderModal] = useState(false);
    const [orderId, setOrderId] = useState("");
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        payment: ""
    })
    const [product, setProduct] = useState<IMovie>(
        {
            id: 0,
            name: "",
            description: "",
            price: 0,
            imageUrl: "",
            year: "",
            productCategory: [{
                categoryId: 0
            }]
        }
    );

    ///////////////////
    /* Toggle modal */
    //////////////////
    const toggleModal = (item: IMovie) => {
        setMovieModal(movieModal => !movieModal);
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
        let movieAlreadyInCart = false;
        let tempCart = [...cart];

        for (let i = 0; i < cart.length; i++) {
            if (cart[i].productId === movie.id) {
                movieAlreadyInCart = true;
                tempCart[i].productAmount++;
            }
        }

        if (!movieAlreadyInCart) {
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

    ////////////////////////////////////
    /* Show popup with order confirmation */
    ////////////////////////////////////
    const confirmOrder = (cart: ICart[], userData: { name: string; email: string; payment: string; }, orderId: string) => {
        setOrderModal(true)
        setOrderId(orderId);
        setUserData(userData)
    }

    const toggleOrderModal = () => {
        setOrderModal(false);
        let tempCart = [...cart];
        tempCart = [];
        setCart(tempCart)
    }

    return (
        <>
            {movieModal ? <MovieModal toggleModal={toggleModal} addMovieFromModal={addMovieToCart} product={product} /> : ""}
            {orderModal ? <OrderModal cart={cart} toggleOrderModal={toggleOrderModal}
                orderId={orderId} userData={userData} /> : ""}

            <main className="main-content">
                <section className="movie-box">
                    {movies}
                    <h4> {props.placeholder}</h4>
                </section>
                <ShoppingCart cart={cart} sum={sum}
                    removeFromCart={removeItem}
                    increaseQuantity={increaseQuantity}
                    decreaseQuantity={decreaseQuantity}
                    confirmOrder={confirmOrder}

                />
            </main>
        </>
    )
}

