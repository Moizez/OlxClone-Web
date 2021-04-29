import React from 'react'
import { Link } from 'react-router-dom'

import olxLogo from '../../assets/images/olx-logo.png'
import { Area } from './styles'

import { isLogged, doLogout } from '../../services/auth'

const Header = () => {

    const logged = isLogged()

    const handleLogout = () => {
        doLogout()
        window.location.href = '/'
    }

    return (
        <Area>
            <div className='container'>
                <div className='logo'>
                    <Link to='/'>
                        <img className='logo-olx' src={olxLogo} alt='logo olx' />
                    </Link>
                </div>

                <nav>
                    <ul>
                        {logged
                            ? <>
                                <li>
                                    <Link to='/my-account'>Minha Conta</Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout}>Sair</button>
                                </li>
                                <li>
                                    <Link to='/post-an-add' className='button' >Crie um anúncio</Link>
                                </li>
                            </>
                            : <>
                                <li>
                                    <Link to='/signin'>Login</Link>
                                </li>
                                <li>
                                    <Link to='/signup'>Cadastrar</Link>
                                </li>
                                <li>
                                    <Link to='/signin' className='button' >Crie um anúncio</Link>
                                </li>
                            </>
                        }
                    </ul>
                </nav>
            </div>

        </Area>
    );
}

export default Header