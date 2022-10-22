import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import Card from './Card';
import {getFlores} from './apiCore'; 

const Home = () =>{

    const [flor, setFlores] = useState([]);
    const [error, setError] = useState(false);

    const loadFlores = () =>{
        getFlores().then(data =>{
            if(data.error){
                setError(data.error);
            }else{
                setFlores(data);
                console.log(data);
            }
            
        })
    }
    useEffect(() =>{
        loadFlores();
    }, [])
    return(
        <div>
            <Navigation/>
            <div className='container'>
                <div className='row'>
                    {flor.map((flores, i) =>(
                        <div key={i} className='col-lg-4 col-md-6 col-sm-6'>
                            <Card flores = {flores}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Home;