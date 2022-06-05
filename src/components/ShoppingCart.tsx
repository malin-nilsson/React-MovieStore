import { ICart } from "../models/ICart";
import minus from "../assets/minus-solid.png";
import plus from "../assets/plus-solid.png";
import { useState } from "react";
import Checkout from "./Checkout";

interface ICartProps {
    cart: ICart[];
    sum: number;
    removeFromCart: (index: number) => void;
    increaseQuantity: (index: number) => void;
    decreaseQuantity: (index: number) => void;
    confirmOrder: (cart: ICart[]) => void;
}

export default function ShoppingCart(props: ICartProps) {

    const [checkout, setCheckout] = useState(false);

    /* Remove item */
    const removeItem = (id: number) => {
        let index = props.cart.findIndex((item) => item.productId === id);
        props.removeFromCart(index)
    }

    /* Increase item */
    const increaseItem = (id: number) => {
        props.increaseQuantity(id)
    }

    /* Decrease item */
    const decreaseItem = (id: number) => {
        props.decreaseQuantity(id)
    }

    /* Toggle checkout section */
    const toggleCheckout = () => {
        setCheckout(checkout => !checkout);
    }

    const placeOrder = () => {
        props.confirmOrder(props.cart)
    }

    if (props.cart.length !== 0) {
        return <>
            <section className="shopping-cart-box">
                <div className="shopping-cart-content">
                    {props.cart.length === 1 ? <h2>You have {props.cart.length} item in your cart</h2>
                        : <h2>You have {props.cart.length} items in your cart</h2>}
                    <div className="shopping-cart-items">

                        { /* Shopping cart items */}
                        {props.cart.map((item, index) => {
                            return <div className="cart-item" key={index}>
                                <div className="cart-thumbnail">
                                    <img src={item.productThumbnail} alt={item.productName} />
                                </div>
                                <div className="cart-item-info">
                                    <p>{item.productName}</p>
                                    <div className="cart-item-price">
                                        <p>{item.productPrice} SEK</p>
                                        <div className="product-amount">

                                            { /* Decrease item in cart */}
                                            <div className="icon">
                                                <button className="btn-quanitity"
                                                    onClick={() => {
                                                        decreaseItem(item.productId);
                                                    }}>
                                                    <img src={minus} alt="Minus symbol" />
                                                </button>
                                            </div>
                                            <div>
                                                <span className="amountOfProducts">{item.productAmount}</span>
                                            </div>

                                            { /* Increase item in cart */}
                                            <div className="icon">
                                                <button className="btn-quanitity"
                                                    onClick={() => {
                                                        increaseItem(item.productId);
                                                    }}>
                                                    <img src={plus} alt="Plus symbol" />
                                                </button>

                                            </div>

                                        </div>
                                    </div>

                                    { /* Remove item in cart */}
                                    <div className="cart-item-remove">
                                        <button className="btn-remove" onClick={() => { removeItem(item.productId) }}>Remove</button>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>

                    { /* Shopping cart total */}
                    <div className="shopping-cart-footer">
                        <div className="shopping-cart-total">
                            <span className="total">Total: {props.sum} SEK</span>
                        </div>
                        <div className="shopping-cart-continue">
                            <button
                                onClick={() => { toggleCheckout() }}>Continue to checkout</button>
                        </div>
                    </div>
                </div>

                {checkout ? <Checkout placeOrder={placeOrder} /> : ""}
            </section>
        </>
    } else {
        return (
            <section className="shopping-cart-box">
                <div className="shopping-cart-content">
                    <h2>Cart is empty</h2>
                </div>
            </section>

        )
    }
}

