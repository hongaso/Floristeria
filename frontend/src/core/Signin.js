import React, {useState, useEffect} from 'react';
import Navigation from './Navigation';
import {signin, Authenticate, isAuthenticated} from './apiCore';
import {Navigate} from 'react-router-dom';
import './Signin.css';

const Signin = () => {

    const [values, setValues] = useState({
        email: '',
        contrasenia: '',
        error: '',
        loading: false,
        redirecToReferrer: false
    })

    const {email, contrasenia, loading, error, redirecToReferrer} = values;
    const {user} = isAuthenticated();

    const handleChange = name => event =>{
        setValues({...values, error: false, [name]: event.target.value});
    }

    const clickSubmit = event =>{
        event.preventDefault()
        setValues({...values, error: false, loading: true});
        signin({email, contrasenia})
        .then(data =>{
            if(data.error){
                setValues({...values, error: data.error, loading: false});
            }
            else{
                Authenticate(
                    data, () =>{
                        setValues({
                            ...values, redirecToReferrer: true
                        })
                    }
                )
            }
        })
    }

    const signInForm = () => (
        <form className='sign-box'>
            <div className='form-group'>
                <label className='text-muted'>Email</label>
                <input
                onChange={handleChange('email')}
                    type='email'
                    className='form-control'
                    value={email}
                />
            </div>
            <div className='form-group'>
                <label className='text-muted'>Contraseña</label>
                <input
                    onChange={handleChange('contrasenia')}
                    type='password'
                    className='form-control'
                    value={contrasenia}
                />
            </div>
            <button onClick={clickSubmit} className='s-btn btn btn-primary'>
                Sign In
            </button>
        </form>
    )

    const redirectUser = () =>{
        if(redirecToReferrer){
            if(user && user.rol === 1){
                return <Navigate to = '/admin/dashboard'/>
            }
            else{
                return <Navigate to = '/'/>
            }
        }
        if(isAuthenticated()){
            return <Navigate to='/'/>
        }
    }

    const showError = () =>(
        <div className='alert alert-danger' style={{display: error ? '': 'none'}}>
            {error}
        </div>
    )

    const showLoading = () => (
        loading && (
            <div className='alert alert-info'>
                <h2>Loading...</h2>
            </div>
        )
    )

    return (
        <div>
            <Navigation />
            <div className='mt-5'>
                <h4 className='text-center mb-5'>Log In</h4>
                {showError()}
                {showLoading()}
                {signInForm()}
                {redirectUser()}
            </div>
        </div>
    )
}

export default Signin;