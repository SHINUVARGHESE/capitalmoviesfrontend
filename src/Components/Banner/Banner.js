import React, { useEffect, useState } from 'react'
import './Banner.css'
import { serverurl, imageurl } from '../../constants/constants'
import YouTube from "react-youtube"
import axios from 'axios'
import Wishlist from '../Wishlist/Wishlist'

function Banner() {
    const [bannermovie, setBannermovie] = useState({})
    const [urlId, setUrlId] = useState({})
    const [modal, setModal] = useState(false);
    const [popupmovie, setPopupmovie] = useState();
    const [trendingmovies, setTrendingmovies] = useState([])
    useEffect(() => {
        axios.get(`${serverurl}/allmovies`).then((data) => {
            setBannermovie(data.data.trending[2])
            setTrendingmovies(data.data.trending)
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

    const manageMovie = () => {
        setUrlId({ key: "XK-MIqHz5tU" })
    }

    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }


    return (
        <div style={{ backgroundImage: `url(${imageurl + bannermovie.backdrop_path}` }}>
            <div>
                <div className='banner'>
                    <div className='content'>
                        <h1 className='title'>{bannermovie.title}</h1>
                        <h1 className='description'>{bannermovie.overview}</h1>
                        <div className='banner_button'>
                            <button onClick={() => manageMovie()} className='button'>Play</button>
                            <button onClick={() => { toggleModal() }} className='button'>WishList</button>
                            {modal && (
                                <div>
                                    <Wishlist fn={trendingmovies} />
                                </div>
                            )}
                        </div>

                    </div>

                </div>
                            {urlId.key && <YouTube className="youtube" opts={opts} videoId={urlId.key} />}
            </div>
        </div>
    )
}

export default Banner
