import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const TopAnime = () => {
  const [topAnime, setTopAnime] = useState([]);

  useEffect(() => {
    fetch('https://api.jikan.moe/v4/top/anime')
      .then(response => response.json())
      .then(data => {
        setTopAnime(data.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className='bg bg-zinc-900 flex flex-col min-h-screen'>
      <div className='flex-grow'>
        <Navbar />
        <h1 className='ml-10 mt-5 font-bold text-[30px] text-red-600'>Top Anime</h1>
        <ul>
          <div className='grid md:px-10 px-5 md:pr-20 mt-8  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-5 md:gap-x-20 items-center'>
            {topAnime.map(anime => (
              <div key={anime.mal_id} className='relative w-[225px] h-[318px] group'>
                <Link to={`/allmemist/anime/${anime.mal_id}`}>
                  <img
                    src={anime.images.webp.image_url}
                    alt={anime.title}
                    className='md:w-full w-[160px] h-[250px] md:h-full object-cover opacity-70 rounded-md'
                  />
                  <div className='absolute text-start items-center justify-center sm:items-start sm:justify-end transition-transform duration-300 inset-0 flex flex-col p-2 rounded-md'>
                    <div className='text-zinc-300 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-y-[-5%] duration-300 bg-black bg-opacity-70 p-2 rounded-md'>
                      <p className='font-normal text-[0.8rem]'>
                        {anime.synopsis.length > 100 ? `${anime.synopsis.substring(0, 100)}...` : anime.synopsis}
                      </p>
                    </div>

                    <div className=' text-zinc-100 flex flex-col bg-black bg-opacity-70 p-2 rounded-md'>
                      <span className='text-zinc-400 text-[0.8rem] font-bold'>{anime.studios?.[0]?.name}</span>
                      <span className='text-[1.1rem] font-bold'>{anime.title} ({anime.type})</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default TopAnime;
