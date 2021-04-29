import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'

import api from '../../services/api'
import { Container } from '../../components/MainStyles'
import { Area, Fake } from './styles'

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

    return (
        <Container>
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
                    </div>
                    <div className='box box--padding'>
                        {loading && <Fake height={100} />}
                    </div>
                </div>
            </Area>
        </Container>
    );
}

export default AdPage