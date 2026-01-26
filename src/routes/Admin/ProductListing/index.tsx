import './styles.css'
import lupaIcon from '../../../assets/lupa-icon.svg'
import editIcon from '../../../assets/editar.svg'
import removeIcon from '../../../assets/remover.svg'
import { useEffect, useState } from 'react';
import * as productService from '../../../services/product-service'
import type { ProductDTO } from '../../../models/product';

type QueryParams = {
    page: number;
    name: string;
}

export default function ProductListing() {

    const [isLastPage, setIsLastPage] = useState(false);

    const [products, setProducts] = useState<ProductDTO[]>([]);

    const [queryParams, setQueryParams] = useState<QueryParams>({
        page: 0,
        name: ""
    });

    useEffect(() => {
        productService.findPageRequest(queryParams.page, queryParams.name)
            .then(response => {
                const nextPage = response.data.content;
                setProducts(products.concat(nextPage));
                setIsLastPage(response.data.last);
            })
    }, [queryParams])

    return (
        <main>
            <section id="product-listing-section" className="container">
                <h2 className="section-title mb20">Cadastro de produtos</h2>
                <div className="btn-page-container mb20">
                    <div className="btn btn-white">
                        Novo
                    </div>
                </div>

                <form className="search-bar">
                    <button type="submit"><img src={lupaIcon} alt="Pesquisar" /></button>
                    <input type="text" placeholder="Nome do produto" />
                    <button type="reset">X</button>
                </form>

                <table className="table mb20 mt20">
                    <thead>
                        <th className="tb576">ID</th>
                        <th></th>
                        <th className="tb768">Preço</th>
                        <th className="txt-left">Nome</th>
                        <th></th>
                        <th></th>
                    </thead>
                    <tbody>
                        {
                            products.map(product => (
                                <tr>
                                    <td className="tb576">{product.id}</td>
                                    <td><img className="prduct-listing-image" src={product.imgUrl} alt={product.name} /></td>
                                    <td className="tb768">R$ {product.price.toFixed(2)}</td>
                                    <td className="txt-left">{product.name}</td>
                                    <td><img className="product-listing-icon" src={editIcon} alt="Editar" /></td>
                                    <td><img className="product-listing-icon" src={removeIcon} alt="Remover" /></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                <div className="btn-next-page">
                    Carregar mais
                </div>
            </section >
        </main>
    );
}