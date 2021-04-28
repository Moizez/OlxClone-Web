import React from 'react'
import { Link } from 'react-router-dom'

import { Area } from './styles'

const Header = () => {
    return (
        <Area>
            <div className='container'>
                <div className='logo'>
                    <Link to='/'>
                        <span className='logo-1'>O</span>
                        <span className='logo-2'>L</span>
                        <span className='logo-3'>X</span>                       
                    </Link>
                </div>
            </div>

        </Area>
    );
}

export default Header