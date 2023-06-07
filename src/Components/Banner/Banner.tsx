import React, { useEffect,useState } from 'react'
import {API_KEY,imageUrl} from "../../Constants/Constants";
import './Banner.css'
import axios from '../../axios'
import { Movie } from "./Model";
function Banner() {
  const [Movie, setMovie] = useState<Movie>()
  useEffect(() => {
    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>{
      let x = Math.floor((Math.random() * 20) + 1);
      console.log(response.data.results[x]);
      setMovie(response.data.results[x])

  })
  }, [])

  return (
    <div
       style={{ backgroundImage: `url(${imageUrl + Movie?.backdrop_path})` }}
       className='Banner'>
        <div className='content'>
            <h1 className='tittle'>{Movie?.title}</h1>
            <div className='BannerButtons'>
                <button className='button'>Play</button>
                <button className='button'>My List</button>
            </div>
                <h1 className='Description '>{Movie?.overview}</h1>
        </div>
      <div className="fade_bottom">

      </div>
    </div>
  )
}         


export default Banner
