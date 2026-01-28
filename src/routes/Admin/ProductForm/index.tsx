import './styles.css'
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FormInput from '../../../components/FormInput';
import * as forms from '../../../utils/forms'
import * as productService from '../../../services/product-service'
import * as categoryService from '../../../services/category-service'
import FormTextArea from '../../../components/FormTextArea';
import type { CategoryDTO } from '../../../models/category';
import FormSelect from '../../../components/FormSelect';


export default function ProductForm() {

    const params = useParams();

    const isEditing = params.productId !== 'create';

    const [categories, setCategories] = useState<CategoryDTO[]>([]);

    const [formData, setFormData] = useState<any>({
        name: {
            value: "",
            id: "name",
            name: "name",
            type: "text",
            placeholder: "Nome",
            validation: function (value: string) {
                return value.length >= 3 && value.length <= 80;
            },
            message: "Favor informar um nome de 3 a 80 caracteres"
        },
        price: {
            value: "",
            id: "price",
            name: "price",
            type: "number",
            placeholder: "Preço",
            validation: function (value: any) {
                return Number(value) > 0;
            },
            message: "Favor informar um valor positivo"

        },
        imgUrl: {
            value: "",
            id: "imgUrl",
            name: "imgUrl",
            type: "text",
            placeholder: "Imagem",
        },
        description: {
            value: "",
            id: "description",
            name: "description",
            type: "text",
            placeholder: "Descrição",
            validation: function (value: string) {
                return /^.{10,}$/.test(value);
            },
            message: "A descrição deve ter no mínimo 10 caracteres"
        },
        categories: {
            value: [],
            id: "categories",
            name: "categories",
            placeholder: "Categorias",
            validation: function(value: CategoryDTO[]) {
                return value.length > 0;
            },
            message: "Deve ter ao menos uma categoria"
        }
    });

    useEffect(() => {
        categoryService.findAllRequest()
            .then(response => {
                setCategories(response.data);
            })
    }, [])

    useEffect(() => {
        if (isEditing) {
            productService.findById(Number(params.productId))
                .then(response => {
                    setFormData(forms.updateAll(formData, response.data));
                })
        }
    }, [])

    function handleInputChange(event: any) {
        const result = forms.updateAndValidate(formData, event.target.name, event.target.value);
        setFormData(result);
    }

    function handleTurnDirty(name: string) {
        const newFormData = forms.dirtyAndValidate(formData, name);
        setFormData(newFormData);
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
                                onTurnDirty={handleTurnDirty}
                                onChange={handleInputChange}
                            />
                            <div className='form-error'>{formData.name.message}</div>
                        </div>
                        <div>
                            <FormInput
                                {...formData.price}
                                className="form-controls"
                                onTurnDirty={handleTurnDirty}
                                onChange={handleInputChange}
                            />
                            <div className='form-error'>{formData.price.message}</div>
                        </div>
                        <div>
                            <FormInput
                                {...formData.imgUrl}
                                className="form-controls"
                                onTurnDirty={handleTurnDirty}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <FormSelect
                                { ...formData.categories }
                                className="form-controls"
                                options={categories}
                                onChange={(obj: any) => {
                                    const newFormData = forms.updateAndValidate(formData, "categories", obj);
                                    setFormData(newFormData);
                                }}
                                onTurnDirty={handleTurnDirty}
                                isMulti
                                getOptionLabel={(obj: any) => obj.name}
                                getOptionValue={(obj: any) => String(obj.id)}
                            />
                            <div className='form-error'>{formData.categories.message}</div>
                        </div>

                        <div>
                            <FormTextArea
                                {...formData.description}
                                className="form-controls textarea"
                                onTurnDirty={handleTurnDirty}
                                onChange={handleInputChange}
                            />
                            <div className='form-error'>{formData.description.message}</div>
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