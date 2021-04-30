import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import api from '../../services/api'
import AdItem from '../../components/AdItem'
import { Container } from '../../components/MainStyles'
import { Area, SearchArea } from './styles'

const Home = () => {

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
        <>
            <SearchArea>
                <Container>
                    <div className='searchBox'>
                        <form method='GET' action='/ads'>
                            <input type='text' name='q' placeholder='O que você procura?' />
                            <select name='state'>
                                {ufs.map((i, k) =>
                                    <option key={k} value={i.name}>{i.name}</option>
                                )}
                            </select>
                            <button>Pesquisar</button>

                        </form>
                    </div>

                    <div className='categoryList'>
                        {categories.map((i, k) =>
                            <Link key={k} to={`/ads?cat=${i.slug}`} className='categoryItem'>
                                <img src={i.img} alt='' />
                                <span>{i.name}</span>
                            </Link>
                        )}

                    </div>

                </Container>
            </SearchArea>

            <Container>
                <Area>
                    <h2>Anúncios Recentes</h2>
                    <div className='list'>
                        {adList.map((i, k) =>
                            <AdItem key={k} data={i} />
                        )}
                    </div>
                    <Link className='seeAllLink' to='/ads'>Ver todos</Link>
                    <hr />
                    Mussum Ipsum, cacilds vidis litro abertis. Manduma pindureta quium dia nois paga. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Quem num gosta di mim que vai caçá sua turmis! Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis.
                </Area>
            </Container>
        </>

    );
}

export default Home