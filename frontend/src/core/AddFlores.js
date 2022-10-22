import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';
import { getCategories, isAuthenticated ,createFlores } from './apiCore';

const AddFlores = () => {

    const [values, setValues] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        categories: [],
        category: '',
        cantidad: '',
        foto: '',
        loading: false,
        error: '',
        createdFlores: '',
        redirectToProfile: false,
        formData: ''
      })
      const { user, token } = isAuthenticated()
      const {
        nombre,
        descripcion,
        precio,
        categories,
        category,
        cantidad,
        foto,
        loading,
        error,
        createdFlores,
        redirectToProfile,
        formData
      } = values;
    
      const init = () => {
        getCategories().then(data => {
          if (data.error) {
            setValues({...values, error: data.error})
          } else {
            console.log(data)
            setValues({...values, categories: data.data, formData: new FormData() })
            console.log('categories',categories)
          }
        })
      }
    
      useEffect(() => {
        setValues({...values, formData: new FormData()});
        init();
      }, []); 
    
      const handleChange = nombre => event => {
        const value = nombre === 'foto' ? event.target.files[0] : event.target.value
        formData.set(nombre, value)
        setValues({ ...values, [nombre]: value })
      }
    
      const showError = () => (
        <div
          className='alert alert-danger'
          style={{ display: error ? '' : 'none' }}
        >
          {error}
        </div>
      )
    
      const showSuccess = () => (
        <div
          className='alert alert-info'
          style={{ display: createdFlores ? '' : 'none' }}
        >
          <h2>{`${createdFlores} Se creo con exito`}</h2>
        </div>
      )
    
      const showLoading = () =>
        loading && (
          <div className='alert alert-success'>
            <h2>Loading ...</h2>
          </div>
        )
    
      const clickSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, error: '', loading: true })
        console.log('values ', values)
        createFlores(user._id, token, formData).then(data => {
          if (data.error) {
            setValues({ ...values, error: data.error })
          } else {
            setValues({
              ...values,
              nombre: '',
              descripcion: '',
              foto: '',
              precio: '',
              cantidad: '',
              loading: false,
              createdFlores: data.nombre
            })
          }
        })
      }
    
      const newFloresForm = () => (
        <form className='mb-3' onSubmit={clickSubmit}>
          <h4>Post foto</h4>
          <div className='form-group'>
            <label className='btn btn-secondary'>
              <input
                onChange={handleChange('foto')}
                type='file'
                name='foto'
                accept='image/*'
              />
            </label>
          </div>
          <div className='form-group'>
            <label className='text-muted'>Nombre</label>
            <input
              onChange={handleChange('nombre')}
              type='text'
              className='form-control'
              value={nombre}
            />
          </div>
          <div className='form-group'>
            <label className='text-muted'>Descripcion</label>
            <input
              onChange={handleChange('descripcion')}
              type='text'
              className='form-control'
              value={descripcion}
            />
          </div>
          <div className='form-group'>
            <label className='text-muted'>Precio</label>
            <input
              onChange={handleChange('precio')}
              type='number'
              className='form-control'
              value={precio}
            />
          </div>
          <div className='form-group'>
            <label className='text-muted'>Categoria</label>
            <select
              onChange={handleChange('category')}
              type='text'
              className='form-control'
            >
              <option>Select Categoria</option>
              {categories &&
                categories.map((c, i) => (
                  <option key={i} value={c._id}>
                    {c.nombre}
                  </option>
                ))}
            </select>
          </div>
          <div className='form-group'>
            <label className='text-muted'>Cantidad</label>
            <input
              onChange={handleChange('cantidad')}
              type='number'
              className='form-control'
              value={cantidad}
            />
          </div>
          <button className='btn btn-outline-primary'>Crear Producto</button>
        </form>
      )
    
      return (
        <>
          <Navigation/>
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <h2>Agregar Flores</h2>
                {showLoading()}
                {showSuccess()}
                {showError()}
                {newFloresForm()}
              </div>
            </div>
          </div>
        </>
      )
}

export default AddFlores;