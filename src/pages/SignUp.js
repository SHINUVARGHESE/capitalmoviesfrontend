import React,{useEffect,useState} from 'react'
import Signup from '../Components/Signup/Signup'
import {Link, useHistory}from 'react-router-dom'

function SignupPages() {
    const [user, setUser] = useState({})
    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem('user'));
        if(data){
            setUser(data.userData) 
        }else{
            setUser({})
        }
    },[])
    const history = useHistory()
    const logo = {
        position: "fixed",
        left: "20px",
        width: "90%",
        color: "white",
        fontSize: "3rem",
        padding: "20px",
    }
    return (
        user.username ?
        history.push("/home") : 
        <div>
            <h1 style={logo} ><Link to="/">Capital Movies</Link></h1>
            <Signup/>
        </div>
    )
} 

export default SignupPages
