import '../css/Select.css';

export interface responseData { //tipagem da resposta de requisição utilizada no map
    nome: string;
    codigo: string;
}

interface selectProps { //tipagem das props do select
    place: string;
    title: string;
    value: string;
    find: Array<responseData>;
    type: (e:string) => void;
}

//Componente de função para o formulário
export default function Select({type, find, title, value, place}:selectProps){
    return(
        <div className="select">
            <label htmlFor="valor">{title}</label>
            <select onChange={e =>type(e.target.value)} value={value}>
            <option value="" disabled hidden>{place}</option>
            {find?.map((item, index) =>(
                <option key={index} value={item.codigo}>{item.nome}</option>
            ))}
            </select>
        </div>
    );
}