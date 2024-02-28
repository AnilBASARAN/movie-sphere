import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getMovies, IMG_URL, searchURL } from "@/pages/api/api";
import ToggleText from "@/pages/api/methods/toggleText";
import Pagination from "@/pages/api/methods/pagination";

const Search: React.FC = () => {
  const router = useRouter();
  const { query }: any = router;
  const [currentPage, setCurrentPage] = useState<number>(
    query.page ? parseInt(query.page) : 1
  );
  const id = query.id;
  const [movies, setMovies] = useState<any>("");

  // Pagination
  const goToPage = (page: number) => {
    setCurrentPage(page);
    router.push(`/search/${id}?&page=${page}`);
  };

  // Get The Search Query Method
  const handleSearch = async (page: number) => {
    const data = await getMovies(`${searchURL}&query=${id}&page=${page || 1}`);
    setMovies(data);
  };

  // Get Pages From URL
  useEffect(() => {
    if (query.page) {
      setCurrentPage(parseInt(query.page));
    } else {
      setCurrentPage(1);
    }
    handleSearch(parseInt(query.page));
  }, [query]);

  return (
    <>
      <div className="flex  items-center justify-center text-sm ">
        <div id="main" className="block w-[1000px] m-4 ">
          <div className="text-center border-b border-gray-800 pb-4 ">
            <h1 className="text-gray-300">
              Total Results:{" "}
              <span className="text-gray-300 ml-1">{movies.total_results}</span>
            </h1>
          </div>
          {movies?.results?.map((movie: any) => (
            <div
              key={movie.id}
              className=" flex border-b rounded-sm border-gray-800"
            >
              <Link href={`/movie/${movie.id}`} className=" ">
                <div className=" w-28 mr-4 ">
                  <img
                    src={`${IMG_URL + movie.poster_path}`}
                    alt={movie.title}
                    className=" h-40 m-2 mr-4 hover:border-green-400 border rounded-sm "
                  />
                </div>
              </Link>
              <div className="flex flex-col justify-center m-4  ">
                <div className=" ">
                  <h3 className=" text-xl font-bold  ">
                    <Link
                      href={`/movie/${movie.id}`}
                      className="hover:text-green-400 "
                    >
                      {movie.title}{" "}
                    </Link>
                    <span className="font-thin ml-2">
                      {movie.release_date.slice(0, 4)}
                    </span>{" "}
                  </h3>
                </div>

                <div>
                  <h3 className=" text-sm text-gray-300 ">
                    {movie.title !== movie.original_title && (
                      <span className="mr-1">
                        Original Title: {movie.original_title}{" "}
                      </span>
                    )}

                    <span
                      className={`ml-1 ${
                        movie.vote_average > 7.95
                          ? "vote-high"
                          : movie.vote_average > 4.95
                          ? "vote-mid"
                          : "vote-low"
                      }`}
                    >
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </h3>
                </div>

                <div className="mt-2 text-gray-300  ">
                  <ToggleText key={movie.id} text={movie.overview} />
                </div>
              </div>

              <div className="movie-info ">{}</div>
            </div>
          ))}
        </div>
      </div>
      {movies && movies.total_pages > 1 && (
        <Pagination
          key={movies.total_results}
          movies={movies}
          goToPage={goToPage}
          currentPage={currentPage}
        />
      )}
    </>
  );
};

export default Search;
