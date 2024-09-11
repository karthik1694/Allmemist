// src/components/Results.jsx
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar'
import { useParams, Link } from 'react-router-dom';

const ResultsManga = () => {
  const { searchid } = useParams();
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loading,setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const fetchResults = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.jikan.moe/v4/manga?q=${searchid}&sfw`);
      const data = await response.json();
      setResults(data.data);
      setHasMore(data.pagination.has_next_page);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);

    }
  };

  useEffect(() => {
    fetchResults(page);
  }, [searchid, page]);

  const handleNextPage = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  if (loading) {
    return <div className='w-full h-screen bg bg-zinc-900'>Loading...</div>;
  }

  return (
    <div className='bg bg-zinc-900 flex flex-col min-h-screen'>
        <div className='flex-grow'>
        <Navbar />
      <h1 className='ml-10 mt-5 font-bold text-[30px] text-red-500'>Results for "{searchid}"</h1>
      <ul>
    <div className='grid md:px-10 px-5 md:pr-20 mt-8  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-5 md:gap-x-20 items-center'>
        {results.map(manga => (
          <div key={manga.mal_id} className='relative w-[225px] h-[318px] group'>
          <Link to={`/allmemist/manga/${manga.mal_id}`}>
          <img
                    src={manga.images.webp.image_url}
                    alt={manga.title}
                    className='md:w-full w-[160px] h-[250px] md:h-full object-cover rounded-md'
                  />
                  <div className='absolute text-start items-center justify-center sm:items-start sm:justify-end transition-transform duration-300 inset-0 flex flex-col p-2 rounded-md'>
                  <div className='text-zinc-300 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-y-[-5%] duration-300 bg-black bg-opacity-70 p-2 rounded-md'>
                      <p className='font-normal text-[0.8rem]'>
                      {manga.synopsis && manga.synopsis.length > 100 
                      ? `${manga.synopsis.substring(0, 100)}...` 
                      : manga.synopsis || 'No synopsis available'}
                      </p>
                    </div>

                    <div className=' text-zinc-100 flex flex-col bg-black bg-opacity-70 p-2 rounded-md'>
                      <span className='text-zinc-400 text-[0.8rem] font-bold'>{manga.studios?.[0]?.name}</span>
                      <span className='text-[1.1rem] font-bold'>{manga.title} ({manga.type})</span>
                    </div>
                  </div>
          </Link>
          </div>
        ))}
    </div>
    </ul>

      <div className='items-center justify-center mt-10 flex gap-x-3 '>
        <button className='text-white p-3 bg-zinc-800 hover:bg-zinc-700 transition rounded-lg font-bold' onClick={handlePreviousPage} disabled={page === 1}>
          {"<<"} Previous
        </button>
        <button className='text-white p-3 bg-zinc-800 hover:bg-zinc-700 transition rounded-lg font-bold' onClick={handleNextPage} disabled={!hasMore}>
         Next {">>"}
        </button>
      </div>
      </div>
    </div>
  );
};

export default ResultsManga;
