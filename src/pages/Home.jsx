import Slider from "../components/slider/Sliders"
import GameCards from "../components/GameCards/GameCards"
import { useLoaderData } from "react-router-dom";
import Genres from "../components/Genres/Genres";
import NewsLetter from "../components/NewsLetter/NewsLetter";
import { useEffect, useState } from "react";

const Home = () => {
  const data = useLoaderData();
  const [newGames, setNewGames] = useState([]);
  const [oldGames, setOldGames] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}reviews/sort?field=publishingYear-descending&limit=8`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setNewGames(result);
      } catch (error) {
        console.log(error.message);
      } 
    };

    fetchData();
  }, []);   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}reviews/sort?field=publishingYear-ascending&limit=8`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setOldGames(result);
      } catch (error) {
        console.log(error.message);
      } 
    };

    fetchData();
  }, []); 
  
  return (
    <div>
      <Slider />
      <GameCards title={"Highest Rated Games"} games={data} />
      <Genres games={data} />
      <GameCards title={"New Games"} games={newGames} />
      <GameCards title={"Old Games"} games={oldGames} />
      <NewsLetter />
    </div>
  )
}

export default Home
