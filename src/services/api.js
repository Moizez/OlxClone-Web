import Cookies from "js-cookie"
import qs from 'qs'

const BASEAPI = 'http://alunos.b7web.com.br:501'

const apiFetchPost = async (endpoint, body) => {

    if (!body.token) {
        const token = Cookies.get('token')
        if (token) {
            body.token = token
        }
    }

    const response = await fetch(BASEAPI + endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'

        },
        body: JSON.stringify(body)
    })
    const json = await response.json()

    if (json.notallowed) {
        window.location.href = '/signin'
        return
    }

    return json
}

const apiFetchGet = async (endpoint, body = []) => {

    if (!body.token) {
        const token = Cookies.get('token')
        if (token) {
            body.token = token
        }
    }

    const response = await fetch(`${BASEAPI + endpoint}?${qs.stringify(body)}`)
    const json = await response.json()

    if (json.notallowed) {
        window.location.href = '/signin'
        return
    }

    return json
}

const api = {

    signIn: async (email, password) => {
        const response = await apiFetchPost(
            '/user/signin', { email, password }
        )
        return response
    }
}

export default api