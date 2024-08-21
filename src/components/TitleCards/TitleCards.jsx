import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {

    const [apiData, setApiData] = useState([]);
    const cardsRef = useRef();

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTZiZTI3ZmE5ZmEwMmUwNGY3NjI2YTA3ZWFjZmRhNyIsIm5iZiI6MTcyNDIyNzUxNi43OTkxNjMsInN1YiI6IjY0ZDliYjEwYTEwNzRiMDBhZWIzN2VkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j9lHl2I0hLaJBOVz_U8NEmWggzi1kpv3wTxIyKxjglQ'
        }
    };
    const handleWheel = (event) => {
        event.preventDefault();
        cardsRef.current.scrollLeft += event.deltaY;
    }

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
        .then(response => response.json())
        .then(response => setApiData(response.results))
        .catch(err => console.error(err));

        cardsRef.current.addEventListener('wheel', handleWheel)
    }, [])

    return (
        <div className='title-cards'>
            <h2>{title ? title : 'Popular on Netflix'}</h2>
            <div className="card-list" ref={cardsRef}>
                {apiData.map((card, index) => {
                    return <Link to={`/player/${card.id}`} className='card' key={index}>
                        <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
                        <p>{card.original_title}</p>
                    </Link>
                })}
            </div>
        </div>
    )
}

export default TitleCards