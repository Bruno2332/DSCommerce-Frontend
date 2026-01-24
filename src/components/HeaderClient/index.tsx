import CartIcon from '../CartIcon';
import './styles.css'

import { Link } from 'react-router-dom';


export default function HeaderClient() {

    return (
        <>
            <header className="header-client">
                <nav className="container">
                    <Link to="/">
                        <h1>Dscommerce</h1>
                    </Link>

                    <div className="navbar-right">
                        <div className="menu-items-container">
                            <Link to='/cart'>
                                <div className="menu-item">
                                    <CartIcon />
                                </div>
                            </Link>
                        </div>
                        <Link to="/login">
                            Entrar
                        </Link>

                    </div>
                </nav>
            </header>
        </>
    );
}