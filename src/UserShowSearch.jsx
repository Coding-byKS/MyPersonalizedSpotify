import { useState, useEffect } from 'react';
import "./UserShowSearch.css";
// import {v4 as uuid} from "uuid";

import "./MyTopTen.css";
function UserShowSearch(props) {
  
  const [show, setShow] = useState([]);
  const [summary, setSummary] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState("");
  const [ifValid, setValid] =useState(false);
  
  const fetchHandler = async() => {
    try{
    const response = await fetch(`https://api.tvmaze.com/singlesearch/shows?q=${props.show}`);
    if(!response.ok){
      throw new Error(response.statusText);
     
    }
    const data = await response.json();  
    // console.log(data);
    setValid(true);
    setShow(data);
    setImage(data.image.original);
    setRating(data.rating.average);
    const tagRegExp =  new RegExp('<\s*[^>]*>', 'g');
    setSummary(data.summary.replace(tagRegExp, ''));
    }catch(err){
    console.log(err.message);
    }
  }

  useEffect(()=>{
fetchHandler();
  }, [])

  return (

    
    ifValid?(<div><h2>Here you go!</h2>  <div className='showContainer'>
        
        
        <div style={{fontSize:"40px", fontWeight:"bolder"}}>{show.name}</div>
     <div className='userShowImage'><img src={image} style={{ width:"40%" }}/>  </div>   
     <div style={{fontSize:"30px"}}>Language: {show.language}</div>      
     <div style={{fontSize:"30px"}}>Average Rating: {rating}</div>
     <div style={{fontSize:"30px", display:"flex", flexDirection:"column"}}> Official Site: <a  style={{color:"black"}} href={show.officialSite}>{show.officialSite}</a></div>
     <div style={{fontSize:"20px"}}>{summary}</div></div></div>):(<h2>Sorry, could not find it. Enter a valid TV Show Name.</h2>)
    
    // <h2>Enter a valid TV Show.</h2>
)
}

export default UserShowSearch;