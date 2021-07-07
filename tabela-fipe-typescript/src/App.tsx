import React, { useState, useEffect } from 'react';
import './css/Global.css';
import Select from './components/Select';
import Display from './components/Display';
import logo from './images/logo.png';
import axios from 'axios'; //Chamando o axios
import {responseData} from './components/Select'; //importando as tipagens usadas nos selects
import {displayProps} from './components/Display' //importando as tipagens usadas no display


function App() {
    //Selecionar o tipo de veículo para a primeira requisição
    const vehicle = [{ "nome": "Carros", "codigo": "carros" }, { "nome": "Motos", "codigo": "motos" }, { "nome": "Caminhões", "codigo": "caminhoes" }];
    const [veiculo, setVeiculo] = useState("");
    
    //funcções para pegar os valores do select ou limpá-los
    function handleChangeTipo(tipo:string) {
      setVeiculo(tipo);
      setSecondData([]);
      setThirdData([]);
      setLastData({} as displayProps);
    }
    function handleChangeMarca(tipo:string) {
      setMarca(tipo);
      setThirdData([]);
      setLastData({} as displayProps);
    }
    function handleChangeModelo(tipo:string) {
      setModelo(tipo);
      setLastData({} as displayProps);
    }
  
    //Primeira requisição de marcas de acordo com o tipo de veículo escolhido
    const [firstdata, setFirstData] = useState<responseData[]>([]);
    const [marca, setMarca] = useState("");
    useEffect(() => {
      veiculo && axios.get(`https://parallelum.com.br/fipe/api/v1/${veiculo}/marcas`)
        .then(res => setFirstData(res.data))
        .catch(error => console.log(error))
    }, [veiculo]) //Essa requisição de marcas acontecerá cada vez que o tipo de veículo for alterado
  
    //Segunda requisição de modelos de acordo com a marca escolhida
    const [seconddata, setSecondData] = useState<responseData[]>([]);
    const [modelo, setModelo] = useState("");
    useEffect(() => {
      if (veiculo && marca) {
        axios.get(`https://parallelum.com.br/fipe/api/v1/${veiculo}/marcas/${marca}/modelos`)
          .then(res => setSecondData(res.data.modelos))
          .catch(error => console.log(error))
      }
    }, [veiculo, marca])//Essa requisição de modelos acontecerá cada vez que a marca for alterada
  
    //Terceira requisição de anos de acordo com o modelo escolhido
    const [thirddata, setThirdData] = useState<responseData[]>([]);
    const [ano, setAno] = useState("");
    useEffect(() => {
      if (veiculo && marca && modelo) {
        axios.get(`https://parallelum.com.br/fipe/api/v1/${veiculo}/marcas/${marca}/modelos/${modelo}/anos`)
          .then(res => setThirdData(res.data))
          .catch(error => console.log(error))
      }
    }, [veiculo, marca, modelo])//Essa requisição de anos acontecerá cada vez que o modelo for alterado
  
    //Essa última requisição apresenta os valores finais    
    const [lastdata, setLastData] = useState<displayProps>(
      {
        Valor: "",
        Marca: "",
        Modelo: "",
        AnoModelo: "",
        Combustivel: "",
        CodigoFipe: "",
        MesReferencia: "",
        TipoVeiculo: "",
        SiglaCombustivel: ""
    });
  
    useEffect(() => {
      if (veiculo && marca && modelo && ano) {
        axios.get(`https://parallelum.com.br/fipe/api/v1/${veiculo}/marcas/${marca}/modelos/${modelo}/anos/${ano}`)
          .then(res => setLastData(res.data))
          .catch(error => console.log(error))
      }
    }, [veiculo, marca, modelo, ano])
  return (
    <>
    <header>
      <img src={logo} />
      <h1>Consulta - Tabela Fipe</h1>
    </header>
    <div className="grid">
      <div className="gridSelects">
        <Select type={handleChangeTipo} find={vehicle} title="Selecione o tipo de veículo:" value={veiculo} place="Tipo de Veículo" />
        <Select type={handleChangeMarca} find={firstdata} title="Selecione a Marca:" value={marca} place="Marcas" />
        <Select type={handleChangeModelo} find={seconddata} title="Selecione o Modelo:" value={modelo} place="Modelos" />
        <Select type={setAno} find={thirddata} title="Selecione o Ano do Modelo:" value={ano} place="Anos" />
      </div>
      <Display find={lastdata} />
    </div>
  </>
  );
}

export default App;
