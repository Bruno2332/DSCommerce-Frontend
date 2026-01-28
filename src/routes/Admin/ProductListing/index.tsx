import './styles.css'
import editIcon from '../../../assets/editar.svg'
import removeIcon from '../../../assets/remover.svg'
import { useEffect, useState } from 'react';
import * as productService from '../../../services/product-service'
import type { ProductDTO } from '../../../models/product';
import SearchBar from '../../../components/SearchBar';
import ButtonNextPage from '../../../components/ButtonNextPage';
import DialogInfo from '../../../components/DialogInfo';
import DialogConfirmation from '../../../components/DialogConfirmation';
import ButtonInverse from '../../../components/ButtonInverse';
import { useNavigate } from 'react-router-dom';

type QueryParams = {
    page: number;
    name: string;
}

export default function ProductListing() {

    const navigate = useNavigate();

    const [dialogInfoData, setDialogInfoData] = useState({
        visible: false,
        message: "Operação com sucesso"
    })

    const [dialogConfirmationData, setDialogConfirmationData] = useState({
        visible: false,
        id: 0,
        message: "Tem certeza?"
    })

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

    function handleNewProductClick(){
        navigate("/admin/products/create")
    }

    function handleSearch(searchText: string) {
        setProducts([]);
        setQueryParams({ ...queryParams, page: 0, name: searchText });
    }

    function handleNextPageClick() {
        setQueryParams({ ...queryParams, page: queryParams.page + 1 })
    }

    function handleDialogInfoClose() {
        setDialogInfoData({ ...dialogInfoData, visible: false })
    }

    function handleDeleteClick(ProductId: number) {
        setDialogConfirmationData({ ...dialogConfirmationData, id: ProductId, visible: true })
    }

    function handleDialogConfirmationAnswer(answer: boolean, productId: number) {
        if (answer) {
            productService.deleteById(productId)
                .then(() => {
                    setProducts([]);
                    setQueryParams({ ...queryParams, page: 0 })
                })
                .catch(error => {
                    setDialogInfoData({
                        visible: true,
                        message: error.response.data.error
                    })
                });
        }
        setDialogConfirmationData({ ...dialogConfirmationData, visible: false })
    }


    return (
        <main>
            <section id="product-listing-section" className="container">
                <h2 className="section-title mb20">Cadastro de produtos</h2>
                <div className="btn-page-container mb20">
                    <div onClick={handleNewProductClick}>
                        <ButtonInverse name='Novo'/>
                    </div>
                </div>

                <SearchBar onSearch={handleSearch} />

                <table className="table mb20 mt20">
                    <thead>
                        <tr>
                            <th className="tb576">ID</th>
                            <th></th>
                            <th className="tb768">Preço</th>
                            <th className="txt-left">Nome</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(product => (
                                <tr key={product.id}>
                                    <td className="tb576">{product.id}</td>
                                    <td><img className="prduct-listing-image" src={product.imgUrl} alt={product.name} /></td>
                                    <td className="tb768">R$ {product.price.toFixed(2)}</td>
                                    <td className="txt-left">{product.name}</td>
                                    <td><img className="product-listing-icon" src={editIcon} alt="Editar" /></td>
                                    <td><img onClick={() => handleDeleteClick(product.id)} className="product-listing-icon" src={removeIcon} alt="Remover" /></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {
                    !isLastPage &&
                    <ButtonNextPage onNextPage={handleNextPageClick} />
                }

            </section >
            {
                dialogInfoData.visible &&
                <DialogInfo
                    message={dialogInfoData.message}
                    onDialogClose={handleDialogInfoClose}
                />
            }
            {
                dialogConfirmationData.visible &&
                <DialogConfirmation
                    id={dialogConfirmationData.id}
                    message={dialogConfirmationData.message}
                    onDialogAnswer={handleDialogConfirmationAnswer}
                />
            }
        </main>
    );
}