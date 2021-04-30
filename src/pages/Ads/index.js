import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

import api from '../../services/api'
import AdItem from '../../components/AdItem'
import { Container } from '../../components/MainStyles'
import { Area } from './styles'

const Home = () => {

    const useQueryString = () => {
        return new URLSearchParams(useLocation().search)
    }

    const query = useQueryString()

    const [q, setQ] = useState(query.get('q') !== null ? query.get('q') : '')
    const [cat, setCat] = useState(query.get('cat') !== null ? query.get('cat') : '')
    const [uf, setUf] = useState(query.get('state') !== null ? query.get('state') : '')

    const [ufs, setUfs] = useState([])
    const [categories, setCategories] = useState([])
    const [adList, setAdList] = useState([])

    useEffect(() => {
        const getUfs = async () => {
            const list = await api.getUfs()
            setUfs(list)
        }
        getUfs()
    }, [])

    useEffect(() => {
        const getCategories = async () => {
            const list = await api.getCategories()
            setCategories(list)
        }
        getCategories()
    }, [])

    useEffect(() => {
        const getRecentAds = async () => {
            const response = await api.getAds({
                sort: 'desc',
                limit: 8
            })
            setAdList(response.ads)
        }
        getRecentAds()
    }, [])

    return (
        <Container>
            <Area>
                <div className='leftSide'>
                    <form method='GET'>
                        <input
                            type='text'
                            name='q'
                            placeholder='O que você procura?'
                            value={q}
                        />

                        <div className='filterName'>Estado:</div>
                        <select name='uf' value={uf}>
                            <option></option>
                            {ufs.map((i, k) =>
                                <option key={k} value={i.name}>{i.name}</option>
                            )}
                        </select>

                        <div className='filterName'>Categoria:</div>
                        <ul>
                            {categories.map((i) =>
                                <li key={i._id} className={cat == i.slug ? 'itemCategory active' : 'itemCategory'}>
                                    <img src={i.img} alt='' />
                                    <span>{i.name}</span>
                                </li>
                            )}
                        </ul>
                    </form>
                </div>

                <div className='rightSide'>
                    ...
            </div>

            </Area>
        </Container>
    );
}

export default Home