import { useEffect, useState } from 'react';
import './styles.css'
import { Link, useParams } from 'react-router-dom';
import type { OrderDTO } from '../../../models/order';
import * as orderService from '../../../services/order-service'

export default function () {

    const params = useParams();

    const [order, setOrder] = useState<OrderDTO>();

    useEffect(() => {
        orderService.findByIdRequest(Number(params.orderId))
            .then(response => {
                setOrder(response.data);
            })
    }, [])

    return (

        <section id="confirmacao-section" className="container">
            <div className="card mb20">
                {
                    order?.items.map(item => (
                        <div key={item.productId} className="cart-item-container line-bottom">
                            <div className="cart-item-left">
                                <img src={item.imgUrl} alt={item.name} />
                                <div className="cart-item-description">
                                    <h3>{item.name}</h3>
                                    <div className="cart-item-quantity">

                                        <p>{item.quantity}</p>

                                    </div>
                                </div>
                            </div>
                            <div className="cart-item-right">
                                R$ {item.subTotal.toFixed(2)}
                            </div>
                        </div>
                    ))
                }
                <div className="cart-total-container">
                    <h3>R$ {order?.total.toFixed(2)}</h3>
                </div>
            </div>
            <div className="confirmation-message mb20">
                Pedido realizado! Número {order?.id}
            </div>
            <div className="btn-page-container">
                <Link to="/">
                    <div className="btn btn-white">
                        Início
                    </div>
                </Link>
            </div>

        </section>
    );

}