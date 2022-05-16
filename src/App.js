import axios from "axios";
import React, {useState} from "react";
import videoBG from "./assets/sunset.mp4"

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=4e4fec5005b9fd91f4f4e281ae7f56f5`

  const searchLocation = (e) => {
    if(e.key === 'Enter') {
      axios.get(url).then((response)=>{
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }
  return (
    <div className="app">
      <div className="videobg">
      <video loop autoPlay muted id='video'>
        <source
          src={videoBG}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
      <div className="search">
        <input 
        type="text"
        value={location}
        onChange={e => setLocation(e.target.value)}
        onKeyPress={searchLocation}
        placeholder='Enter the location' />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
           {data.main ? <h1>{data.main.temp.toFixed()}°F</h1>: null} {/* Check to see if the data.main is available if yes then we're gonna proceed now.. */}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.name!== undefined &&
          <div className="bottom">
            <div className="feels">
            {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°F</p> : null}
          <p className="text">Feels Like</p>
            </div>
            <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p className="text">Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{data.wind.speed.toFixed()}MPH</p> : null}
              <p className="text">Wind Speed</p>
            </div>
        </div>
        }        
      </div>
    
    </div>

  );
}

export default App;
