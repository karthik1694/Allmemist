import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="bg bg-zinc-900 w-full h-[100vh] px-10 text-white flex flex-col items-start justify-center">
      <h1 className="font-bold text-3xl mb-2">
       <span className="text-blue-700"> 4</span> 
       <span className="text-red-700">0</span> 
       <span className="text-blue-700">4 </span>Not Found</h1>
      <h2 className="text-lg font-normal">It's Okay, its not your problem(or maybe).<br></br>The <a className="text-blue-500 underline" href="https://jikan.moe/">Jikan API</a> only accepts 3 requests per sec unless i pay da money.</h2>
     <h2 className="text-lg font-normal mb-2">You can just restart the page. It will solve the problem.</h2>
      <Link to="/allmemist/">
      <h2 className="text-blue-500 font-normal underline">Go To Home</h2>
      </Link>
    </div>
  );
};

export default Error;
