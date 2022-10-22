import {API} from '../config';

export const getFlores = () =>{
    return fetch(
        `${API}/flores/flores`,
        {
            method: 'GET'
        }
    )
    .then(response =>{
        console.log(response)
        return response.json()
    })
    .catch(err=> console.log(err));
}

export const read = (floresId) =>{
    return fetch(`${API}/flores/${floresId}`,{
        method: 'GET'
    }).then(response =>{
        return response.json()
    }).catch(err => console.log(err))
}

export const signin = user =>{
    return fetch(`${API}/auth/signin`,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>{
        console.log(err);
    })
};

export const Authenticate = (data, next) =>{
    if(typeof window !== 'undefined'){
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
}

export const isAuthenticated = () =>{
    if(typeof window == 'undefined'){
        return false;
    }
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'));
        //localStorage.getItem('jwt')
    }
    else{
        return false;
    }
}

export const signout = (next) =>{
    if(typeof window !== 'undefined'){
        localStorage.removeItem('jwt');
        next();
        return fetch(`${API}/auth/signout`, {
            method: 'GET',
        })
        .then(response =>{
            console.log('signout', response);
        })
        .catch(err =>console.log(err));
    }
}

export const signup = user =>{
    return fetch(`${API}/auth/signup`,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)//convertir el objeto usuario a json
    })
    .then(response=>{
        return response.json();
    })
    .catch(err =>{
        console.log(err);
    })
}

export const createCategory = (userId, token, category) =>{
    return fetch(`${API}/category/create/${userId}`,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(response =>{
        return response.json()
    })
    .catch(err =>{
        console.log(err)
    })
}

export const getCategories = () =>{
    return fetch(`${API}/category/categories`,{
        method: 'GET'
    })
    .then(response =>{
        console.log(response)
        return response.json()
    })
    .catch(err =>{
        console.log(err)
    })
}

export const createFlores = (userId, token, flores) =>{
    return fetch(`${API}/flores/create/`,{
        method: 'POST',
        headers:{
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: flores
    })
    .then(response =>{
        console.log('response del createflores', response)
        return response.json()
    })
    .catch(err =>{
        console.log(err)
    })
}