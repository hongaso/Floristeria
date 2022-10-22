import React, { useState } from 'react';
import './Card.css';
import ShowImage from './ShowImage';
import {Link} from 'react-router-dom';

const Card = ({ flores }) => {
    
    return (
        <div className='card m-10 card-cont'>
            <div>
                <ShowImage className='img' item={flores} url='flores' />
                <h2>{flores.nombre}</h2>
                <p>${flores.precio}</p>
                <p>{flores.descripcion}</p>
                <Link to={`/flores/${flores._id}`}>
                    <button className='btn btn-success'>Ver mas</button>
                </Link>

            </div>
        </div>
    )
}

export default Card;