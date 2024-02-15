/* import Layout from "@/components/Layout"; */
import { MainContext } from "./context.js";
import Header from "@/components/Header";
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
  GENRE_URL,
} from "@/pages/api/api";

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [count, setCount] = useState<number>(1);
  const [isOpen, setIsOpen] = useState(false);
  /* const [activeItem, setActiveItem] = useState<string>(""); */
  /*  const [isHandleClick, setIsHandleClick] = useState(false); */

  const handleGenres = (id: any) => {
    const fetchMovies = async () => {
      const data = await getMovies(`${GENRE_URL}${id}&page=${count}`);
      setMovies(data);
    };
    fetchMovies();
  };

  // Toggle functionality
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Get the Data
  const fetchMovies = async () => {
    if (!searchTerm) {
      const data = await getMovies(`${API_URL}&page=${count}`);
      setMovies(data);
    } else {
      const searchResults = await getMovies(
        `${searchURL}&query=${searchTerm}&page=${count}`
      );
      setMovies(searchResults);
    }
  };

  useEffect(() => {
    fetchMovies();
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

  const fetchToComponents = {
    movies,
    setMovies,
    searchTerm,
    setSearchTerm,
    count,
    setCount,
    isOpen,
    setIsOpen,
    handleGenres,
    handleToggle,
    handleSearch,
    fetchMovies,
    API_URL,
    IMG_URL,
    searchURL,
    getMovies,
    animationURL,
    genres,
    GENRE_URL,
  };

  return (
    <MainContext.Provider value={fetchToComponents}>
      <Header />
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
    </MainContext.Provider>
  );
};

export default Home;

// Might wanna try Splide to make carousels
// Check out React context api
