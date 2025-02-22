import React, { useEffect } from 'react'
import { useImagestore } from '../store/imagestore'
import "./Home.css"
import Card from './Card'
const Home = () => {
const {fetchImages, images} = useImagestore();


useEffect(() => {
fetchImages();
},[fetchImages]);



return (
  <div id="home">
    {images.map((i) => (
  <Card key={i._id} image={i}/>
))}
  </div>
);

}

export default Home
