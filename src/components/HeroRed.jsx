// src/components/Hero.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import search from "../assets/search.svg";

const HeroRed = () => {
  const [topManga, setTopManga] = useState([]);
  const [mangaSearch, setMangaSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://api.jikan.moe/v4/top/manga?filter=publishing')
      .then(response => response.json())
      .then(data => {
        const topSevenmanga = data.data.slice(0, 6);
        setTopManga(topSevenmanga);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearch = e => {
    e.preventDefault();
    navigate(`/allmemist/resultsmanga/${mangaSearch}`);
  }

  return (
    <div className='text-white flex flex-col text-center items-center justify-center py-10'>
      <h1 className='text-red-600 text-[3rem] xl:text-[4rem] font-bold '>
      オールミーミスト
      </h1>
      <p className='text-zinc-500 font-medium mb-7 text-[1.2rem] max-w-[300px] md:max-w-[400px] xl:max-w-full md:text-[1.4rem]'>Find Manga anywhere, anytime, anyplace</p>
      <form onSubmit={handleSearch}>
        <div className='bg-zinc-800 w-[22rem] xs:w-[30rem] h-[3.5rem] sm:w-[39rem] px-5  justify-between flex rounded-xl'>
          <input
            type="text"
            className='bg-zinc-800 outline-none font-normal w-[25rem] md:w-[34rem] md:h-[3.5rem]'
            placeholder='Search...'
            value={mangaSearch}
            onChange={e => setMangaSearch(e.target.value)}
          />
          <button type="submit"><img src={search} className='w-[22px] h-[22px]' alt="search" /></button>
        </div>
      </form>
      <div className='text-start my-3 '>
        <h2 className='font-normal text-zinc-400'>Trending Searches</h2>
      </div>
      <div className='flex flex-wrap max-w-[700px] items-center justify-center gap-x-3'>
        {topManga.map(manga => (
          <Link key={manga.mal_id} to={`/allmemist/manga/${manga.mal_id}`}>
            <div className='bg-zinc-800 hover:bg-zinc-600 transition duration-75 gap-x-2 rounded-3xl mt-3 flex py-1 px-3'>
              <img src={search} alt="search" className='w-[15px] h-[20px]' />
              <p className='font-normal text-zinc-300 text-[0.8rem]'>{manga.title} ({manga.type})</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HeroRed;
