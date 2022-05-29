import React from 'react'
import { ICart } from '../models/ICart';


export default function Checkout() {
    const checkoutHTML = (
        <form action="" className="checkout-form">
            <div className="input-section">
                <label>Name</label>
                <input type="text" name="" id="" />
            </div>
            <div className="input-section">
                <label>E-mail</label>
                <input type="email" name="" id="" />
            </div>
            <div className="input-section">
                <label>Address</label>
                <input type="text" name="" id="" />
            </div>
            <button>Place order</button>
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
