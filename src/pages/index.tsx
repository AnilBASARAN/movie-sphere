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

  return (
    <Layout>
      <div>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-black"
          />
          <button type="submit">Search</button>
        </form>

        <div id="main">
          {movies.map((movie) => (
            <div key={movie.id} className="movie">
              <img src={`${IMG_URL + movie.poster_path}`} alt={movie.title} />

              <div className="movie-info">
                <h3>{movie.title}</h3>
                <span>{movie.vote_average}</span>
              </div>

              <div className="overview">
                <h3>Overview</h3>
                {movie.overview}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
