import './styles.css'
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FormInput from '../../../components/FormInput';
import * as forms from '../../../utils/forms'
import * as productService from '../../../services/product-service'


export default function ProductForm() {

    const params = useParams();

    const isEditing = params.productId !== 'create';

    const [formData, setFormData] = useState<any>({
        name: {
            value: "",
            id: "name",
            name: "name",
            type: "text",
            placeholder: "Nome",
        },
        price: {
            value: "",
            id: "price",
            name: "price",
            type: "number",
            placeholder: "Preço",
        },
        imgUrl: {
            value: "",
            id: "imgUrl",
            name: "imgUrl",
            type: "text",
            placeholder: "Imagem",
        }
    });

    useEffect(() => {
        if (isEditing){
            productService.findById(Number(params.productId))
                .then(response => {
                    setFormData(forms.updateAll(formData, response.data));
                })
        }
    }, [])

    function handleInputChange(event: any) {
            const value = event.target.value;
            const name = event.target.name;
            setFormData(forms.update(formData, name, value))
        }

    return (
        <section id="product-form-section" className="container">
            <div className="product-form-container">
                <form className="card form">
                    <h2 className="mb10">Dados do produto</h2>
                    <div className="form-controls-container">
                        <div>
                            <FormInput
                                {...formData.name}
                                className="form-controls"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <FormInput
                                {...formData.price}
                                className="form-controls"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <FormInput
                                {...formData.imgUrl}
                                className="form-controls"
                                onChange={handleInputChange}
                            />
                        </div>

                    </div>
                    <div className="product-form-buttons">
                        <Link to="/admin/products">
                            <button type="reset" className="btn btn-white">Cancelar</button>
                        </Link>

                        <button type="submit" className="btn btn-blue">Salvar</button>
                    </div>

                </form>

            </div>


        </section>
    );
}