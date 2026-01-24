import './styles.css'

type Props = {
    name : string
}

export default function Categories({ name } : Props){

    return (
        <>
           <div className="category-container">
                <div className="category">
                    {name}
                </div>
            </div>    
        </>
    );
}