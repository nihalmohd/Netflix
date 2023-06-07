import React,{useEffect,useState} from 'react'
import './RowPost.css'
import axios from '../../axios'
import {API_KEY, imageUrl} from "../../Constants/Constants";
import Youtube, { YouTubeProps } from "react-youtube"
interface RowPostProps {
  url:string
  title: string;
  issmall?: boolean;
}
interface VideoData {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

const RowPost:React.FC<RowPostProps>=(props:RowPostProps)=> {
  const [Movies, setMovies] = useState([])
  const [urlid,seturlId]=useState <VideoData> ()
  useEffect(()=>{
    axios.get(props.url).then((response)=>{
        console.log(response.data)
        setMovies(response.data.results)
    }).catch(err=>{
      alert("Network Errror fix it")
    })
  },[])
  const opts: YouTubeProps['opts'] = {
    height: '1000',
    width: '100%',
    playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
    },
};
const handleMovie=(id:any)=>{
   console.log(id);
 axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response)=>{
      if(response.data.results.length!==0){
        seturlId(response.data.results[0])
      }else{
        console.log("Array Empty")
      }
 }) 
}
  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className="posters">
         {
          Movies.map((obj:any)=>
            <img onClick={()=>handleMovie(obj.id)} className={props.issmall?'smallPoster':'poster'} src={`${imageUrl + obj.backdrop_path}`} alt="poster"/>
          )
         }
        
      </div>
      {
       urlid && <Youtube videoId={urlid.key} opts={opts} />
      }
    </div>
  )
}

export default RowPost
