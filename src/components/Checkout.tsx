import axios from 'axios';
import React, { useState } from 'react'

interface ICheckoutProps {
    placeOrder: (userData: { name: string; email: string; address: string; }, orderId: string) => void;
    toggleCheckout: () => void;
}

export default function Checkout(props: ICheckoutProps) {
    const [data, setData] = useState({
        name: "",
        email: "",
        address: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userData = {
            name: data.name,
            email: data.email,
            address: data.address
        };


        axios.post("https://medieinstitutet-wie-products.azurewebsites.net/api/orders", userData).then((response) => {
            let orderId = response.data.id.toString();
            placeOrder(userData, orderId)
        });

    };


    const placeOrder = (userData: { name: string; email: string; address: string; }, orderId: string) => {
        props.placeOrder(userData, orderId);
        props.toggleCheckout();
    }



    const checkoutHTML = (
        <form onSubmit={handleSubmit} className="checkout-form">
            <div className="input-group">
                <label>Name</label>
                <input type="text" name="name" placeholder="Name" onChange={((e) => { handleChange(e) })} />
            </div>
            <div className="input-group">
                <label>E-mail</label>
                <input type="email" name="email" placeholder="Email" onChange={((e) => { handleChange(e) })} />
            </div>
            <div className="input-group">
                <label>Address</label>
                <input type="text" name="address" placeholder="Address" onChange={((e) => { handleChange(e) })} />
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
