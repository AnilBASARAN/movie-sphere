import { useState, useEffect /* useContext */ } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { /* API_URL, getMovies,  */ IMG_URL } from "@/pages/api/api";
/* import Pagination from "@/pages/api/methods/pagination"; */
import Stars from "@/components/Stars";
import { auth, db } from "@/config/firebase";
import { getDocs, collection, query } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [sortedMovies, setSortedMovies] = useState<any[]>([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const router = useRouter();
  /*   const [currentPage, setCurrentPage] = useState<any>(router?.query?.userId); */
  const [visibleMovies, setVisibleMovies] = useState<number>(28);

  const loadMoreMovies = () => {
    setVisibleMovies((prevVisibleMovies) => prevVisibleMovies + 28);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;
        try {
          const moviesCollectionRef = collection(db, "users", userId, "movies");
          const q = query(moviesCollectionRef);
          const querySnapshot = await getDocs(q);
          const movieData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setMovies(movieData);
          setSortedMovies(movieData);
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      } else {
        // User is signed out
        setMovies([]);
        setSortedMovies([]);
      }
    });

    return () => unsubscribe();
  }, [router.query]);

  /*   useEffect(() => {
    if (router.query) {
      setCurrentPage(router.query.userId);
    } else {
      setCurrentPage(1);
    }
  }, [router.query]); */

  const sortMovies = (key: any) => {
    let direction = "desc";
    if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = "asc";
    }

    const sortedArray = [...movies].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setSortedMovies(sortedArray);
    setSortConfig({ key, direction });
  };

  /*   // Pagination
  const goToPage = (page: number) => {
    setCurrentPage(page);
    router.push(`/?&page=${page}`);
  };

  // Get All The Movies Method
  const handleMovies = async (page: any) => {
    const data = await getMovies(`${API_URL}&page=${page || 1}`);
    setMovies(data);
  }; */

  console.log(auth?.currentUser);

  return (
    <>
      <div className="flex flex-col items-center justify-start text-sm min-h-[78vh] ">
        {sortedMovies && sortedMovies.length > 0 && (
          <div className="sm:flex w-full max-w-[1000px] mt-4 border-b border-b-slate-600 mx-4 px-4 lg:px-0 text-gray-400 text-[10px] md:text-sm font-semibold">
            <div className=" flex-1  ">
              <h1 className="">
                {sortedMovies.length}{" "}
                {sortedMovies.length > 1 ? "Films" : "Film"}
              </h1>
            </div>
            <div className="flex  gap-1 sm:gap-2  md:gap-6  ">
              <button
                onClick={() => sortMovies("whenRated")}
                className="hover:text-gray-200  focus:text-green-600 text-start "
              >
                When Rated{" "}
                <span className="text-xs">
                  {sortConfig.key === "whenRated"
                    ? sortConfig.direction === "asc"
                      ? "▲"
                      : "▼"
                    : "▲"}
                </span>
              </button>

              <button
                onClick={() => sortMovies("releaseDate")}
                className="hover:text-gray-200  focus:text-green-600 text-start"
              >
                Release Date{" "}
                <span className="text-xs">
                  {sortConfig.key === "releaseDate"
                    ? sortConfig.direction === "asc"
                      ? "▲"
                      : "▼"
                    : "▲"}
                </span>
              </button>
              <button
                onClick={() => sortMovies("userRating")}
                className="hover:text-gray-200  focus:text-green-600 text-start"
              >
                Your Rating{" "}
                <span className="text-xs">
                  {sortConfig.key === "userRating"
                    ? sortConfig.direction === "asc"
                      ? "▲"
                      : "▼"
                    : "▲"}
                </span>
              </button>
              <button
                onClick={() => sortMovies("averageRating")}
                className="hover:text-gray-200  focus:text-green-600 text-start"
              >
                Average Rating{" "}
                <span className="text-xs">
                  {sortConfig.key === "averageRating"
                    ? sortConfig.direction === "asc"
                      ? "▲"
                      : "▼"
                    : "▲"}
                </span>
              </button>
            </div>
          </div>
        )}
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-7 text-center  justify-center max-w-[1000px] gap-3 m-4">
          {sortedMovies &&
            sortedMovies.slice(0, visibleMovies).map((movie) => (
              <div key={movie.movieId}>
                <Link href={`/movie/${movie.movieId}`} className="movie">
                  <div className="relative flex  justify-center h-[82%] md:h-[88%]  cursor-pointer border rounded-sm border-gray-800 hover:border-green-400 shadow-lg group">
                    <img
                      src={
                        movie.posterPath
                          ? `${IMG_URL}${movie.posterPath}`
                          : "/noimage.jpg"
                      }
                      alt={movie.title || "No Title"}
                      className=""
                    />
                    <div className="absolute w-full h-full flex font-bold items-center justify-center opacity-0 bg-slate-950/[.0] transition group-hover:bg-slate-950/70 group-hover:opacity-100">
                      <h3 className="">{movie.title}</h3>
                    </div>
                  </div>
                </Link>
                <Stars rating={movie.userRating} />
              </div>
            ))}
        </div>
        {sortedMovies?.length == 0 && (
          <div className="flex justify-center items-center align-middle text-xl text-gray-200 ">
            There is no movie here...
          </div>
        )}
        {visibleMovies < sortedMovies.length && (
          <button
            onClick={loadMoreMovies}
            className="mb-4 px-8 py-2 bg-green-700 text-white rounded hover:bg-green-500 transition"
          >
            Load More
          </button>
        )}
      </div>
      {/*  {movies && movies.total_pages > 1 && (
        <Pagination
          key={movies.total_results}
          movies={movies}
          goToPage={goToPage}
          currentPage={currentPage}
        />
      )} */}
    </>
  );
};

export default Movies;
