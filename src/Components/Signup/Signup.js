import React,{useState, useEffect} from 'react';
import './Signup.css';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import { serverurl } from '../../constants/constants'
function Signup() {
    let history = useHistory();
    const [user, setUser] = useState()
    const handleChange =(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }
    const handleSubmmit =(e)=>{
        e.preventDefault()
           if(user.password === user.Cpassword){
                axios.post(`${serverurl}/signup`,{user}).then((data)=>{
                 if(data.data.message){
                    alert("EmailId already exist")
                 }else if(data.data===true){
                    history.push("/signin")
                 }else{
                     alert("some went wrong registration failed")
                 }
                })
           }else{
               alert("confirm password not mathchng")
           }
    }
    return (
            <div style={{backgroundImage: `url(${process.env.PUBLIC_URL}/walpaper.jpeg)`}} className="Signup_Form">
                <form onChange={handleChange} onSubmit={handleSubmmit} method="POST" id="submit-form" className="animate">
                    <center>
                        <h1>SIGN UP</h1>
                        <input type="text" id="username" name="username" placeholder="Full name*" autocomplete="off" required />
                        <input type="tel" pattern="[0-9]{10}" id="mob" name="contact" placeholder="Contact no*" autocomplete="off" required />
                        <input type="email" id="emailaddress" name="emailaddress" placeholder="Email Address*" autoComplete="off" required />
                        <input type="text" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}" maxlength="10" minlength="5" title="Must contain at least one number and one uppercase and lowercase letter, and 10 charactors" id="password" name="password" placeholder="Password*" autocomplete="off"  required />
                        <input type="password" id="Cpassword" name="Cpassword" placeholder="Confirm Password*" autocomplete="off" required />
                        <input style={{cursor:"pointer"}} type="submit" value="SignUp" className="btn1"/>
                            <section>
                                <span style={{float:'right'}}><Link to="/Signin">Already Registered?</Link></span>
                            </section>
                    </center>
                </form>
            </div>
    )
}

export default Signup
