import './App.css';
import Slideshow from './Slideshow'
import SoundButton from './SoundButton'
import ServerList from './ServerList'
import VideoPlaylist from './VideoPlaylist'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Tj from './Tj';
import FoodMenu from './FoodMenu'

function Vkysite() {
  const [images, setImages] = useState<string[]>([])
  const [videos, setVideos] = useState<Video[]>([{desc: "", url: ""}])
  const [foodList, setFoodList] = useState<Food>({content: [], contentSnippet: "", guid: "", link: "", title: ""})
  
  useEffect(getImages, [])
  useEffect(getVideos, [])
  useEffect(getFood, [])

  function getImages() {
    axios
      .get('http://VKYT003:3001/api/images')
      .then(response => {
        setImages(response.data)
      })
  }

  function getVideos() {
    axios
      .get('http://VKYT003:3001/api/videos')
      .then(response => {
        setVideos(response.data)
    
      })
  }

  function getFood() {
    axios
      .get('http://VKYT003:3001/api/food')
      .then(response =>{
        setFoodList(response.data)
      })
  }

  return (
    <div className="App">
      <div className="Sidebar">
        <p>Linkkejä</p>
        <ServerList />
        <FoodMenu foodList={foodList} />
      </div>
      <div className="Main">
        <h1>Säkylä VKY homepage</h1>
        <div className="Main-row">
          <div className="Main-column">
            <Slideshow images={images} />
          </div>
          <div className="Main-column">
            <Tj />
            <VideoPlaylist videos={videos} />
            <SoundButton /> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vkysite;
