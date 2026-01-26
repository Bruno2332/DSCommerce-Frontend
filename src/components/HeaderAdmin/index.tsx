import './styles.css'
import productIcon from '../../assets/product.svg'
import homeIcon from '../../assets/home.svg'
import { NavLink } from 'react-router-dom';
import LoggedUser from '../LoggedUser';

export default function HeaderAdmin() {

    return (
        <header className="header-admin">
            <nav className="container">
                <h1>DSC Admin</h1>
                <div className="navbar-right">
                    <div className="menu-items-container">
                        <div className="menu-item">
                            <NavLink to='/admin/home' className={({isActive}) => isActive ? "menu-item-active" : ""}>
                                <img src={homeIcon} alt="Início" />
                                <p>Início</p>
                            </NavLink>
                        </div>
                        <div className="menu-item">
                            <NavLink to="/admin/product" className={({isActive}) => isActive ? "menu-item-active" : ""}>
                                <img src={productIcon} alt="Produtos" />
                                <p>Produtos</p>
                            </NavLink>
                        </div>
                    </div>
                    <div className="logged-user">
                        <LoggedUser />
                    </div>
                </div>
            </nav>
        </header>
    );
}