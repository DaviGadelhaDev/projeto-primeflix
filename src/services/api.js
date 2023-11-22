import axios from 'axios'

//Base da url:https://api.themoviedb.org/3/
//URL da api: https://api.themoviedb.org/3/movie/now_playing?api_Key=4bb8d1d175b67f6eefe9e5a1e960278b&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api
