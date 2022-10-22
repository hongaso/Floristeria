import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { read } from './apiCore';
import Card from './Card';
import Navigation from './Navigation';

const Flores = () =>{

    const [flores, setFlores] = useState({});
    const [error, setError] = useState(false);
    const {floresId} = useParams();

    const loadSingleFlores = floresId =>{
        read(floresId).then(data =>{
            if(data.error){
                setError(data.error);
            }
            else{
                setFlores(data);
            }
        });
    }
    
    loadSingleFlores(floresId);
    
    return (
        
        <>
            <Navigation/>
            <div className='container'>
                <h2>
                    {
                        flores && 
                        <Card flores={flores}/> 
                    }
                </h2>     
            </div>
        </>
    )
}

export default Flores;