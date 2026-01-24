
import ProductetailsCard from "../../../components/ProductDetailsCard";
import ButtonPrimary from "../../../components/ButtonPrimary";
import ButtonInverse from "../../../components/ButtonInverse";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import type { ProductDTO } from "../../../models/product";
import * as productService from '../../../services/product-service'
import * as cartService from '../../../services/cart-service'
import { ContextCartCount } from "../../../utils/context-cart";



export default function ProductDetails() {

    const params = useParams();
    const navigate = useNavigate();
    const { setContextCartCount } = useContext(ContextCartCount);
    const [product, setProduct] = useState<ProductDTO>();

    useEffect(() => {
        productService.findById(Number(params.productId))
            .then(response => {
                setProduct(response.data);
        })
        .catch(() => {
            navigate("/catalog");
        });
    }, []);

    function handleBuyClick(){
        if (product) {
            cartService.addProduct(product);
            setContextCartCount(cartService.getCart().items.length);
            navigate("/cart");
        }
    }
    
    return (
        <>
            <main>
                <section id="product-details" className="container">
                    {
                        product &&
                        <ProductetailsCard product={product}/>
                    }
                    
                    <div className="btn-page-container">
                        <div onClick={handleBuyClick}>
                            <ButtonPrimary name="Comprar"/>
                        </div>
                        

                        <Link to="/">
                            <ButtonInverse name="Início"/>
                        </Link>
                        
                    </div>

                </section>
            </main>
        </>
    );
}