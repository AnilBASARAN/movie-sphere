import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { GENRE_URL, getMovies, IMG_URL, genres } from "@/pages/api/api";
import Pagination from "@/pages/api/methods/pagination";
import Navigator from "@/components/Header/Navigator";

const Genres: React.FC = () => {
  const [selectedFilm,setSelectedFilm] = useState("Action");
  const router = useRouter();
  const { query }: any = router;
  const [currentPage, setCurrentPage] = useState<number>(
    query.page ? parseInt(query.page) : 1
  );
  const [movies, setMovies] = useState<any>("");

  // Pagination
  const goToPage = (page: number) => {
    setCurrentPage(page);
    router.push(`/genres/${query.id}?&page=${page}`);
  };

  // Get The Genres From Query And Fetch Method
  const handleGenres = async (page: number) => {
    const filteredGenre = genres.find((genre) => genre.name === query.id);
    if (filteredGenre) {
      const data = await getMovies(
        `${GENRE_URL}${filteredGenre.id}&page=${page || 1}`
      );
      setMovies(data);
    }
  };

  const allGenres = [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 37,
      name: "Western",
    },
  ];

  // Get Pages From URL
  useEffect(() => {
    if (query.page) {
      setCurrentPage(parseInt(query.page));
    } else {
      setCurrentPage(1);
    }
    handleGenres(parseInt(query.page));
  }, [query]);

  return (
    <>
      <div className="flex flex-col items-center justify-center text-sm min-h-[78vh] ">

{/*       <div className="flex flex-wrap gap-2">
  {allGenres.map(({ id, name }, index) => (
    <div
      key={id || index}
      className="badge mx-1 my-1 badge-secondary cursor-pointer"
      onClick={() => setSelectedFilm(name)}
    >
      {name}
    </div>
  ))}
</div> */}
  <Navigator selectedTab={selectedFilm} setSelectedTab={setSelectedFilm} />
        <div
          id="main"
          className="grid grid-cols-4  lg:grid-cols-5 justify-center w-full max-w-[1000px] gap-3 m-4"
        >
          {movies?.results?.map((movie: any) => (
            <Link href={`/movie/${movie.id}`} key={movie.id} className="movie ">
              <div className=" relative flex text-center justify-center cursor-pointer border rounded-sm border-gray-400 h-full hover:border-green-400 ">
                <img
                  src={`${
                    movie.poster_path
                      ? IMG_URL + movie.poster_path
                      : "/noimage.jpg"
                  }`}
                  alt={movie.title}
                  className="w-full h-auto"
                />
                <div className="absolute w-full h-full flex font-bold items-center justify-center opacity-0 bg-slate-950/[.0] transition hover:bg-slate-950/70 hover:opacity-100  ">
                  <h3 className="">{movie.title}</h3>
                </div>
              </div>
            </Link>
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

export default Genres;
