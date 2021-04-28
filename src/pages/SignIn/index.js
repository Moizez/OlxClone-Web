import React, { useState } from 'react'

import api from '../../services/api'
import { doSignIn } from '../../services/auth'

import { Container, Title, ErrorMessage } from '../../components/MainStyles'
import { Area } from './styles'

const SignIn = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberPassword, setRememberPassword] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault() // Para que o formulário não seja enviado sem querer
        setDisabled(true)

        const response = await api.signIn(email, password)

        if (response.error) {
            setError(response.error)
        } else {
            doSignIn(response.token, rememberPassword) // Salvar o token no cookie
            window.location.href = '/'
        }

        setDisabled(false)
    }

    return (
        <Container>
            <Title>SignIn</Title>
            <Area>
                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }
                <form onSubmit={handleSubmit}>
                    <label className='area'>
                        <div className='area--title'>E-mail</div>
                        <div className='area--input'>
                            <input
                                type='email'
                                placeholder='Digite seu e-mail'
                                disabled={disabled}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </label>

                    <label className='area'>
                        <div className='area--title'>Senha</div>
                        <div className='area--input'>
                            <input
                                type='password'
                                placeholder='Digite sua senha'
                                disabled={disabled}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </label>

                    <label className='area'>
                        <div className='area--title'>Lembrar senha</div>
                        <div className='area--input'>
                            <input
                                type='checkbox'
                                disabled={disabled}
                                checked={rememberPassword}
                                onChange={() => setRememberPassword(!rememberPassword)}
                            />
                        </div>
                    </label>

                    <label className='area'>
                        <div className='area--title'></div>
                        <div className='area--input'>
                            <button disabled={disabled}>Entrar</button>
                        </div>
                    </label>
                </form>
            </Area>
        </Container>
    );
}

export default SignIn