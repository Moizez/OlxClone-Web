import React, { useState, useEffect } from 'react'

import api from '../../services/api'
import { doSignIn } from '../../services/auth'

import { Container, Title, ErrorMessage } from '../../components/MainStyles'
import { Area } from './styles'

const SignUp = () => {

    const [name, setName] = useState('')
    const [uf, setUf] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState('')

    const [ufs, setUfs] = useState([])

    useEffect(() => {
        const getUfs = async () => {
            const list = await api.getUfs()
            setUfs(list)
        }
        getUfs()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault() // Para que o formulário não seja enviado sem querer
        setDisabled(true)
        setError('')

        if (password !== confirmPassword) {
            setError('Senhas não correspondem!')
            setDisabled(false)
            return
        }

        const response = await api.signUp(name, email, password, uf)

        if (response.error) {
            setError(response.error)
        } else {
            doSignIn(response.token) // Salvar o token no cookie
            window.location.href = '/'
        }

        setDisabled(false)
    }

    return (
        <Container>
            <Title>Cadastro</Title>
            <Area>
                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }
                <form onSubmit={handleSubmit}>

                    <label className='area'>
                        <div className='area--title'>Nome Completo</div>
                        <div className='area--input'>
                            <input
                                type='text'
                                placeholder='Digite seu nome'
                                disabled={disabled}
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </div>
                    </label>

                    <label className='area'>
                        <div className='area--title'>Estado</div>
                        <div className='area--input'>
                            <select
                                value={uf}
                                onChange={e => setUf(e.target.value)}
                                required
                            >
                                {ufs.map((i, k) =>
                                    <option key={k} value={i._id}>{i.name}</option>
                                )}
                            </select>
                        </div>
                    </label>

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
                        <div className='area--title'>Confirmar Senha</div>
                        <div className='area--input'>
                            <input
                                type='password'
                                placeholder='Confirme sua senha'
                                disabled={disabled}
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </label>

                    <label className='area'>
                        <div className='area--title'></div>
                        <div className='area--input'>
                            <button disabled={disabled}>Cadastrar</button>
                        </div>
                    </label>
                </form>
            </Area>
        </Container>
    );
}

export default SignUp