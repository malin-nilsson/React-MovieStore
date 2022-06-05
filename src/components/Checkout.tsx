import React from 'react'
import { ICart } from '../models/ICart';

interface ICheckoutProps {
    placeOrder: () => void;
}

export default function Checkout(props: ICheckoutProps) {

    const placeOrder = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        props.placeOrder();
    }

    const checkoutHTML = (
        <form action="" className="checkout-form">
            <div className="input-group">
                <label>Name</label>
                <input type="text" name="" placeholder="Name" />
            </div>
            <div className="input-group">
                <label>E-mail</label>
                <input type="email" name="" placeholder="Email" />
            </div>
            <div className="input-group">
                <label>Address</label>
                <input type="text" name="" placeholder="Address" />
            </div>
            <button
                onClick={(e) => { placeOrder(e) }}>Place order</button>
        </form>
    );


    return (
        <section className="checkout-box">
            <div className="checkout-content">
                <h3>Customer information:</h3>
                {checkoutHTML}
            </div>
        </section>

    )
}
