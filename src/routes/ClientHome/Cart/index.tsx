
import { useContext, useState } from 'react'
import './styles.css'
import * as cartService from '../../../services/cart-service'
import * as orderService from '../../../services/order-service'
import type { OrderDTO } from '../../../models/order';
import { Link, useNavigate } from 'react-router-dom';
import { ContextCartCount } from '../../../utils/context-cart';


export default function Cart() {

    const navigate = useNavigate();

    const [cart, setCart] = useState<OrderDTO>(cartService.getCart());

    const { setContextCartCount } = useContext(ContextCartCount);

    function handleClearClick(){
        cartService.clearCart();
        const newCart = cartService.getCart();
        setCart(newCart);
        setContextCartCount(newCart.items.length);
    }

    function handleIncreaseItem(productId: number){
        cartService.increaseItem(productId);
        setCart(cartService.getCart());
    }

    function handleDecreaseItem(productId: number){
        cartService.decreaseItem(productId);
        const newCart = cartService.getCart();
        setCart(newCart);
        setContextCartCount(newCart.items.length);
    }

    function handlePlaceOrderClick(){
        orderService.placeOrderRequest(cart)
            .then(response => {
                cartService.clearCart();
                setContextCartCount(0);
                console.log(response)
                navigate(`/confirmation/${response.data.id}`)
            });
    }

    return (
        <main>
            <section id="cart-container" className="container">
                {
                    cart.items.length === 0
                        ? (
                            <div className='section-title mb20'>
                                <h2>Seu carrinho está vazio</h2>
                            </div>
                        )
                        : (
                            <div className="card mb20">
                                {
                                    cart.items.map(item => (
                                        <div key={item.productId} className="cart-item-container line-bottom">
                                            <div className="cart-item-left">
                                                <img src={item.imgUrl} alt={item.name} />
                                                <div className="cart-item-description">
                                                    <h3>{item.name}</h3>
                                                    <div className="cart-item-quantity">
                                                        <div onClick={() => handleDecreaseItem(item.productId)} className="cart-item-quantity-btn">-</div>
                                                        <p>{item.quantity}</p>
                                                        <div onClick={() => handleIncreaseItem(item.productId)} className="cart-item-quantity-btn">+</div>
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
                                    <h3>R$ {cart.total.toFixed(2)}</h3>
                                </div>
                            </div>
                        )
                }
                <div className="btn-page-container">
                    <div onClick={handlePlaceOrderClick} className="btn btn-blue">
                        Finalizar pedido
                    </div>
                    <Link to="/catalog">
                        <div className="btn btn-white">
                            Continuar Comprando
                        </div>
                    </Link>
                    <div onClick={handleClearClick} className="btn btn-white">
                        Limpar carrinho
                    </div>
                </div>
            </section>
        </main>
    )
}