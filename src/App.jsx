import React, { useState, useEffect } from "react";
import md5 from "md5";
import MyTopTen from "./MyTopTen";
import "./App.css";


export default function App() {
  const shows = ["man men", "the office", "rick and morty"," death note", "taskmaster", "bojack horseman"]
  
  const [showInput, getShow]=useState("");
  const [userShow, fetchShow]=useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const now = Date.now();
      const publicKey = "5a80fc9cd71c4feac54e5ba0f521debc";
      const privateKey = "cc06371e7c3fac6c31860f0644283ed1d48f4b13";
      let params = {
        apikey: publicKey,
        ts: now
      };
      params.hash = md5(params.ts + privateKey + publicKey);

      const apiUrl = "https://gateway.marvel.com/v1/public/characters";

      const results = await fetch(
        `${apiUrl}?apikey=${params.apikey}&ts=${params.ts}&hash=${params.hash}`
      )
        // .then(res => res.json())
        // .then(res => res.data)
        // .then(res => res.results);
        let marv = await results.json();
        // console.log(marv.data.results);
      setData(marv.data.results);
    };

    fetchData();
  }, []);

  function handleSubmit(event){
    event.preventDefault();
    console.log(showInput);
    fetchShow(showInput);


  }
  function handleChange(e){
    
    getShow(e.target.value)
    console.log(showInput)

  }
  return (
    <div className="App">
      <h1>Hi, which TV show would like to know more about?</h1>
      <form>
        <input required type="text" onChange={handleChange}></input>
        <input onClick={handleSubmit} type="submit" />
      </form>
      {userShow&&<MyTopTen show={userShow}/>}
      <h2>Here are some of my favorites:</h2>

      <div className="container">
        
      {shows.map((show) => <div className="show"><MyTopTen show={show}/></div>)}
      </div>
      {/* <h1>Marvel API</h1>

      {data.map((char, index) => (
        <div key={char.id.toString()}>
          <p>
            {index} - {char.name}
            <img src={char.thumbnail.path+"."+char.thumbnail.extension}/>
          </p>
          {index < data.length - 1 ? <hr /> : ""}
        </div>
      ))} */}
    </div>
  );
}

