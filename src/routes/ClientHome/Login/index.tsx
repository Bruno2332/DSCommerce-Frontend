import { useContext, useState } from 'react';
import './styles.css'
import * as forms from '../../../utils/forms'
import * as authService from '../../../services/auth-service'
import { useNavigate } from 'react-router-dom';
import { ContextToken } from '../../../utils/context-token';
import FormInput from '../../../components/FormInput';

export default function () {

    const { setContextTokenPayload } = useContext(ContextToken);

    const [formData, setFormData] = useState<any>({
        username: {
            value: "",
            id: "username",
            name: "username",
            type: "text",
            placeholder: "Email",
            validation: function (value: string) {
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value.toLowerCase());
            },
            message: "Favor informar um email válido",
        },
        password: {
            value: "",
            id: "password",
            name: "password",
            type: "password",
            placeholder: "Senha",
        }
    });

    const navigate = useNavigate();

    function handleSubmit(event: any) {
        event.preventDefault();
        authService.loginRequest(forms.toValues(formData))
            .then(response => {
                authService.saveAccessToken(response.data.access_token);
                setContextTokenPayload(authService.getAccessTokenPayload());

                navigate("/cart")
            })
            .catch(error => {
                console.log("erro de login", error);
            })
    }

    function handleInputChange(event: any) {
        const result = forms.updateAndValidate(formData, event.target.name, event.target.value);
        setFormData(result);
    }

    function handleTurnDirty(name: string) {
        const newFormData = forms.dirtyAndValidate(formData, name);
        setFormData(newFormData);
    }

    return (

        <section id="login-section" className="container">
            <div className="login-form-container">
                <form className="card form" onSubmit={handleSubmit}>
                    <h2 className="mb10">Login</h2>
                    <div className="form-controls-container">
                        <div>
                            <FormInput
                                {...formData.username}
                                className="form-controls"
                                onTurnDirty={handleTurnDirty}
                                onChange={handleInputChange}
                            />
                            <div className="form-error"></div>
                        </div>
                        <div>
                            <FormInput
                                {...formData.password}
                                className="form-controls"
                                onTurnDirty={handleTurnDirty}
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