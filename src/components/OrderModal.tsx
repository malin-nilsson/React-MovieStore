import React from 'react'
import { ICart } from '../models/ICart';

interface IOrderModalProps {
    cart: ICart[];
    orderId: string;
    userData: { name: string, email: string, payment: string };
    toggleOrderModal: () => void;
}

export default function OrderModal(props: IOrderModalProps) {

    const closeModal = () => {
        props.toggleOrderModal();
    }

    const sum = props.cart.reduce(function (a, b) {
        return a + b.productPrice * b.productAmount
    }, 0);

    const order = props.cart.map((item) => {
        return (

            <div key={item.productId} className="order">
                <p>{item.productName}</p>
                <p>{item.productPrice} SEK x {item.productAmount}</p>
            </div>
        )
    })

    return (
        <div className="modal-container">
            <div className="modal">
                <div className="modal-header">
                    <button className="btn-close-modal"
                        onClick={() => {
                            closeModal();
                        }}
                    ><span>X</span></button>

                </div>
                <div className="order-box">
                    <div className="order-heading">
                        <h2>Order confirmation</h2>
                        <p>Thank you for your order!</p>
                    </div>
                    <div className="order-content">
                        <div className="order-info">
                            <h3>Order #{props.orderId}</h3>

                            {order}

                            <p><span className="total">Total: </span>{sum} SEK</p>
                            <p>Payment method: {props.userData.payment}</p>
                            <div className="order-address">
                                <p>{props.userData.name}</p>
                                <p>{props.userData.email}</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
