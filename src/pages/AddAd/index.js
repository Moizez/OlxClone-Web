import React, { useState, useRef, useEffect } from 'react'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

import api from '../../services/api'

import { Container, Title, ErrorMessage } from '../../components/MainStyles'
import { Area } from './styles'

const AddAd = () => {

    const fileRef = useRef(null)

    const [title, setTitle] = useState('')
    const [caterogy, setCaterogy] = useState('')
    const [price, setPrice] = useState('')
    const [priceNegotiable, setPriceNegotiable] = useState(false)
    const [desc, setDesc] = useState('')
    const [caterogires, setCategories] = useState([])

    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories()
            setCategories(cats)
        }
        getCategories()
    }, [])

    /* const handleSubmit = async (e) => {
         e.preventDefault() // Para que o formulário não seja enviado sem querer
         setDisabled(true)
         setError('')
 
         const response = await api.signIn(email, password)
 
         if (response.error) {
             setError(response.error)
         } else {
             doSignIn(response.token, rememberPassword) // Salvar o token no cookie
             window.location.href = '/'
         }
 
         setDisabled(false)
     }*/

    const priceMask = createNumberMask({
        prefix: 'R$ ',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '.',
        allowDecimal: true,
        decimalSymbol: ','
    })

    return (
        <Container>
            <Title>Login</Title>
            <Area>
                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }
                <form onSubmit={() => { }}>

                    <label className='area'>
                        <div className='area--title'>Título</div>
                        <div className='area--input'>
                            <input
                                type='text'
                                placeholder='Digite um título'
                                disabled={disabled}
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                required
                            />
                        </div>
                    </label>

                    <label className='area'>
                        <div className='area--title'>Categoria</div>
                        <div className='area--input'>
                            <select
                                disabled={disabled}
                                onChange={e => setCaterogy(e.target.value)}
                                required
                            >
                                <option></option>
                                {caterogires.map((i) =>
                                    <option key={i._id} value={i._id}>{i.name}</option>
                                )}
                            </select>
                        </div>
                    </label>

                    <label className='area'>
                        <div className='area--title'>Preço</div>
                        <div className='area--input'>
                            <MaskedInput
                                mask={priceMask}
                                placeholder='R$ '
                                disabled={disabled || priceNegotiable}
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            />
                        </div>
                    </label>

                    <label className='area'>
                        <div className='area--title'>Preço Negociável</div>
                        <div className='area--input'>
                            <input className='area--checkbox'
                                type='checkbox'
                                disabled={disabled}
                                checked={priceNegotiable}
                                onChange={() => setPriceNegotiable(!priceNegotiable)}
                            />
                        </div>
                    </label>

                    <label className='area'>
                        <div className='area--title'>Descrição</div>
                        <div className='area--input'>
                            <textarea
                                disabled={disabled}
                                value={desc}
                                onChange={e => setDesc(e.target.value)}
                            >
                            </textarea>
                        </div>
                    </label>

                    <label className='area'>
                        <div className='area--title'>Imagens (1 ou mais)</div>
                        <div className='area--input'>
                            <input
                                type='file'
                                disabled={disabled}
                                ref={fileRef}
                                multiple
                            />
                        </div>
                    </label>

                    <label className='area'>
                        <div className='area--title'></div>
                        <div className='area--input'>
                            <button disabled={disabled}>Criar Anúncio</button>
                        </div>
                    </label>
                </form>
            </Area>
        </Container >
    );
}

export default AddAd