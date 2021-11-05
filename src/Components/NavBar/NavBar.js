import React, { useEffect, useState } from 'react'
import './NavBar.css'
import { Link, useHistory } from "react-router-dom";
import axios from "axios"
import { serverurl } from '../../constants/constants'

function NavBar() {
    const auth = <Link to="/signin">Signin</Link>
    const [user, setUser] = useState({})
    const [favoratemovies, setFavorateMovies] = useState()
    const history = useHistory()
    const [modal, setModal] = useState(false);
    const [popupmovie,setPopupmovie] = useState()
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('user'));
        if (data) {
            setUser(data.userData)
            axios.post(`${serverurl}/userfavorate`, { userid: data.userData.id }).then((data) => {
                if(data.data.favoratemovies){
                setFavorateMovies(data.data.favoratemovies)
                }else{
                    setFavorateMovies()
                }
            })
        } else {
            setUser({})
            setFavorateMovies()
        }
    }, [])

    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal') 
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <div className='navbar'>
            <h1 className="logo"><Link to="/">Capital Movies</Link></h1>
            <div style={{ marginLeft: "35%", color: "white" }}>{user.username &&
                <div className="dropdown">
                    <button className="dropbtn"><h3>Favorate</h3></button> 
                    <div className="dropdown-content">
                        {
                           favoratemovies ? favoratemovies.map((item,ky) => {
                                return (
                                    <a >{item.moviedata.title}</a>
                                )
                            }) : <a>no movies</a>
                        }
                    </div>
               </div>
                    
                    }
 
                </div> 
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
