import React from "react";
import { MainContext } from "@/components/context";
import { useContext } from "react";

function Header() {
  const {
    searchTerm,
    setSearchTerm,
    isOpen,
    handleToggle,
    handleSearch,
    genres,
    refreshPage,
    handleGenres,
    handleAnimations,
  } = useContext(MainContext);

  return (
    <header className="flex justify-center gap-12 items-center h-16 sticky top-0 left-0 right-0 bg-slate-950 z-50 ">
      <div className="flex justify-center  items-center">
        <div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21 8.77217L14.0208 1.79299C12.8492 0.621414 10.9497 0.621413 9.77817 1.79299L3 8.57116V23.0858H10V17.0858C10 15.9812 10.8954 15.0858 12 15.0858C13.1046 15.0858 14 15.9812 14 17.0858V23.0858H21V8.77217ZM11.1924 3.2072L5 9.39959V21.0858H8V17.0858C8 14.8767 9.79086 13.0858 12 13.0858C14.2091 13.0858 16 14.8767 16 17.0858V21.0858H19V9.6006L12.6066 3.2072C12.2161 2.81668 11.5829 2.81668 11.1924 3.2072Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="flex relative hover:bg-blue-950 h-16 w-32 ">
          <button
            onClick={refreshPage}
            /* className={
            activeItem === "home" ? "text-yellow-400" : "text-white"
          } */ className="text-center items-center w-full"
          >
            All movies
          </button>
        </div>
        <div className="flex relative hover:bg-blue-950 h-16 w-32 ">
          <button
            onClick={handleAnimations}
            className={
              /* activeItem === "animations" ? "text-yellow-400" : "text-white" */ "text-center items-center w-full "
            }
          >
            Animations
          </button>
        </div>
        <div className="flex relative hover:bg-blue-950 h-16 w-24 ">
          <button
            onMouseEnter={handleToggle}
            onMouseLeave={handleToggle}
            className=" text-center items-center w-full ease-out "
          >
            Genres
          </button>
          <div
            className={
              isOpen
                ? "absolute top-full -left-[150px] bg-blue-950 p-3  rounded-bl-sm rounded-br-sm grid grid-cols-3 w-[420px] "
                : ""
            }
            onMouseLeave={handleToggle}
          >
            {isOpen &&
              genres.map((genre: any, index: any) => (
                <button
                  key={index}
                  id={genre.name}
                  className="text-left pl-2 border-l-[1px] hover:text-yellow-400 "
                  onClick={() => handleGenres(genre)}
                >
                  {genre.name}
                </button>
              ))}
          </div>
        </div>
      </div>

      <div>
        <form onSubmit={handleSearch}>
          <input
            type="search"
            id="search"
            name="search"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 h-8 rounded-3xl p-2 text-m text-black outline-none"
          />
        </form>
      </div>
      <div>
        <button>Login</button>
      </div>
    </header>
  );
}

export default Header;
