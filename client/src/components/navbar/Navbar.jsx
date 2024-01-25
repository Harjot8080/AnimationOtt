import { Search, AllInclusive, Menu } from "@material-ui/icons";
import { useContext, useState, useEffect } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";
const axios = require('axios');

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [movie, setMovie] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  let movies={
    data:[]
  };
  async function getMovie(){
    try{
     movies = await axios.get("http://localhost:8800/api/movies");
    }catch(error){
      console.log(error);
    } 
  }
  getMovie();
  
  async function getGenre(type, genre){
    try{
      movies = await axios.get("http://localhost:8800/api/movies/"+type+"/"+genre)
    }catch(err){
      console.log(err);
    }
  }
  async function handleSearch(e){
    try{
    setSearch(e.target.value);
    if(e.target.value == "" || e.target.value.length <1 ) {
      setMovie([])
      return;
    }
   const res = await axios.get("http://localhost:8800/api/movies/search/"+search);
    setMovie(res.data);
    console.log(res.data);
    }
    catch(error){
      console.log(error);
    }
  }
  
  function menuClick(){
    setShowMenu(showMenu? false: true);
    console.log(showMenu);
  }

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };


  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div id="menu">
        <Menu onClick={menuClick}/>
        </div>
        <div className="left">
          <div className="logo"><AllInclusive style={ {color: "red", height: "50px", width: "50px"}}/><h1>Anime</h1></div>
          <div className="links">
          <Link to="/" className="link">
            <span>Home</span>
          </Link>
          <Link to="/series" className="link">
            <span className="navbarmainLinks">Series</span>
          </Link>
          <Link to="/movies" className="link">
            <span className="navbarmainLinks">Movies</span>
          </Link>
          </div>
        </div>
        <div className="right">
          <div className="searchComponent">
          <div className="searchBar">
            <Search className="icon" />

          <input className="search" type="text" placeholder="Search" onChange={(e)=>{ handleSearch(e)}} />
            </div>    
         
          </div>
              <button className="logout" onClick={() => dispatch(logout())}>Logout</button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMenu &&  <div className="mobileLinks">
          <Link to="/" className="link">
            <span onClick={menuClick}>Home</span>
          </Link>
          <Link to="/series" className="link">
            <span className="navbarmainLinks" onClick={menuClick}>Series</span>
          </Link>
          <Link to="/movies" className="link">
            <span className="navbarmainLinks" onClick={menuClick}>Movies</span>
          </Link>
          <span onClick={() => dispatch(logout())}> Logout</span>
          </div>}
      <div className="searchResult">
          {movie.map((data) => (
            <Link to={{ pathname: "/watch", movie: data }}>
          <div className="searchCont">
         <img className="searchImg" src={data.imgSm} alt="" />
         <span>{data.title}</span>
         </div>
         </Link>
    ))}
          </div>
    </div>
  );
};

export default Navbar;
