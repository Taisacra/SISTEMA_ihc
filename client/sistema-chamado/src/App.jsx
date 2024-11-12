import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Axios from "axios";
import FormularioUsuario  from './Fomulariousuario';

function App() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(()=>{
    const fetchUsuarios = async () => {
      try {
        const response = await Axios.get('http://localhost:3600/usuario');
        console.log("Dados no App: ", response.data.usuarios);
        setUsuarios(response.data.usuarios);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error)
      }
    };

    fetchUsuarios();
  }, []);
  console.log(usuarios);

  return (
    <>
      <div>

      <FormularioUsuario usuarios={usuarios} setUsuarios={setUsuarios} />
      </div>
      <div>
      <h1>Abertura de chamado</h1>
      
      </div>
     
    </>
  )
}

export default App
