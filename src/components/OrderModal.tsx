import React from 'react'
import { ICart } from '../models/ICart';

interface IOrderModalProps {
    cart: ICart[];
    toggleOrderModal: () => void;
}

export default function OrderModal(props: IOrderModalProps) {

    const closeModal = () => {
        props.toggleOrderModal();
    }

    const order = props.cart.map((item, i) => {
        return (

            <div key={item.productId} className="order">
                <div className="order-info">
                    <p>Order #</p>
                    <p>{item.productName}</p>
                    <p>{item.productPrice} SEK x {item.productAmount}</p>
                    <p>Total: {item.productPrice * item.productAmount} SEK</p>
                    <div className="order-address">
                        <p>Name</p>
                        <p>Address</p>
                        <p>E-mail</p>
                    </div>
                </div>
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
                    <h2>Order confirmation</h2>
                    <div className="order-content">
                        {order}
                    </div>
                </div>
            </div>
        </div>
    )
}
