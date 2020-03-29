import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import { useState } from 'react';

function NewIcident() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')

    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNewIncident(e) {
        e.preventDefault();
        const data = {
            title
            , description
            , value
        };
        try {
            const response = await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            });

            alert(`Caso salvo com sucesso ID= ${response.data.id}`);

            history.push('/profile');
        } catch (err) {
            alert('Erro ao salvar novo caso, tente novamente');
        }
    }

    return <div className="new-incident-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="Be the hero" />
                <h1> Cadastrar novo caso</h1>
                <p>Descreva o caso detalhadamente para encontrar um heroi para resolver isso</p>

                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color={"E02041"} />
                Voltar para home
            </Link>
            </section>
            <form onSubmit={handleNewIncident}>
                <input
                    placeholder="Título do caso"
                    value={title}
                    onChange={e => setTitle(e.target.value)} />
                <textarea
                    type="email"
                    placeholder="Descrição"
                    value={description}
                    onChange={e => setDescription(e.target.value)} />
                <input
                    type="number"
                    placeholder="valor em reais"
                    value={value}
                    onChange={e => setValue(e.target.value)} />

                <button className="button" type="submit"> Cadastrar</button>
            </form>
        </div>
    </div>
}

export default NewIcident;