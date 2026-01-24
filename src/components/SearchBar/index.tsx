import './styles.css'
import lupa from '../../assets/lupa-icon.svg'
import { useState } from 'react';

type Props = {
    onSearch: Function;
}

export default function SearchBar({ onSearch } : Props) {

    const [text, setText] = useState("")

    function handleChange(event: any){
        setText(event.target.value);
    }

    function handleSubmit(event: any){
        event.preventDefault();
        onSearch(text);
    }

    function handleResetClick(){
        setText("");
        onSearch(text);
    }

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <button type="submit"><img src={lupa} alt="Pesquisar" /></button>
            <input
                value={text} 
                type="text" 
                placeholder="Nome do produto"
                onChange={handleChange} 
            />
            <button onClick={handleResetClick}>x</button>
        </form>
    )
}