import './styles.css'
import CartIcon from '../CartIcon';
import { Link } from 'react-router-dom';
import iconAdmin from '../../assets/engrenagem.svg'
import * as authService from '../../services/auth-service'
import { useContext } from 'react';
import { ContextToken } from '../../utils/context-token';
import LoggedUser from '../LoggedUser';


export default function HeaderClient() {

    const { contextTokenPayload } = useContext(ContextToken)


    return (

        <header className="header-client">
            <nav className="container">
                <Link to="/">
                    <h1>Dscommerce</h1>
                </Link>

                <div className="navbar-right">
                    <div className="menu-items-container">
                        {
                            contextTokenPayload &&
                            authService.hasAnyRoles(['ROLE_ADMIN']) &&
                            <Link to="/admin">
                                <div className="menu-item">
                                    <img src={iconAdmin} alt="Admin" />
                                </div>
                            </Link>
                        }

                        <Link to='/cart'>
                            <div className="menu-item">
                                <CartIcon />
                            </div>
                        </Link>
                    </div>
                    <LoggedUser />
                </div>
            </nav>
        </header>

    );
}