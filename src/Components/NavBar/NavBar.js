import React, { useEffect, useState } from 'react'
import './NavBar.css'
import { Link, useHistory } from "react-router-dom";
import axios from "axios"
import { serverurl } from '../../constants/constants'

function NavBar() {
    const auth = <Link to="/signin">Signin</Link>
    const [user, setUser] = useState({})
    const [favoratemovies, setFavorateMovies] = useState([])
    const history = useHistory()
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('user'));
        if (data) {
            setUser(data.userData)
            axios.post(`${serverurl}/userfavorate`, { userid: data.userData.id }).then((data) => {
                if(data.data){
                setFavorateMovies(data.data.favoratemovies)
                }else{
                    setFavorateMovies(["no favoratemovies","no favoratemovies"])
                }
            })
        } else {
            setUser({})
        }
    }, [])
    return (
        <div className='navbar'>
            <h1 className="logo"><Link to="/">Capital Movies</Link></h1>
            <div style={{ marginLeft: "35%", color: "white" }}>{user ?
                <div class="dropdown">
                    <button class="dropbtn"><h3>favorate</h3></button>

                    <div class="dropdown-content">
                        {
                            favoratemovies.map((item,ky) => {
                                return (
                                    <a >{item.moviedata.title}</a>
                                )
                            })
                        }
                    </div>
                </div> : " "}</div>
            <ui className="account">
                <li>{user.username ?
                    <div class="dropdown">
                        <button class="dropbtn"><h3>{user.username}</h3></button>
                        <div class="dropdown-content">
                            <a onClick={() => {
                                localStorage.clear()
                                history.push("/signin")
                            }}>Logout</a>
                        </div>
                    </div> : auth}</li>
            </ui>
        </div>
    )
}

export default NavBar
