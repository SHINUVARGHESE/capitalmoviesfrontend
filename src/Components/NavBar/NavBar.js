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

   const deleteFavorate=(movieId)=>{
       const ids= {
           movieId,
           userId:user.id
       }
  var r = window.confirm("Are you want to delet the favorate movie ?");
  if (r == true) {
    axios.post(`${serverurl}/deletefavorate`,ids).then((data)=>{
       if(data.data.status){
           alert(" Movie deleted from favorate")
           window.location.reload(false); 

       }
    })
  } else {
    console.log("canceled");
  }
      
    }

    return (
        <div className='navbar'>
            <h1 className="logo"><Link to="/">Capital Movies</Link></h1>
            <div style={{ marginLeft: "35%", color: "white" }}>{user.username &&
                <div className="dropdown">
                    <button className="dropbtn"><h3>Favorates</h3></button> 
                    <div className="dropdown-content">
                        {
                           favoratemovies ? favoratemovies.map((item,ky) => {
                                return (
                                    <a  style={{color:"white"},{hover:{color:"black"}}}>{item.moviedata.title}<button onClick={()=>{deleteFavorate(item.moviedata.id)}} style={{float:"right", backgroundColor:"black", border:"none",padding:"5px", color:"red",fontWeight:"bold",fontSize:"13px",cursor:"pointer"}}>x</button></a>
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
