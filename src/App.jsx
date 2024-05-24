import React, { useState, useEffect } from "react";
import md5 from "md5";
import MyTopTen from "./MyTopTen";
import "./App.css";
import UserShowSearch from "./UserShowSearch";


export default function App() {
  const shows = ["man men", "the office", "rick and morty"," Killing eve", "taskmaster", "bojack horseman"]
  
  const [showInput, getShow]=useState("");
  const [userShow, fetchShow]=useState("");
 

  function handleSubmit(event){
    
    event.preventDefault();
    console.log(showInput);
    fetchShow(showInput);
    getShow("");
  }

  function handleChange(e){
    
    getShow(e.target.value)
    console.log(showInput)

  }

  function handleReset(){
    fetchShow("");
  }

  
  return (
    <div className="App">
      <h1>Hi, which TV show would like to know more about?</h1>
      <form style={{fontSize:"70px"}}>
        {!userShow&&<input style={{fontSize:"30px"}} required type="text" onChange={handleChange} value={showInput}></input>}
        {!userShow&&<input style={{fontSize:"30px"}} onClick={handleSubmit} type="submit" />}
        {!userShow&&<p style={{fontSize:"30px"}}>Examples: Blue Lights, Baby Reindeer, IT Crowd, Fleabag, Derry Girls......</p>}
        {userShow&&<button style={{fontSize:"30px"}} onClick={handleReset}>Search Another Show</button>}
      </form>
      
      {userShow&&<UserShowSearch show={userShow}/>}
      <h2>Here are some of my favorites:</h2>

      <div className="container">
        
      {shows.map((show) => <div className="show"><MyTopTen show={show}/></div>)}
      </div>
      
    </div>
  );
}

