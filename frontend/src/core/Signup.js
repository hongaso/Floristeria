import React, {useState} from 'react';
import Navigation from './Navigation';
import { signup } from './apiCore';
import { Link } from 'react-router-dom';

import './Signup.css';

const Signup = () => {

    const [values, setValues] = useState({
        nombre: '',
        email: '',
        contrasenia:'',
        error:'',
        succes: false
    })

    const {nombre, email, contrasenia, succes, error} = values;

    const handleChange = name => event =>{
        setValues({...values, error: false, [name]: event.target.value})
    }

    const clickSubmit = event =>{
        event.preventDefault()
        setValues({...values, error: false})
        signup({nombre, email, contrasenia}).then(data =>{
            if(data.error){
                setValues({...values, error: data.error, succes: false});
            }
            else{
                setValues({
                    ...values,
                    nombre:'',
                    email:'',
                    contrasenia:'',
                    error:'',
                    succes:true
                })
            }
        })
    } 

    const signUpForm = () =>(
        <form className='sign-box'>
            <div className='form-group'>
                <label className='text-muted'>
                    Nombre
                </label>
                <input 
                    onChange={handleChange('nombre')}
                    type='text'
                    value={nombre}
                    className='form-control'
                />
            </div>
            <div className='form-group'>
                <label className='text-muted'>Email</label>
                <input
                    onChange={handleChange('email')}
                    type='email'
                    value={email}
                    className='form-control'
                />
            </div>
            <div className='form-group'>
                <label className='text-muted'>Contraseña</label>
                <input
                    onChange={handleChange('contrasenia')}
                    type='password'
                    value={contrasenia}
                    className='form-control'
                />
            </div>
            <button onClick={clickSubmit} className='btn btn-primary'>
                Sign Up
            </button>
        </form>
    )

    const showError = () =>(
        <div className='alert alert-danger' style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    const showSucces =() =>(
        <div className='alert alert-info' style={{display: succes ? '': 'none'}}>
            Nueva cuenta creada de manera exitosa
            <Link to='/signin'> Sign in</Link>
        </div>
    )

    return (
        <div>
            <Navigation/>
            <div className='mt-5'>
                <h4 className='text-center mb-5'>Sign Up Form</h4>
                {signUpForm()} 
                {showError()}
                {showSucces()}
            </div>
        </div>
    )
}

export default Signup;