import './styles.css'
import { useContext } from 'react';
import { ContextToken } from '../../utils/context-token';
import * as authService from '../../services/auth-service'
import { Link } from 'react-router-dom';

export default function LoggedUser() {

    const { contextTokenPayload, setContextTokenPayload } = useContext(ContextToken)

    function handleLogout() {
        authService.logout();
        setContextTokenPayload(undefined);
    }
    return (
        <>
            {
                contextTokenPayload &&
                authService.isAuthenticated()
                ?
                <div className='logged-menu'>
                    <p>{
                        contextTokenPayload &&
                        authService.getAccessTokenPayload()?.username
                    }</p>
                    <Link to="/catalog" onClick={handleLogout}>
                        Sair
                    </Link>
                </div>
                :
                <Link to="/login">
                    Entrar
                </Link>
            }
        </>
        );
}