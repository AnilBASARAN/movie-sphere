import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { API_URL, getMovies, IMG_URL } from "@/pages/api/api";
import Pagination from "@/pages/api/methods/pagination";
import Stars from "@/components/Stars";

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<any>("");
  const router = useRouter();
  const { query }: any = router;
  const [currentPage, setCurrentPage] = useState<number>(
    query.page ? parseInt(query.page) : 1
  );

  // Pagination
  const goToPage = (page: number) => {
    setCurrentPage(page);
    router.push(`/?&page=${page}`);
  };

  // Get All The Movies Method
  const handleMovies = async (page: any) => {
    const data = await getMovies(`${API_URL}&page=${page || 1}`);
    setMovies(data);
  };

  // Get Pages From URL
  useEffect(() => {
    if (query.page) {
      setCurrentPage(parseInt(query.page));
    } else {
      setCurrentPage(1);
    }
    handleMovies(parseInt(query.page));
  }, [query]);

  return (
    <>
      <div className="flex flex-col items-center justify-start text-sm min-h-[78vh] ">
        <div className="flex w-[1000px] mt-4 border-b  text-gray-400">
          <div className="flex-1">
            <h1>Ratings</h1>
          </div>
          <div className="flex gap-6 ">
            <div>Sort by:</div>
            <button className="hover:text-gray-200  font-semibold">
              When Added <span className="text-xs">&#9660;</span>
            </button>
            <button className="hover:text-gray-200 font-semibold">
              Release Date <span className="text-xs">&#9650;</span>
            </button>
            <button className="hover:text-gray-200 font-semibold">
              Your Rating <span className="text-xs">&#9650;</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7  justify-center w-[1000px] gap-3 m-4">
          {movies?.results?.map((movie: any) => (
            <div>
              <Link
                href={`/movie/${movie.id}`}
                key={movie.id}
                className="movie "
              >
                <div className=" relative flex text-center justify-center cursor-pointer border rounded-sm border-gray-800  hover:border-green-400 shadow-lg ">
                  <img
                    src={`${
                      movie.poster_path
                        ? IMG_URL + movie.poster_path
                        : "/noimage.jpg"
                    }`}
                    alt={movie.title}
                    className=" "
                  />
                  <div className="absolute w-full h-full flex font-bold items-center justify-center opacity-0 bg-slate-950/[.0] transition hover:bg-slate-950/70 hover:opacity-100  ">
                    <h3 className="">{movie.title}</h3>
                  </div>
                </div>
              </Link>
              <Stars rating={3.5} />
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

export default Movies;
