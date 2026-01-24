import './styles.css'

import Categories from '../Categories'
import type { ProductDTO } from '../../models/product'

type Props = {
    product: ProductDTO
}
export default function ProductDetailsCard({product} : Props) {

    return (
        <>
            <div className="card mb20">
                <div className="product-details-top line-bottom">
                    <img src={product.imgUrl} alt={product.name} />
                </div>
                <div className="product-details-bottom">
                    <h3>R$ {product.price.toFixed(2)}</h3>
                    <h4>{product.name}</h4>
                    <p>{product.description}</p>
                    <div className='category-container'>
                        {
                            product.categories.map(item => (
                                <Categories key={item.id} name={item.name}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
}