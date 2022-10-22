import React from 'react';
import {API} from '../config';
import './ShowImage.css';

const ShowImage = ({item, url}) => {
    return(
        <div className='product-img'>
            <img  src={`${API}/${url}/foto/${item._id}`}
            alt={item.name}
            className='mb-3 img-cont'
            style={{maxHeight: '600px', maxWidth: '300px'}}
            />
        </div>
        
    )
}

export default ShowImage;