/* import Layout from "@/components/Layout"; */
import { MainContext } from "./context.js"; // React Context Api Structure
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
  const [activeItem, setActiveItem] = useState<string>("");

  // Toggle Functionality
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Get Animations
  const handleAnimations = () => {
    setCount(1);
    handleMovies({
      id: 16,
      name: "Animation",
    });
  };

  // Search Functionality
  const handleSearch = (e: any) => {
    setCount(1);
    handleMovies(e);
  };

  // Get Genres
  const handleGenres = (e: any) => {
    setCount(1);
    handleMovies(e);
  };

  // Get All The Data Based On Their Type
  const handleMovies = async (genre: any) => {
    if (genre.preventDefault) {
      genre.preventDefault();
      setActiveItem(genre);
      const searchResults = await getMovies(
        `${searchURL}&query=${searchTerm}&page=${count}`
      );
      setMovies(searchResults);
    } else {
      if (genre?.name) {
        setActiveItem(genre);
        const data = await getMovies(`${GENRE_URL}${genre.id}&page=${count}`);
        setMovies(data);
      } else if (genre) {
        setActiveItem(genre);
        const searchResults = await getMovies(
          `${searchURL}&query=${searchTerm}&page=${count}`
        );
        setMovies(searchResults);
      } else {
        setActiveItem("");
        const data = await getMovies(`${API_URL}&page=${count}`);
        setMovies(data);
      }
    }
  };

  useEffect(() => {
    handleMovies(activeItem);
  }, [count]);

  // Refresh page
  const refreshPage = () => {
    window.location.reload();
  };

  // Pagination
  const increaseCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decreaseCount = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  // Fetching Datas To Components Via React Context Api
  const fetchToComponents = {
    movies,
    setMovies,
    searchTerm,
    setSearchTerm,
    count,
    setCount,
    isOpen,
    setIsOpen,
    handleToggle,
    handleSearch,
    API_URL,
    IMG_URL,
    searchURL,
    getMovies,
    animationURL,
    genres,
    GENRE_URL,
    refreshPage,
    handleMovies,
    handleGenres,
    handleAnimations,
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
