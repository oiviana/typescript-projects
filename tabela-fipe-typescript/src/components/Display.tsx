import '../css/Display.css';

export interface displayProps{ //tipagens do objeto usado no display

    Marca: string;
    Modelo: string;
    AnoModelo: string;
    Valor: string;
    Combustivel: string;
    SiglaCombustivel: string;
    CodigoFipe: string;
    MesReferencia: string;
    TipoVeiculo: string;
  
}

//Componente de função para o display
export default function Display({find}:{find:displayProps}){
    return(
        <div className="display">
          <h1>Resultados da Busca</h1>
          <div className="results">
            <div className="group-result">
              <span>Marca:</span>
              <div>{find?.Marca}</div>
            </div>
            <div className="group-result">
              <span>Modelo:</span>
              <div>{find?.Modelo}</div>
            </div>
            <div className="group-result">
              <span>Ano do Modelo:</span>
              <div>{find?.AnoModelo}</div>
            </div>
            <div className="group-result">
              <span>Valor:</span>
              <div>{find?.Valor}</div>
            </div>
            <div className="group-result">
              <span>Tipo de Combustível:</span>
              <div>{find?.Combustivel}</div>
            </div>
            <div className="group-result">
              <span>Sigla do Combustível:</span>
              <div>{find?.SiglaCombustivel}</div>
            </div>
            <div className="group-result">
              <span>Código Fipe:</span>
              <div>{find?.CodigoFipe}</div>
            </div>
            <div className="group-result">
              <span>Mês de Referência:</span>
              <div>{find?.MesReferencia}</div>
            </div>
            <div className="group-result">
              <span>Tipo de Veículo:</span>
              <div>{find?.TipoVeiculo}</div>
            </div>
          </div>
         
        </div>
   
    );
}