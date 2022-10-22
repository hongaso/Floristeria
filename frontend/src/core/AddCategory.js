import React, { useState } from 'react';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';
import { isAuthenticated, createCategory } from './apiCore';

const AddCategory = () => {

    const [nombre, setNombre] = useState('');
    const [error, setError] = useState(false);
    const [succes, setSucces] = useState(false);

    const { user, token } = isAuthenticated();

    const handleChange = (event) => {
        setError('');
        setNombre(event.target.value);
    }

    const clickSubmit = event => {
        event.preventDefault();
        setError('');
        setSucces(false);
        //se llama a la api
        createCategory(user._id, token, { nombre })
            .then(data => {
                if (data.error) {
                    setError(true)
                }
                else {
                    setError('');
                    setSucces(true);
                }
            })
    }

    const showSucces = () => {
        if (succes) {
            return <h3 className='text-success'>La categoria {nombre} fue creada con exito </h3>
        }
    }

    const showError = () => {
        if (error) {
            return <h3 className='text-danger'>{nombre} Debe de ser unico, intente con otro</h3>
        }
    }

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className='form-group'>
                <label className='text-muted'>Nombre</label>
                <input type='text' className='form-control'
                    onChange={handleChange} value={nombre} required autoFocus />
            </div>
            <button className='btn btn-outline-success'>
                Crear Categoria
            </button>
        </form>
    )

    const goBack = () => (
        <div className='mt-5'>
            <Link to={'/'} className='text-warning'>
                Regresar a inicio
            </Link>
        </div>
    )

    return (
        <>
            <Navigation />
            <div className='mt-5 container'>
                {showSucces()}
                {showError()}
                {newCategoryForm()}
                {goBack()}
            </div>
        </>
    )
}

export default AddCategory;