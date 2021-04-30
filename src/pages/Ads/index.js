import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

import api from '../../services/api'
import AdItem from '../../components/AdItem'
import { Container } from '../../components/MainStyles'
import { Area } from './styles'

let timer

const Home = () => {

    const history = useHistory()

    const useQueryString = () => {
        return new URLSearchParams(useLocation().search)
    }

    const query = useQueryString()

    const [q, setQ] = useState(query.get('q') !== null ? query.get('q') : '')
    const [cat, setCat] = useState(query.get('cat') !== null ? query.get('cat') : '')
    const [uf, setUf] = useState(query.get('state') !== null ? query.get('state') : '')

    const [adsTotal, setAdsTotal] = useState(0)
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    const [ufs, setUfs] = useState([])
    const [categories, setCategories] = useState([])
    const [adList, setAdList] = useState([])

    const [resultOpacity, setResultOpacity] = useState(1)
    const [loading, setLoading] = useState(true)

    const getAdsList = async () => {
        setLoading(true)

        let offset = (currentPage - 1) * 10
        const response = await api.getAds({
            sort: 'desc',
            limit: 10,
            q,
            cat,
            state: uf,
            offset
        })
        setAdList(response.ads)
        setAdsTotal(response.total)
        setResultOpacity(1)
        setLoading(false)
    }

    useEffect(() => {
        if (adList.length > 0) {
            setPageCount(Math.ceil(adsTotal / adList.length))
        } else {
            setPageCount(0)
        }
    }, [adsTotal])

    useEffect(() => {
        setResultOpacity(0.3)
        getAdsList()
    }, [currentPage])

    useEffect(() => {

        let queryString = []
        if (q) {
            queryString.push(`q=${q}`)
        }
        if (cat) {
            queryString.push(`cat=${cat}`)
        }
        if (uf) {
            queryString.push(`state=${uf}`)
        }

        history.replace({
            search: `?${queryString.join('&')}`
        })

        if (timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(getAdsList, 2000)
        setResultOpacity(0.3)
        setCurrentPage(1)

    }, [q, cat, uf])

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

    let pagination = []
    for (let i = 1; i <= pageCount; i++) {
        pagination.push(i)
    }

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
                            onChange={e => setQ(e.target.value)}
                        />

                        <div className='filterName'>Estado:</div>
                        <select name='uf' value={uf} onChange={e => setUf(e.target.value)}>
                            <option></option>
                            {ufs.map((i, k) =>
                                <option key={k} value={i.name}>{i.name}</option>
                            )}
                        </select>

                        <div className='filterName'>Categoria:</div>
                        <ul>
                            {categories.map((i) =>
                                <li
                                    key={i._id}
                                    className={cat == i.slug ? 'itemCategory active' : 'itemCategory'}
                                    onClick={() => setCat(i.slug)}
                                >
                                    <img src={i.img} alt='' />
                                    <span>{i.name}</span>
                                </li>
                            )}
                        </ul>
                    </form>
                </div>

                <div className='rightSide'>
                    <h2>Resultados da Pesquisa</h2>

                    {loading && adList.length === 0 &&
                        <div className={'listWarning'}>Carregando...</div>
                    }

                    {!loading && adList.length == 0 &&
                        <div className={'listWarning'}>Não encontramos resultados!</div>
                    }

                    <div className='list' style={{ opacity: resultOpacity }}>
                        {adList.map((i, k) =>
                            <AdItem key={k} data={i} />
                        )}
                    </div>

                    <div className='pagination'>
                        {pagination.map((i, k) =>
                            <div key={k} onClick={() => setCurrentPage(i)} className={i === currentPage ? 'pageItem active' : 'pageItem'}>{i}</div>
                        )}
                    </div>

                </div>

            </Area>
        </Container>
    );
}

export default Home