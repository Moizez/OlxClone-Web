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

const apiFetchFile = async (endpoint, body) => {

    if (!body.token) {
        const token = Cookies.get('token')
        if (token) {
            body.append('token', token)
        }
    }

    const response = await fetch(BASEAPI + endpoint, {
        method: 'POST',
        body
    })
    const json = await response.json()

    if (json.notallowed) {
        window.location.href = '/signin'
        return
    }

    return json
}

const api = {

    signIn: async (email, password) => {
        const request = await apiFetchPost(
            '/user/signin', { email, password }
        )
        return request
    },

    signUp: async (name, email, password, uf) => {
        const request = await apiFetchPost(
            '/user/signup', { name, email, password, state: uf }
        )

        return request
    },

    getUfs: async () => {
        const response = await apiFetchGet(
            '/states'
        )
        return response.states
    },

    getCategories: async () => {
        const response = await apiFetchGet(
            '/categories'
        )
        return response.categories
    },

    getAds: async (options) => {
        const response = await apiFetchGet(
            '/ad/list', options
        )
        return response
    },

    getAd: async (id, other = false) => {
        const response = await apiFetchGet(
            '/ad/item', { id, other }
        )
        return response
    },

    addAd: async (formData) => {
        const request = await apiFetchFile('/ad/add', formData)
        return request
    },

}

export default api