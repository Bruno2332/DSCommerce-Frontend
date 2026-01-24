import './styles.css'

export default function(){

    return(

        <section id="login-section" className="container">
            <div className="login-form-container">
                <form className="card form">
                    <h2 className="mb10">Login</h2>
                    <div className="form-controls-container">
                        <div>
                            <input className="form-controls" type="text" placeholder="Email" />
                            <div className="form-error"></div>
                        </div>
                        <div>
                            <input className="form-controls" type="password" placeholder="Senha" />  
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