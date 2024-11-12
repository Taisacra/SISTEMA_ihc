import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function FormularioUsuario({usuarios, setUsuarios}){
    const [formData, setFormData] = useState({
        id: '99999',
        nome: '',
        email: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleIncluir = () => {
        Axios.post("http://localhost:3600/usuario/editar", {
          nome: formData.nome,
          email: formData.email,
          action: "incluir",
        })
        .then((response) => {
          setUsuarios([...usuarios, response.data]);
          setFormData({
            id: '',
            nome: '',
            email: ''
          });
        })
        .catch((error) => {
          console.error("Erro ao incluir Usuário:", error);
        });
      };


      const handleAtualizar = () => {
        Axios.post("http://localhost:3600/usuario/editar", {
          id: formData.id,
          nome: formData.nome,
          email: formData.email,
          action: "alterar",
        })
        .then((response) => {
          setUsuarios(usuarios.map((usuario) =>
            usuario.id === response.data.id ? response.data : usuario
          ));
          setFormData({
            id: '',
            nome: '',
            email: ''
          });
        })
        .catch((error) => {
          console.error("Erro ao atualizar usuario:", error);
        });
      };

      const handleCarregar = (usuario) => {
        setFormData({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        });
      };

      const handleExcluir = (id) => {
        Axios.post(`http://localhost:3600/usuario/excluir/${id}`)
          .then(() => {
            // Remove a disciplina excluída da lista de disciplinas no estado
            console.log(id);
            setUsuarios(usuarios.filter(usuario => usuario.id !== id));
          })
          .catch((error) => {
            console.error("Erro ao excluir usuario:", error);
          });
      };

    return(
        <div>
            <h2>Cadastro de Usuário</h2>
            <form>
                <div>
                    <label>Nome: </label>
                    <input type="text" name="nome" value={formData.nome || ''} onChange={handleChange} />
                </div>
                <div>
                    <label>E-mail: </label>
                    <input type="text" name="email" value={formData.email || ''} onChange={handleChange} />
                </div>
                <br />
                <button type="button" onClick={handleIncluir}>Incluir</button>
                <button type="button" onClick={handleAtualizar}>Atualizar</button>
            </form>
            <h3>Relação de Usuárias</h3>
            <table border="1" cellPadding="5" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario, index)=> (
                        <tr key={index}>
                            <td>{usuario.nome}</td>
                            <td>{usuario.email}</td>
                            <td>
                                <button type="button" onClick={() => handleExcluir(usuario.id)}>Excluir</button>
                                <button button type="button" onClick={() => handleCarregar(usuario)}>Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FormularioUsuario;