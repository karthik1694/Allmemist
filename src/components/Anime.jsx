import React, { useEffect, useState, useRef } from "react";
import Navbar from "./Navbar";
import play from "../assets/play.svg";
import { useParams, Link } from "react-router-dom";

const Info = () => {
  const { searchid } = useParams();
  const [animeInfo, setAnimeInfo] = useState({});
  const [characterlist, setCharacterList] = useState([]);
  const [themes, setthemes] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const [visibleOpenings, setVisibleOpenings] = useState(3);
  const [visibleEndings, setVisibleEndings] = useState(3);
  const [isShowingMoreOpenings, setIsShowingMoreOpenings] = useState(false);
  const [isShowingMoreEndings, setIsShowingMoreEndings] = useState(false);

  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleShowMoreOpenings = () => {
    setVisibleOpenings((prev) => prev + 100);
    setIsShowingMoreOpenings(true);
  };

  const handleShowLessOpenings = () => {
    setVisibleOpenings(3);
    setIsShowingMoreOpenings(false);
  };

  const handleShowMoreEndings = () => {
    setVisibleEndings((prev) => prev + 100);
    setIsShowingMoreEndings(true);
  };

  const handleShowLessEndings = () => {
    setVisibleEndings(3);
    setIsShowingMoreEndings(false);
  };

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime/${searchid}/full`)
      .then((response) => response.json())
      .then((data) => {
        setAnimeInfo(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setAnimeInfo({});
        setLoading(false);
      });
  }, [searchid]);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime/${searchid}/recommendations`)
      .then((response) => response.json())
      .then((data) => {
        const recommlist = data.data.slice(0, 6);
        setRecommendations(recommlist);
      })
      .catch((error) => {
        console.error("Error fetching recommendations:", error);
        setRecommendations([]);
      });
  }, [searchid]);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime/${searchid}/characters`)
      .then((response) => response.json())
      .then((data) => {
        const characterlistinfo = data.data.slice(0, 9);
        setCharacterList(characterlistinfo);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setCharacterList([]);
        setLoading(false);
      });
  }, [searchid]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        toggleModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  if (loading) {
    return <div className="w-full h-screen bg bg-zinc-900">Loading...</div>;
  }

  const synopsis = animeInfo.synopsis || "";
  const textToShow = isExpanded
    ? synopsis
    : synopsis.substring(0, synopsis.length / 2);
  const trailerUrl = animeInfo.trailer?.embed_url || "";

  return (
    <div className="bg bg-zinc-900 flex flex-col min-h-screen">
      <div className="flex-grow">
        <Navbar />
        <div className="flex my-20 gap-x-5 sm:gap-x-7">
          <div className="ml-4 sm:ml-6 md:ml-10 lg:ml-24 xl:ml-40">
            <div className="sm:w-[250px] w-[130px] h-[220px] xs:w-[150px] xs:h-[250px] sm:h-[350px] overflow-hidden flex justify-center items-center">
              <img
              className="w-full h-full object-cover"
                src={animeInfo.images?.jpg?.image_url || ""}
                alt={animeInfo.title || "Anime Image"}
              />
            </div>
            <div className="mt-5">
              <button
                className="flex items-center mb-5 justify-center text-white bg-red-600 transition hover:bg-red-700 px-[16px] xs:px-[26px] sm:px-[61px] py-2 rounded-md"
                onClick={toggleModal}
              >
                <img src={play} className="w-5 h-5 mr-2" alt="Play" />
                <span className="lg:font-normal">Watch&nbsp;Trailer</span>
              </button>
              <h1 className="text-[17px] text-zinc-300 font-medium">
                Rank:
                <span className="text-[17px] text-white font-normal">
                  {" "}
                  {animeInfo.rank || "-"}
                </span>
              </h1>
              <h1 className="text-[17px] text-zinc-300 font-medium">
                Score:
                <span className="text-[17px] text-white font-normal">
                  {" "}
                  {animeInfo.score || "-"}/10
                </span>
              </h1>
              <h1 className="text-[17px] text-zinc-300 font-medium">
                Status:
                <span className="text-[17px] text-white font-normal">
                  {" "}
                  {animeInfo.status || "-"}
                </span>
              </h1>
              <h1 className="text-[17px] text-zinc-300 font-medium">
                Source:
                <span className="text-[17px] text-white font-normal">
                  {" "}
                  {animeInfo.source || "-"}
                </span>
              </h1>
              <h1 className="text-[17px] text-zinc-300 font-medium">
                Episodes:
                <span className="text-[17px] text-white font-normal">
                  {" "}
                  {animeInfo.episodes || "-"}
                </span>
              </h1>
              <h1 className="text-[17px] text-zinc-300 font-medium">
                Aired:
                <span className="text-[17px] text-white font-normal">
                  {" "}
                  {animeInfo.aired.string || "-"}
                </span>
              </h1>
              <h1 className="text-[17px] text-zinc-300 font-medium">
                Rating:
                <span className="text-[17px] text-white font-normal">
                  {" "}
                  {animeInfo.rating || "-"}
                </span>
              </h1>
              <h1 className="text-[17px] text-zinc-300 font-medium">
                Duration:
                <span className="text-[17px] text-white font-normal">
                  {" "}
                  {animeInfo.duration || "-"}.
              </span>
              </h1>
            </div>
          </div>
          <div>
            <ul className="flex flex-wrap gap-x-5">
              {animeInfo.genres?.map((genre, index) => (
                <li
                  key={genre.mal_id}
                  className="px-3 py-1 bg-red-800 mt-3 bg-opacity-30 text-red-500 text-[12px] rounded-xl font-bold"
                >
                  {genre.name}
                </li>
              ))}
            </ul>
            <h1 className="text-white max-w-[700px] mt-2 font-medium text-[30px] md:text-[35px] lg:text-[40px]">
              {animeInfo.title} ({animeInfo.type})
            </h1>
            <h2 className="text-white font-normal mr-12 md:mr-0 max-w-[700px] text-[16px] md:text-[20px]">
              {animeInfo.title_english} · {animeInfo.title_japanese}
            </h2>
            <h2 className="text-zinc-300 font-normal mr-12 text-[16px] md:text-[20px]">
              {animeInfo.studios?.[0]?.name} · {animeInfo.season}{" "}
              {animeInfo.year}
            </h2>
            <div className="mr-5 xs:mr-20 lg:mr-28 xl:mr-40">
              <p className="text-zinc-300 mt-5 text-[14px] md:text-[16px] font-normal">
                {textToShow}
                {!isExpanded && "..."}
              </p>
              <button
                className="text-white mt-3 p-2 md:p-3 bg-zinc-800 hover:bg-zinc-700 transition rounded-lg font-bold"
                onClick={toggleReadMore}
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
              <div className="hidden sm:block">
              <h1 className="text-zinc-100 mt-7 font-normal text-[23px]  md:text-[26px]">
              Characters:
            </h1>
            <ul className="grid grid-cols-2 md:grid-cols-3 max-w-[900px] mt-5 gap-y-2 gap-x-5">
              {characterlist.map((character) => (
                <li key={character.character.mal_id} className="text-white">
                  <div className="flex items-center gap-x-3">
                    <img
                      src={character.character.images.webp.image_url}
                      alt={character.character.name}
                      className="w-[55px] h-[80px]"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium  text-red-600 max-w-[200px] text-[17px] md:text-[20px]">
                        {character.character.name}
                      </span>
                      <span className="font-normal text-zinc-200 text-[12px] md:text-[13px]">
                        {character.role}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <h1 className="text-zinc-100 mt-5 font-normal text-[23px]  md:text-[26px]">
              Streaming on:
            </h1>
            <ul className="grid grid-cols-5 max-w-[900px] mt-5 gap-y-2 gap-x-5">
              {animeInfo.streaming?.map((streaming) => (
                <a href={streaming.url} key={streaming.name}>
                  <li className="hover:text-red-800 hover:underline transition text-red-600 font-normal">
                    {streaming.name}
                  </li>
                </a>
              ))}
            </ul>
            
            <h1 className="text-zinc-100 mt-7 font-normal text-[23px]  md:text-[26px]">
              Recommendations:
            </h1>
            <ul className="grid grid-cols-3 max-w-[900px] mr-10 mt-5 gap-y-10 gap-x-5">
              {recommendations.map((anime) => (
                <div
                  key={anime.entry.mal_id}
                  className="relative w-[225px] h-[318px] group"
                >
                  <Link to={`/allmemist/anime/${anime.entry.mal_id}`}>
                    <img
                      src={anime.entry.images.webp.image_url}
                      alt={anime.entry.title}
                      className="md:w-full w-[160px] h-[250px] md:h-full object-cover rounded-md"
                    />
                    <div className="absolute text-start items-center justify-center sm:items-start sm:justify-end transition-transform duration-300 inset-0 flex flex-col p-2 rounded-md">
                      <div className=" text-zinc-100 flex flex-col bg-black bg-opacity-70 p-2 rounded-md">
                        <span className="text-zinc-400 text-[0.8rem] font-bold">
                          {anime.studios?.[0]?.name}
                        </span>
                        <span className="text-[1.1rem] font-medium">
                          {anime.entry.title}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </ul>
              </div>

            </div>
          </div>
      
        </div>
        <div className="block ml-4 sm:hidden">
        <h1 className="text-zinc-100 mt-7 font-normal text-[23px]  md:text-[26px]">
              Characters:
            </h1>
            <ul className="grid grid-cols-2 md:grid-cols-3 max-w-[900px] mt-5 gap-y-2 gap-x-5">
              {characterlist.map((character) => (
                <li key={character.character.mal_id} className="text-white">
                  <div className="flex items-center gap-x-3">
                    <img
                      src={character.character.images.webp.image_url}
                      alt={character.character.name}
                      className="w-[55px] h-[80px]"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium  text-blue-500 max-w-[200px] text-[17px] md:text-[20px]">
                        {character.character.name}
                      </span>
                      <span className="font-normal text-zinc-200 text-[12px] md:text-[13px]">
                        {character.role}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <h1 className="text-zinc-100 mt-5 font-normal text-[23px]  md:text-[26px]">
              Streaming on:
            </h1>
            <ul className="grid grid-cols-3 sm:grid-cols-5 max-w-[900px] mt-5 gap-y-2 gap-x-5">
              {animeInfo.streaming?.map((streaming) => (
                <a href={streaming.url} key={streaming.name}>
                  <li className="hover:text-blue-600 hover:underline transition text-blue-500 font-normal">
                    {streaming.name}
                  </li>
                </a>
              ))}
            </ul>

            <div className="grid grid-cols-2 mr-4 xs:mr-6 md:mr-10 lg:mr-24 xl:mr-40 gap-x-10">
              <div>
                <h1 className="text-zinc-100 mt-7 font-normal text-[23px]  md:text-[26px]">
                  Openings:
                </h1>
                <ul className="grid grid-rows-1 max-w-[900px] mt-5 gap-y-2 gap-x-5">
                  {themes.openings
                    ?.slice(0, visibleOpenings)
                    .map((op, index) => (
                      <li
                        key={index}
                        className="transition text-zinc-400 text-[0.9rem] lg:text-[1rem] font-normal"
                      >
                        {op}
                      </li>
                    ))}
                </ul>
                {isShowingMoreOpenings ? (
                  <button
                    onClick={handleShowLessOpenings}
                    className="mt-2 p-2 font-bold text-white"
                  >
                    Show Less
                  </button>
                ) : (
                  visibleOpenings < (themes.openings?.length || 0) && (
                    <button
                      onClick={handleShowMoreOpenings}
                      className="mt-2 p-2 font-bold text-white"
                    >
                      Show More
                    </button>
                  )
                )}
              </div>
              <div>
                <h1 className="text-zinc-100 mt-7 font-normal text-[23px]  md:text-[26px]">
                  Endings:
                </h1>
                <ul className="grid grid-rows-1 max-w-[900px] mt-5 gap-y-2 gap-x-5">
                  {themes.endings
                    ?.slice(0, visibleEndings)
                    .map((end, index) => (
                      <li
                        key={index}
                        className="transition text-zinc-400 font-normal"
                      >
                        {end}
                      </li>
                    ))}
                </ul>
                {isShowingMoreEndings ? (
                  <button
                    onClick={handleShowLessEndings}
                    className="mt-2 p-2 font-bold text-white"
                  >
                    Show Less
                  </button>
                ) : (
                  visibleEndings < (themes.endings?.length || 0) && (
                    <button
                      onClick={handleShowMoreEndings}
                      className="mt-2 p-2 font-bold text-white"
                    >
                      Show More
                    </button>
                  )
                )}
              </div>
            </div>
            <h1 className="text-zinc-100 mt-7 font-normal text-[23px]  md:text-[26px]">
              Recommendations:
            </h1>
            <ul className="grid grid-cols-3 max-w-[900px] mr-10 mt-5 gap-y-10 gap-x-5">
              {recommendations.map((anime) => (
                  <Link to={`/allmemist/anime/${anime.entry.mal_id}`}>
                    <img
                      src={anime.entry.images.webp.image_url}
                      alt={anime.entry.title}
                      className="md:w-full w-[160px] h-[250px] md:h-full object-cover rounded-md"
                    />
                        <span className="text-[1.1rem] text-zinc-100 font-medium">
                          {anime.entry.title}
                        </span>
                  </Link>
              ))}
            </ul>
        </div>
      </div>

      {/* Modal for trailer */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div ref={modalRef} className="relative p-4 rounded-lg w-[1000px]">
            <button
              className="absolute top-2 right-2 text-2xl font-bold"
              onClick={toggleModal}
            >
              ×
            </button>
            <iframe
              src={trailerUrl}
              title="Trailer"
              width="100%"
              height="500"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Info;
