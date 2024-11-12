import React, { useState, useEffect } from 'react';
import Axios from 'axios';
function FormularioChamado({chamados, setChamados}) {
   const [formData, setFormData] = useState({
       id: '9999',
       id_usuario: '',
       descricao: '',
       setor: '',
       prioridade: '',
       status: ''
   })
   
   const handleChange = (e) => {
       const { name, value } = e.target;
       setFormData({ ...formData, [name]: value});
   };
   const handleIncluir = () => {
       Axios.post("http://localhost:3600/chamado/editar",{
        id_usuario: formData.nome,
        descricao: formData.descricao,
        setor: formData.setor,
        prioridade: formData.prioridade,
        status: formData.status,
        action: "incluir",
       })
       .then((response) => {
        setChamados([...chamados, response.data]);
        setFormData({
            id: '',
            id_usuario: '',
            descricao: '',
            setor: '',
            prioridade: '',
            status: ''
        });
       })
       .catch((error) => {
            console.error("Erro ao incluir Chamado: " ,error);
       });
   };
   const handleAtualizar = () => {
       Axios.post("http://localhost:3600/chamado/editar", {
           id: formData.id,
           id_usuario: formData.nome,
           descricao: formData.descricao,
           prioridade: formData.prioridade,
           status: formData.status,
           action: "alterar",
       })
       .then((response)=>{
           setChamados(chamados.map((chamado)=>
            chamado.id === response.data.id ? response.data : chamado
           ));
           setFormData({
               id: '',
               id_usuario: '',
               descricao: '',
               setor: '',
               prioridade: '',
               atatus: ''
           });
       })
       .catch((error) => {
        console.error("Erro ao atualizar chamado: ", error);
       });
   };

   const handleCarregar = (chamado) => {
       setFormData({
           id: chamado.id,
           id_usuario: chamado.name,
           descricao: chamado.descricao,
           prioridade: chamado.prioridade,
           status: chamado.status
       });
   };


   const handleExcluir = (id) => {
       Axios.post(`http://localhost:3600/chamado/excluir/${id}`)
       .the(() => {
           console.log(id);
           setChamados(chamados.filter(chamado => chamado.id !== id));
       })
       .catch((error) => {
           console.error("Erro ao excluir chamado: ", error)
       });
   };

return(
    <div>
        <h2>Abertura de chamado </h2>
        <form>
            <div>
                <label >Nome: </label>
                <input type="text" name= "nome"  value={formData.nome || ''} onChange={handleChange} />
            </div>
            <div>
                <label >Setor: </label>
                <input type="text" name= "setor"  value={formData.setor|| ''} onChange={handleChange} />
            </div>
            <div>
                <label >Descrição: </label>
                <input type="text" name= "descricao"  value={formData.descricao || ''} onChange={handleChange} />
            </div>
            <div>
                <label >Prioridade: </label>
                <input type="text" placeholder='baixa, media, alta' name= "prioridade"  value={formData.prioridade || ''} onChange={handleChange} />
            </div>
            <div>
                <label >Status: </label>
                <input type="text" placeholder='a fazer, em andamento, concluida' name= "status"  value={formData.status || ''} onChange={handleChange} />
            </div>
            <br />
            <button type="button" onClick={handleIncluir}>Incluir</button>
            <button type="button" onClick={handleAtualizar}>Atualizar</button>
        </form>
        <h3>Relação de Chamados</h3>
        <table border="1" cellPadding="5" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Setor</th>
                        <th>Descrição</th>
                        <th>Prioridade</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {chamados.map((chamado, index)=> (
                        <tr key={index}>
                            <td>{chamado.usuario?.nome || 'N/A'}</td>
                            <td>{chamado.setor}</td>
                            <td>{chamado.descricao}</td>
                            <td>{chamado.prioridade}</td>
                            <td>{chamado.status}</td>
                            <td>
                                <button type="button" onClick={() => handleExcluir(chamado.id)}>Excluir</button>
                                <button button type="button" onClick={() => handleCarregar(chamado)}>Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
);



}

export default FormularioChamado;