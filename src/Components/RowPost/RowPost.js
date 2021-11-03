import React, { useEffect, useState } from 'react'
import './RowPost.css'
import { serverurl, imageurl } from '../../constants/constants'
import YouTube from "react-youtube"
import axios from 'axios'
import {useHistory } from "react-router-dom";

function RowPost() {
    const [popularmovies, setPopularmovies] = useState([])
    const [trendingmovies, setTrendingmovies] = useState([])
    const [urlId, setUrlId] = useState({})
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
            if (data.data.youtubeVideoId.length !== 0) {
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
                }
            }).catch(() => {
                alert("Some went wrong ! can't add movie to favorate")
            })
        } else {
            alert("Please Login first")
        }
    }

    return (
        <div className='row'>
            <h1>Popularmovies</h1>
            <div className='posters'>

                {
                    popularmovies.map((item, ky) => {
                        return (
                            <div className="card1">
                                <h4 style={{ padding: "10px" }}>{item.title}</h4>
                                <img onClick={() => { manageMovie(item.id) }} className="smallPoster" key={ky} src={`${imageurl + item.backdrop_path}`} />
                                <div className='banner_buttons'>
                                    <button onClick={() => { addToFavorate(item.id, category1) }} className='button'>Add to favorate</button>
                                  <a href="#popup1"> <button  className='button'>Overview</button></a>
                                    <div style={{paddingBottom:"0"}} id="popup1" class="overlay">
                                        <div style={{paddingBottom:"0"}} class="popup">
                                            <h2 style={{paddingTop:"40px"}}>{item.title}</h2>
                                            <a class="close" href="/" >&times;</a>
                                            <div style={{color:"black", padding:"8px", paddingBottom:"0"}} class="content">{item.overview}
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                <h4 style={{ padding: "10px" }}>{item.title ? item.title : "Title"}</h4>
                                <img onClick={() => { manageMovie(item.id) }} className="smallPoster" key={ky} src={`${imageurl + item.backdrop_path}`} />
                                <div className='banner_buttons'>
                                    <button onClick={() => { addToFavorate(item.id, category2) }} className='button'>Add to favorate</button>
                                    <a href="#popup1"><button className='button'>Overview</button></a>

                                </div>

                            </div>

                        )
                    })
                }
            </div>

        </div>
    )
}

export default RowPost
