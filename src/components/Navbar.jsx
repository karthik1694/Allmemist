import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../assets/logo.svg";
import arrdown from "../assets/arrdown.svg";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon} from '@heroicons/react/16/solid'


const Navbar = () => {

  return (
    <nav className='w-full px-5 md:px-12 py-5 text-white flex items-center justify-between'>
      <NavLink to="/allmemist/">
        <img src={logo} alt="logo" className='w-[60px] h-[60px]' />
      </NavLink>
      <div className='flex gap-x-10'>
        <div>        
          <Menu>
        <MenuButton className="inline-flex hover:text-zinc-200 transition items-center py-3 rounded-md font-normal text-zinc-400">
         Anime
         <ChevronDownIcon className="size-5 fill-white/60" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 origin-top-right rounded-xl border border-white/5 bg-zinc-800 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <MenuItem>
            <button className="group  font-normal flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
            <NavLink to="/allmemist">
              <span>Anime Search</span>
            </NavLink>
            </button>
          </MenuItem>
          <MenuItem>
            <button className="group  font-normal flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
            <NavLink to="/allmemist/topanime">
              <span>Top Anime</span>
            </NavLink>
            </button>
          </MenuItem>
        </MenuItems>
      </Menu> 
        </div>
        <div>
            
        <Menu>
        <MenuButton className="inline-flex hover:text-zinc-200 transition items-center py-3 rounded-md font-normal text-zinc-400">
          Manga
          <ChevronDownIcon className="size-5 fill-white/60" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 origin-top-right rounded-xl border border-white/5 bg-zinc-800 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
         <MenuItem>
            <button className="group  font-normal flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
            <NavLink to="/allmemist/mangasearch">
              <span>Manga Search</span>
            </NavLink>
            </button>
          </MenuItem>
          <MenuItem>
            <button className="group  font-normal flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
            <NavLink to="/allmemist/topmanga">
              <span>Top Manga</span>
            </NavLink>
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
