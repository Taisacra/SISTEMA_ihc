import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Axios from "axios";
import FormularioUsuario  from './Fomulariousuario';
import FormularioChamado from './FormularioChamado';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [chamados, setChamados] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
        try {
            const response = await Axios.get('http://localhost:3600/usuario');
            console.log("Dados no App: ", response.data.usuarios);
            setUsuarios(response.data.usuarios); 
        } catch (error) {
            console.error('Erro ao buscar usuarios:', error);
        }
    };

    fetchUsuarios();  // Adicionado para chamar a função
  }, []); // Dependências vazias para chamar apenas uma vez na montagem
  console.log(usuarios);

  useEffect(() => {
    const fetchChamados = async () => {
      try {
        const response = await Axios.get('http://localhost:3600/chamado');
        console.log("Dados no App: ", response.data.chamados);
        setChamados(response.data.chamados);
      } catch (error) {
        console.error('Erro ao buscar chamados:', error);
      }
    };

    fetchChamados();
  }, []);





  return (
    <>
      <div>
      <FormularioUsuario usuarios={usuarios} setUsuarios={setUsuarios} />
      </div>
      <div>
      <FormularioChamado chamados={chamados} setChamados={setChamados} />
      </div>
     
    </>
  )
}

export default App
