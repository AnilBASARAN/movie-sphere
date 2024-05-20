import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { API_URL, getMovies, IMG_URL } from "@/pages/api/api";
import Pagination from "@/pages/api/methods/pagination";
import Stars from "@/components/Stars";
import { auth, db } from "@/config/firebase";
import { getDocs, collection, query } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<any>(router?.query?.userId);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;
        console.log(userId);
        try {
          const moviesCollectionRef = collection(db, "users", userId, "movies");
          const q = query(moviesCollectionRef);
          const querySnapshot = await getDocs(q);
          const movieData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setMovies(movieData);
          console.log(movieData);
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      } else {
        // User is signed out
        setMovies([]);
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, [router.query]); // Remove auth.currentUser from dependency array

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

  // Get Pages From URL
  useEffect(() => {
    if (router.query) {
      setCurrentPage(router.query.userId);
    } else {
      setCurrentPage(1);
    }
  }, [router.query]);

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
          {movies &&
            movies.map((movie: any) => (
              <div>
                <Link
                  href={`/movie/${movie.movieId}`}
                  key={movie.id}
                  className="movie "
                >
                  <div className=" relative flex text-center justify-center cursor-pointer border rounded-sm border-gray-800  hover:border-green-400 shadow-lg ">
                    <img
                      src={`${
                        movie.posterPath
                          ? IMG_URL + movie.posterPath
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
                <Stars rating={movie.userRating} />
              </div>
            ))}
        </div>
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
