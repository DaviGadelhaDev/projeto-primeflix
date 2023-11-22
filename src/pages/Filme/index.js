import { useEffect, useState } from 'react'
import { useParams, useNavigate, json } from 'react-router-dom'
import api from '../../services/api'
import { toast } from 'react-toastify'
import './filme.css'


function Filme() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [filme, setFilme] = useState({}) //chaves pois ela começa com um objeto vazio
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "4bb8d1d175b67f6eefe9e5a1e960278b",
                    language: "pt-BR"
                }
            })
                //caso ele ache o filme irá cair nesse then
                .then((response) => {
                    setFilme(response.data)
                    setLoading(false)
                })
                //caso de erro
                .catch(() => {
                    console.log("Filme não encontrado")
                    navigate("/", {replace: true}) //o r3eplace irá redirecionar para a pagina de home
                })
        }

        loadFilme()


        //quando o usuário volta uma página o componente é desmontado
        return () => {
            console.log("Componente foi desmontado")
        }

    }, [navigate, id])


    function salvarFilmes(){
        const minhaLista = localStorage.getItem("@primeflix")

        let filmesSalvos = JSON.parse(minhaLista) || []
        const hasFilme = filmesSalvos.some((filmesSalvo)=> filmesSalvo.id === filme.id)

        if(hasFilme){
            toast.warn("Filme já adicionado")
            return
        }

        filmesSalvos.push(filme)
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
        toast.success("Filme salvo com sucesso")
    }


    if (loading) {
        return (
            <div className='filme-info'>
                <h2>Carregando detalhes...</h2>
            </div>
        )
    }


    return (
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className='area-button'>
                <button onClick={salvarFilmes}>Salvar</button>
                <button>
                    <a target='blank' rel='external' href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a> {/*usando esse método já fica a pesquisa no youtube e o target blank é para abrir em outra página*/}
                </button>
            </div>

        </div>
    )
}


export default Filme