import React,{useEffect} from 'react'
import NavBar from '../Components/NavBar/NavBar'
import Banner from '../Components/Banner/Banner'
import RowPost from '../Components/RowPost/RowPost'
import { serverurl } from '../constants/constants'
import axios from 'axios' 

function Home() {  
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('user'));
        if(data){
        const token = data.token
        axios.post(`${serverurl}/checktoken`, {token}).then((response)=>{
            console.log("valid token");
        }).catch(()=>{
            localStorage.clear()
        })
       }
    }, [])
    return (
        <div>
             <NavBar/>
             <Banner/>
             <RowPost/>
        </div>
    )
}

export default Home
