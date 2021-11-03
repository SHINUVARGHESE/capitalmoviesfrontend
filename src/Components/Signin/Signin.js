import React, {useState} from 'react';
import './Signin.css';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import { serverurl } from '../../constants/constants'
 
function Signin() {
    let history = useHistory();
    const [user,setUser]= useState()
    const handleChange = (e)=>{
        setUser({...user,[e.target.name]:e.target.value});
        
    }
    const handleSubmmit = (e)=>{
        e.preventDefault()
        axios.post(`${serverurl}/signin`,{user}).then((data)=>{
            const token = data.data.accessToken
            const userData = data.data.user
            const user ={
                token,userData
            }
            localStorage.setItem('user', JSON.stringify(user))
            history.push("/") 
        }).catch((err)=>{
            alert("Input not matching")
        })
    }
    return (
              <div style={{backgroundImage: `url(${process.env.PUBLIC_URL}/walpaper.jpeg)`}} className="Signin_Form">
              <form onChange={handleChange} onSubmit={handleSubmmit} method="POST" id="login" className="animate">
                    <center>
                        <h1>SIGN IN</h1>
                        <input type="email" id="email" name="emailaddress" placeholder="Email Address*" required />
                        <input type="password" id="passcode" name="password" placeholder="Password*" required />
                        <button style={{cursor:"pointer"}} className="btn1" type="submit">SignIn</button>
                        <section>
                            {/* <span><a href="#">Forgot Password?</a></span> */}
                            <span style={{float:'right'}}><Link to="/signup">Don't have an account?</Link></span>
                        </section>
                    </center>
                </form>
        </div>

    )
}

export default Signin
