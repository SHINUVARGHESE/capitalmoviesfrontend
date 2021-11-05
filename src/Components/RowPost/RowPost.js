import React, { useEffect, useState } from 'react'
import './RowPost.css'
import { serverurl, imageurl } from '../../constants/constants'
import YouTube from "react-youtube"
import axios from 'axios'
import { useHistory } from "react-router-dom";


function RowPost() {
    const [popularmovies, setPopularmovies] = useState([])
    const [trendingmovies, setTrendingmovies] = useState([])
    const [modal, setModal] = useState(false);
    const [urlId, setUrlId] = useState({})
    const [popupmovie,setPopupmovie] = useState()
    const category1 = "popularmovies"
    const category2 = "trendingmovies"
    const history = useHistory()
    useEffect(() => {
        axios.get(`${serverurl}/allmovies`).then((data) => {
            if (data.data) {
                setPopularmovies(data.data.popular)
                setTrendingmovies(data.data.trending)
            }
        })
    }, [])
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        }
    }
    const manageMovie = (movieId) => {
        axios.post(`${serverurl}/findvideoid`, { id: movieId }).then((data) => {
            if (data.data.error) {
                console.log(data.data.error);
            } else if (data.data.youtubeVideoId.length !== 0) {
                setUrlId({ key: data.data.youtubeVideoId })
            }
        })
    }
    const addToFavorate = (movieId, category) => {
        const data = JSON.parse(localStorage.getItem('user'));
        if (data) {
            const ids = {
                category,
                movieId,
                userId: data.userData.id
            }
            axios.post(`${serverurl}/addtofavorate`, ids).then((data) => {
                if (data.data.status) {
                    alert("Movie added to favorate")
                    window.location.reload(false);
                }
            }).catch(() => {
                alert("Some went wrong ! can't add movie to favorate")
            })
        } else {
            alert("Please Login first")
        }
    }


    const toggleModal = (title,discription,release,rating) => {
        setModal(!modal);
        const obj = {
            title,discription,release,rating
        }
        setPopupmovie(obj)
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <div className='row'>
            <h1>Popularmovies</h1>
            <div className='posters'>

                {
                    popularmovies.map((item, ky) => {
                        return (
                            <div className="card1">
                                <h4 style={{ padding: "10px" }}>{item.title}<span style={{paddingLeft:"15px"}}>{item.vote_average} ⭐⭐⭐</span></h4>
                                <img onClick={() => { manageMovie(item.id) }} className="smallPoster" key={ky} src={`${imageurl + item.backdrop_path}`} />
                                <div className='banner_buttons'>
                                    <button onClick={() => { addToFavorate(item.id, category1) }} className='button'> ❤️ Add to favorate</button>
                                    <button onClick={()=>{toggleModal(item.title, item.overview, item.release_date)}} className="button" >Overview</button>
                                </div>
                                {modal && (
                                        <div className="modal"> 
                                            <div onClick={toggleModal} className="overlay"></div>
                                            <div className="modal-content">
                                                <h2>{popupmovie.title}<span style={{paddingLeft:"15px"}}>({popupmovie.release ? popupmovie.release : "0000-00-00"})</span></h2>
                                                <p>{popupmovie.discription}</p>
                                                <button style={{border:"none",cursor: "pointer"}} className="close-modal" onClick={toggleModal}>
                                                ✖️
                                                </button>
                                            </div>
                                        </div>
                                    )}
                            </div>

                        )
                    })
                    
                }
                
            </div>
            {urlId.key && <YouTube opts={opts} videoId={urlId.key} />}
            <h1>Trendingmovies</h1>
            <div className='posters'>
               
                {
                    trendingmovies.map((item, ky) => {
                        return (
                            <div className="card2">
                                <h4 style={{ padding: "10px" }}>{item.title ? item.title :  "Title"}<span style={{paddingLeft:"15px"}}>{item.vote_average} ⭐⭐⭐</span></h4>
                                <img onClick={() => { manageMovie(item.id) }} className="smallPoster" key={ky} src={`${imageurl + item.backdrop_path}`} />
                                <div className='banner_buttons'>
                                    <button onClick={() => { addToFavorate(item.id, category1) }} className='button'> ❤️ Add to favorate</button>
                                    <button onClick={()=>{toggleModal(item.title, item.overview, item.release_date)}} className="button" >Overview</button>
                                </div>
                                {modal && (
                                        <div className="modal"> 
                                            <div onClick={toggleModal} className="overlay"></div>
                                            <div className="modal-content">
                                                <h2>{popupmovie.title ? popupmovie.title : "Title"}<span style={{paddingLeft:"15px"}}>({popupmovie.release ? popupmovie.release : "0000-00-00"})</span></h2>
                                                <p>{popupmovie.discription}</p>
                                                <button style={{border:"none",cursor: "pointer"}} className="close-modal" onClick={toggleModal}>
                                                ✖️
                                                </button>
                                            </div>
                                        </div>
                                    )}
                            </div>

                        )
                    })
                    
                }
            </div>

        </div>
    )
}

export default RowPost
