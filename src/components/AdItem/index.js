import React from 'react';
import { Link } from 'react-router-dom';

import { Item } from './styles'

const AdItem = ({ data }) => {

    const convertPrice = (value) => {
        if (data.priceNegotiable) {
            return 'Preço Negociável'
        } else {
            return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        }
    }

    let price = convertPrice(data.price)


    return (
        <Item className='itemAd'>
            <Link to={`/ad/${data.id}`}>
                <div className='itemImage'>
                    <img src={data.image} alt='' />
                </div>
                <div className='itemName'>{data.title}</div>
                <div className='itemPrice'>{price}</div>
            </Link>
        </Item>
    );
}

export default AdItem