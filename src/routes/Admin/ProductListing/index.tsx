import './styles.css'
import lupaIcon from '../../../assets/lupa-icon.svg'

export default function ProductListing() {

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
                        <tr>
                            <td className="tb576">341</td>
                            <td><img className="prduct-listing-image" src="img/computer.png" alt="Computer" /></td>
                            <td className="tb768">R$ 5000,00</td>
                            <td className="txt-left">Computador Gamer XT Plus Ultra</td>
                            <td><img className="product-listing-icon" src="img/editar.svg" alt="Editar" /></td>
                            <td><img className="product-listing-icon" src="img/remover.svg" alt="Remover" /></td>
                        </tr>

                    </tbody>
                </table>

                <div className="btn-next-page">
                    Carregar mais
                </div>
            </section >
        </main>
    );
}