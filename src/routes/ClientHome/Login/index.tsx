import { useContext, useState } from 'react';
import './styles.css'
import type { CredentialsDTO } from '../../../models/auth';
import * as authService from '../../../services/auth-service'
import { useNavigate } from 'react-router-dom';
import { ContextToken } from '../../../utils/context-token';

export default function(){

    const { setContextTokenPayload } = useContext(ContextToken);

    const [formData, setFormData] = useState<CredentialsDTO>({
        username: "",
        password: ""
    })

    const navigate = useNavigate();

    function handleSubmit(event: any){
        event.preventDefault();
        authService.loginRequest(formData)
            .then(response => {
                authService.saveAccessToken(response.data.access_token);
                setContextTokenPayload(authService.getAccessTokenPayload());

                navigate("/cart")
            })
            .catch(error => {
                console.log("erro de login", error);
            })
    }

    function handleInputChange(event: any){
        const value = event.target.value;
        const name = event.target.name;
        setFormData({ ...formData, [name] : value})

    }

    return(

        <section id="login-section" className="container">
            <div className="login-form-container">
                <form className="card form" onSubmit={handleSubmit}>
                    <h2 className="mb10">Login</h2>
                    <div className="form-controls-container">
                        <div>
                            <input
                                name="username"
                                value={formData.username} 
                                className="form-controls" 
                                type="text" 
                                placeholder="Email"
                                onChange={handleInputChange} 
                                />
                            <div className="form-error"></div>
                        </div>
                        <div>
                            <input 
                                name='password'
                                value={formData.password}
                                className="form-controls" 
                                type="password" 
                                placeholder="Senha" 
                                onChange={handleInputChange}
                                />  
                        </div>
                    </div>
                    <div className="login-form-buttons mt20">
                        <button type="submit" className="btn btn-blue">Entrar</button>
                    </div>
                </form>

            </div>
            

        </section>
    );
}