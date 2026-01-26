import './styles.css'


export default function ProductForm() {

    return (
        <section id="product-form-section" className="container">
            <div className="product-form-container">
                <form className="card form">
                    <h2 className="mb10">Dados do produto</h2>
                    <div className="form-controls-container">
                        <div>
                            <input className="form-controls" type="text" placeholder="Nome" />
                        </div>
                        <div>
                            <input className="form-controls" type="text" placeholder="Preço" />
                        </div>
                        <div>
                            <input className="form-controls" type="text" placeholder="Imagem" />
                        </div>
                        <div>
                            <select className="form-controls select" required>
                                <option value="" disabled selected>Categorias</option>
                                <option value="1">Valor 1</option>
                                <option value="1">Valor 2</option>
                            </select>
                        </div>
                        <div>
                            <textarea className="form-controls textarea" placeholder="Descrição"></textarea>
                        </div>

                    </div>
                    <div className="product-form-buttons">
                        <button type="reset" className="btn btn-white">Cancelar</button>
                        <button type="submit" className="btn btn-blue">Salvar</button>
                    </div>

                </form>

            </div>


        </section>
    );
}