import axios from 'axios';
import React, { useState } from 'react'

interface ICheckoutProps {
    placeOrder: (userData: { name: string; email: string; payment: string; }, orderId: string) => void;
    toggleCheckout: () => void;
}

export default function Checkout(props: ICheckoutProps) {
    const [data, setData] = useState({
        name: "",
        email: "",
        payment: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value
        });
        console.log(data)
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userData = {
            name: data.name,
            email: data.email,
            payment: data.payment
        };


        axios.post("https://medieinstitutet-wie-products.azurewebsites.net/api/orders", userData).then((response) => {
            let orderId = response.data.id.toString();
            placeOrder(userData, orderId)
        });

    };


    const placeOrder = (userData: { name: string; email: string; payment: string; }, orderId: string) => {
        props.placeOrder(userData, orderId);
        props.toggleCheckout();
    }



    const checkoutHTML = (
        <form onSubmit={handleSubmit} className="checkout-form">
            <div className="input-group">
                <span>Name</span>
                <input type="text" name="name" placeholder="Name" onChange={((e) => { handleChange(e) })} />
            </div>
            <div className="input-group">
                <span>E-mail</span>
                <input type="email" name="email" placeholder="Email" onChange={((e) => { handleChange(e) })} />
            </div>
            <div className="input-group">
                <span>Payment method</span>
                <div className="payment">
                    <div className="payment-method">
                        <input type="radio" name="payment" value="Paypal" onChange={((e) => { handleChange(e) })} />
                        <label>Paypal</label>
                    </div>

                    <div className="payment-method">
                        <input type="radio" name="payment" value="Credit card" onChange={((e) => { handleChange(e) })} />
                        <label>Credit card</label>
                    </div>
                </div>
            </div>
            <button type="submit">Place order</button>
        </form>
    );


    return (
        <section className="checkout-box">
            <div className="checkout-content">
                <h3>Checkout</h3>
                {checkoutHTML}
            </div>
        </section>

    )
}
