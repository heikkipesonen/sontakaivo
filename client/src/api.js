const fetch = window.fetch
const url = 'http://192.168.1.200:8080/api'

const api = {
  get (endpoint, params = {}) {
    let query = Object.keys(params)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&')

    return fetch(url + endpoint + query, {
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      method: 'GET'
    }).then((response) => {
      return response.json()
    })
  },

  post (endpoint, payload) {
    return fetch(url + endpoint, {
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify(payload)
    }).then((response) => {
      return response.json()
    })
  }
}

export default api
