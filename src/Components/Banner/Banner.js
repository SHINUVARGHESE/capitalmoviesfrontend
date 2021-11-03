import React,{useEffect,useState} from 'react'
import './Banner.css'
import { serverurl, imageurl } from '../../constants/constants'

import axios from 'axios'

function Banner() {
    const [bannermovie,setBannermovie] = useState({})
    useEffect(()=>{
        axios.get(`${serverurl}/allmovies`).then((data)=>{
            setBannermovie(data.data.trending[2])
        })
    },[]) 
    return (
        <div style={{backgroundImage: `url(${imageurl+bannermovie.backdrop_path}`}}>
            <div className='banner'>
                <div className='content'>
                    <h1 className='title'>{bannermovie.title}</h1>
                    <h1 className='description'>{bannermovie.overview}</h1>
                </div>
            </div>
        </div>
    )
}

export default Banner
