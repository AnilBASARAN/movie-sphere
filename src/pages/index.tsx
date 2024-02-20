import { MainContext } from "@/components/Context/context"; // React Context Api Structure
import { useContext } from "react";
import Link from "next/link";

const Home: React.FC = () => {
  const { movies, count, setCount, IMG_URL, increaseCount, decreaseCount } =
    useContext<any>(MainContext);

  return (
    <>
      <div className="flex justify-center text-sm ">
        <div
          id="main"
          className="grid grid-cols-5 justify-center  w-[1000px] gap-3 m-4"
        >
          {movies?.results?.map((movie) => (
            <Link
              href={`/movie?id=${movie.id}`}
              key={movie.id}
              className="movie "
            >
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
            </Link>
          ))}
        </div>
      </div>
      {movies && movies.total_pages > 1 && (
        <div className="flex justify-center gap-10 mb-4">
          {count > 1 && (
            <button onClick={decreaseCount} value="prev">
              Prev
            </button>
          )}
          <button onClick={() => setCount(count - 1)}>
            {count > 1 ? count - 1 : ""}
          </button>
          <h3 className="text-green-500">{count}</h3>
          <button onClick={() => setCount(count + 1)}>
            {movies.total_pages - 1 > count && count + 1}
          </button>
          <button
            onClick={() =>
              setCount(movies.total_pages > 500 ? 500 : movies.total_pages)
            }
          >
            {/* { if (count !== movies.total_pages) {
              movies.total_pages > 500 ? 500 : movies.total_pages
            } else {movies.total_pages} } */}

            {(() => {
              if (count !== movies.total_pages) {
                return movies.total_pages > 500 ? 500 : movies.total_pages;
              } else {
                return "";
              }
            })()}

            {/*  {movies.total_pages > 500 && 500}

            {movies.total_pages && count !== movies.total_pages} */}
          </button>
          <button onClick={increaseCount} value="next">
            {count === 500 ? "" : "Next"}
          </button>
        </div>
      )}
    </>
  );
};

export default Home;

// Might wanna try Splide to make carousels
