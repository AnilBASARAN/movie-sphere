/* import Layout from "@/components/Layout"; */
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import {
  API_URL,
  IMG_URL,
  searchURL,
  getMovies,
  Movie,
  animationURL,
  genres,
} from "@/pages/api/api";

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeItem, setActiveItem] = useState<string>("");
  const [count, setCount] = useState<number>(1);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Get the Data
  useEffect(() => {
    if (!searchTerm) {
      const fetchMovies = async () => {
        const data = await getMovies(`${API_URL}&page=${count}`);
        setMovies(data);
      };

      fetchMovies();
    } else {
      const fetchMovies = async () => {
        const searchResults = await getMovies(
          `${searchURL}&query=${searchTerm}&page=${count}`
        );
        setMovies(searchResults);
      };

      fetchMovies();
    }
  }, [count]);

  // Pagination
  const increaseCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decreaseCount = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  // Search Functionality
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (searchTerm) {
      const searchResults = await getMovies(searchURL + "&query=" + searchTerm);
      setMovies(searchResults);
    } else {
      const popularMovies = await getMovies(API_URL);
      setMovies(popularMovies);
    }
  };

  /* const handleAnimations = async (e: React.FormEvent) => {
    e.preventDefault();
    const handleResult = await getMovies(animationURL);
    setMovies(handleResult);
    setActiveItem("animations");
  };

  const allMovies = async (e: React.FormEvent) => {
    e.preventDefault();
    const handleResult = await getMovies(API_URL);
    setMovies(handleResult);
    setActiveItem("home");
  }; */

  return (
    <>
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
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M21 8.77217L14.0208 1.79299C12.8492 0.621414 10.9497 0.621413 9.77817 1.79299L3 8.57116V23.0858H10V17.0858C10 15.9812 10.8954 15.0858 12 15.0858C13.1046 15.0858 14 15.9812 14 17.0858V23.0858H21V8.77217ZM11.1924 3.2072L5 9.39959V21.0858H8V17.0858C8 14.8767 9.79086 13.0858 12 13.0858C14.2091 13.0858 16 14.8767 16 17.0858V21.0858H19V9.6006L12.6066 3.2072C12.2161 2.81668 11.5829 2.81668 11.1924 3.2072Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className="flex relative hover:bg-blue-950 h-16 w-32 ">
            <button
              /*   onClick={allMovies} */
              /* className={
                activeItem === "home" ? "text-yellow-400" : "text-white"
              } */ className="text-center items-center w-full"
            >
              All movies
            </button>
          </div>
          <div className="flex relative hover:bg-blue-950 h-16 w-32 ">
            <button
              /*  onClick={handleAnimations} */
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
                  ? "absolute top-full -left-[150px] bg-blue-950 pt-2 pb-2 rounded-bl-sm rounded-br-sm grid grid-cols-3 w-[420px] "
                  : ""
              }
              onMouseLeave={handleToggle}
            >
              {isOpen &&
                genres.map((genre, index) => (
                  <button
                    key={index}
                    id={genre.name}
                    className="text-left pl-2 border-l-[1px] hover:text-yellow-400 "
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

      <div className="flex justify-center text-sm ">
        <div
          id="main"
          className="grid grid-cols-5 justify-center  w-[1000px] gap-3 m-4"
        >
          {movies?.results?.map((movie) => (
            <div key={movie.id} className="movie ">
              <div className=" relative flex text-center justify-center cursor-pointer border rounded-sm border-gray-400  hover:border-green-400 ">
                <img
                  src={`${IMG_URL + movie.poster_path}`}
                  alt={movie.title}
                  className=" "
                />
                <div className="absolute w-full h-full flex font-bold items-center justify-center opacity-0 bg-slate-950/[.0] transition hover:bg-slate-950/70 hover:opacity-100  ">
                  <h3 className="">{movie.title}</h3>
                </div>
              </div>

              <div className="movie-info ">
                {/* {<span className="vote">{movie.vote_average.toFixed(1)}</span>} */}
              </div>

              {/*  <div className="overview h-6 overflow-hidden">
                {movie.overview}
              </div> */}
            </div>
          ))}
        </div>
      </div>
      {console.log(movies)}
      {movies && movies.total_pages > 1 && (
        <div className="flex justify-center gap-10 mb-4">
          <button onClick={decreaseCount} value="prev">
            Prev
          </button>
          <h3>{count}</h3>
          <button onClick={increaseCount} value="next">
            Next
          </button>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Home;

// Might wanna try Splide to make carousels
// Check out React context api
