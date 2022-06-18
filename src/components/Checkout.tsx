import axios from 'axios';
import React, { useState } from 'react'
import { IFormError } from '../models/IFormError';

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
    const [errors, setErrors] = useState<IFormError>({
        nameRequired: false,
        nameRequiredMessage: "",
        paymentRequired: false,
        paymentRequiredMessage: "",
        emailRequired: false,
        emailRequiredMessage: "",
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
            payment: data.payment
        };

        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        // Validate
        if (data.name.length === 0) {
            setErrors({
                ...errors,
                nameRequired: true,
                nameRequiredMessage: "Please enter your name.",
            });
        } else if (data.email.length === 0 || !re.test(data.email)) {
            setErrors({
                ...errors,
                emailRequired: true,
                emailRequiredMessage: "Please enter a valid e-mail address.",
            });
        } else if (data.payment === "") {
            setErrors({
                ...errors,
                paymentRequired: true,
                paymentRequiredMessage: "Please choose a payment method.",
            });
        }
        else {
            setErrors({
                ...errors,
                nameRequired: false,
                emailRequired: false,
                paymentRequired: false,
            });
            placeOrder(userData)
        }
    };

    const placeOrder = (userData: { name: string; email: string; payment: string; }) => {
        axios.post("https://medieinstitutet-wie-products.azurewebsites.net/api/orders", userData).then((response) => {
            let orderId = response.data.id.toString();
            props.placeOrder(userData, orderId);
            props.toggleCheckout();
        });
    }

    const checkoutHTML = (
        <form onSubmit={handleSubmit} className="checkout-form" noValidate>
            <div className="input-group">
                <span>Name</span>
                <input type="text" name="name" placeholder="Name" onChange={((e) => { handleChange(e) })} />
                {errors.nameRequired && (
                    <div className="error">{errors.nameRequiredMessage}</div>
                )}
            </div>
            <div className="input-group">
                <span>E-mail</span>
                <input type="email" name="email" placeholder="Email" onChange={((e) => { handleChange(e) })} />
                {errors.emailRequired && (
                    <div className="error">{errors.emailRequiredMessage}</div>
                )}
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
                {errors.paymentRequired && (
                    <div className="error">{errors.paymentRequiredMessage}</div>
                )}
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

    );
};
