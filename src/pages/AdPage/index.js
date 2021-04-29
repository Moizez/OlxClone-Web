import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'

import api from '../../services/api'
import AdItem from '../../components/AdItem'
import { Container } from '../../components/MainStyles'
import { Area, Fake, OthersArea, BreadCrumb } from './styles'

const AdPage = () => {

    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [adInfo, setAdInfo] = useState({})

    useEffect(() => {
        const getAdInfo = async (id) => {
            const response = await api.getAd(id, true)
            setAdInfo(response)
            setLoading(false)
        }

        getAdInfo(id)
    }, [])

    const formatDate = (d) => {
        let date = new Date(d)

        let months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
        let day = date.getDate()
        let month = date.getMonth()
        let year = date.getFullYear()

        return `${day} de ${months[month]} de ${year}`

    }

    const dateCreated = formatDate(adInfo?.dateCreated)
    const price = adInfo.price?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

    return (
        <Container>

            <BreadCrumb>
                Você está aqui:
                <Link to='/'>Home</Link>
                /
                <Link to={`/ads?state=${adInfo.stateName}`}>{adInfo.stateName}</Link>
                /
                <Link to={`/ads?state=${adInfo.stateName}&cat=${adInfo.category?.slug}`}>{adInfo.category?.name}</Link>
                / {adInfo.title}
            </BreadCrumb>

            <Area>
                <div className='leftSide'>
                    <div className='box'>
                        <div className='adImage'>
                            {loading && <Fake height={300} />}
                            {adInfo.images &&
                                <Slide>
                                    {adInfo.images.map((img, k) =>
                                        <div key={k} className='slide'>
                                            <img src={img} alt='' />
                                        </div>
                                    )}
                                </Slide>
                            }
                        </div>
                        <div className='adInfo'>
                            <div className='adName'>
                                {loading ? <Fake /> : <h2>{adInfo?.title}</h2>}
                                {loading ? <Fake /> : <small>Criado em {dateCreated}</small>}
                            </div>
                            <div className='adDescription'>
                                {adInfo.description}
                                <hr />
                                <small>Visualizações: {adInfo?.views}</small>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='rightSide'>
                    <div className='box box--padding'>
                        {loading && <Fake />}
                        {adInfo.priceNegotiable && 'Preçociável'}
                        {!adInfo.priceNegotiable && adInfo.price &&
                            <div className='price'>
                                Preço: <span>{price}</span>
                            </div>
                        }
                    </div>
                    {loading && <Fake height={100} />}
                    {adInfo.userInfo &&
                        <>
                            <a href={`mailto:${adInfo.userInfo.email}`} className='contactSeller' target='_blank'>Fale com o vendedor</a>
                            <div className='box box--padding created'>
                                <strong>{adInfo.userInfo.name}</strong>
                                <small>E-mail: {adInfo.userInfo.email}</small>
                                <small>Estado: {adInfo.stateName}</small>
                            </div>
                        </>
                    }
                </div>

            </Area>

            <OthersArea>
                {adInfo.others &&
                    <>
                        <h2>Outras ofertas do vendedor</h2>
                        <div className='others'>
                            {adInfo.others.map((item, k) =>
                                <AdItem key={k} data={item} />

                            )}
                        </div>
                    </>
                }
            </OthersArea>

        </Container>
    );
}

export default AdPage