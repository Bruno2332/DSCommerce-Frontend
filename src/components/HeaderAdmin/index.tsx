import './styles.css'
import productIcon from '../../assets/product.svg'
import homeIcon from '../../assets/home.svg'

export default function HeaderAdmin(){

    return(
        <header className="header-admin">
        <nav className="container">
            <h1>DSC Admin</h1>
            <div className="navbar-right">
                <div className="menu-items-container">
                    <div className="menu-item">
                        <img src={homeIcon} alt="Início" />
                        <p>Início</p>
                    </div>
                    <div className="menu-item">
                        <img src={productIcon} alt="Produtos" />
                        <p className="menu-item-active">Produtos</p>
                    </div>
                </div>
                <div className="logged-user">
                    <p>Maria Silva</p>
                    <a href="a">Sair</a>
                </div>
            </div>
        </nav>
    </header>
    );
}