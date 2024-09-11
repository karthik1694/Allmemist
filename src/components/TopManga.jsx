import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const TopManga = () => {
  const [topManga, setTopManga] = useState([]);


  useEffect(() => {
    fetch('https://api.jikan.moe/v4/top/manga')
      .then(response => response.json())
      .then(data => {
        setTopManga(data.data); // Assuming the response has a 'data' property
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className='bg bg-zinc-900 flex flex-col min-h-screen'>
      <div className='flex-grow'>
        <Navbar />
        <h1 className='ml-10 mt-5 font-bold text-[30px] text-red-500'>Top Manga</h1>
        <ul>
          <div className='grid px-10 mt-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-5 gap-x-20 items-center'>
            {topManga.map(manga => (
              <div key={manga.mal_id} className='relative w-[225px] h-[318px] group'>
                <Link to={`/allmemist/manga/${manga.mal_id}`}>
                  <img
                    src={manga.images.webp.image_url}
                    alt={manga.title}
                    className='md:w-full w-[160px] h-[250px] md:h-full object-cover opacity-70 rounded-md'
                  />
                  <div className='absolute text-end items-end justify-end transition-transform duration-300 inset-0 flex flex-col p-2 rounded-md'>
                    <div className='text-zinc-300 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-y-[-5%] duration-300 bg-black bg-opacity-70 p-2 rounded-md'>
                      <p className='font-normal text-[0.8rem]'>
                        {manga.synopsis?.length > 100
                          ? `${manga.synopsis.substring(0, 100)}...`
                          : manga.synopsis}
                      </p>
                    </div>
                    <div className='text-zinc-100 flex flex-col bg-black bg-opacity-70 p-2 rounded-md'>
                      <span className='text-zinc-400 text-[0.8rem] font-bold'>{manga.authors?.[0]?.name}</span>
                      <span className='text-[1.1rem] font-bold'>{manga.title} ({manga.type})</span>
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

export default TopManga;
