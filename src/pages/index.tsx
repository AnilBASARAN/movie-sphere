import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import { API_URL, IMG_URL, searchURL, getMovies, Movie } from "@/pages/api/api";

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getMovies(API_URL);
      setMovies(data);
    };

    fetchMovies();
  }, []);

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

  console.log(movies);

  return (
    <Layout>
      <div className="flex justify-center text-sm ">
        {/* <form onSubmit={handleSearch}>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-black"
          />
          <button type="submit">Search</button>
        </form> */}

        <div
          id="main"
          className="grid grid-cols-5 justify-center  w-[1000px] gap-3 m-4"
        >
          {movies.map((movie) => (
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
                {/* <span>{movie.vote_average}</span> */}
              </div>

              {/*  <div className="overview h-6 overflow-hidden">
                {movie.overview}
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
