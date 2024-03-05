import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
/* import ReactPlayer from "react-player"; */

import { getMovies, BASE_URL, API_KEY, IMG_URL } from "@/pages/api/api";
/* import Image from "next/image"; */
import Link from "next/link";

const Movies: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movies, setMovies] = useState<any>("");
  const [isOkay, setIsOkay] = useState<any>(false);
  const [isCredits, setIsCredits] = useState<boolean>(true);
  const [showMore, setShowMore] = useState(false);
  /*  const { activeItem, setActiveItem } = useContext<any>(); */

  console.log(movies);

  const toggleMore = () => {
    setShowMore(!showMore);
  };

  const director = movies.credits?.crew.filter(
    ({ job }: any) => job === "Director"
  );

  console.log(director);

  /*   console.log(movies); */

  // Get Numbers With One Decimal
  function getNumbersWithOneDecimal(value: string) {
    // Match numbers with up to one decimal place
    const regex = /^\d*\.?\d{0,1}/;
    const match = value?.match(regex);
    if (match) {
      return match[0];
    } else {
      return null;
    }
  }

  // Get Movies By Id
  const handleMovieById = async () => {
    const data = await getMovies(
      `${BASE_URL}/movie/${id}?&append_to_response=credits&language=en-US&${API_KEY}`
    );
    setMovies(data);
  };

  // Get Movie Id From URL
  useEffect(() => {
    if (id) {
      handleMovieById();
    }
    setIsOkay(true);
  }, [id]);

  return (
    <div className="flex justify-center min-h-[78vh]  ">
      <div className=" w-[1000px] m-4 ">
        <div className="mb-4">
          <div>
            <img
              src={`${
                "https://image.tmdb.org/t/p/w1280" + movies.backdrop_path
              }`}
              alt={movies.title}
              className=" "
            />
          </div>

          {/*  {isOkay && (
            <div>
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${
                  movies.videos?.results[movies.videos?.results.length - 1].key
                }`}
                controls
                width="100%"
                height="auto"
              />{" "}
            </div>
          )} */}
        </div>
        <div className="flex gap-6  ">
          <div className="flex flex-col  items-baseline ">
            {" "}
            <div className="w-56  ">
              {" "}
              <img
                src={`${
                  movies.poster_path
                    ? IMG_URL + movies.poster_path
                    : "/noimage.jpg"
                }`}
                alt={movies.title}
                className=" border-2 border-slate-800 w-full rounded-sm   "
              />
            </div>
            <div className="bg-slate-800 w-full relative  p-2 my-2 rounded-sm flex text-center justify-center items-center cursor-pointer">
              <div className="absolute w-full h-full flex items-center justify-center text-center align-middle opacity-0 bg-slate-950/[.0] transition hover:bg-slate-900/70 hover:opacity-100">
                <h1 className=" text-slate-200 ">Login to rate</h1>
              </div>
              <div className="flex justify-around ">
                {" "}
                <svg
                  clipRule="evenodd"
                  fillRule="evenodd"
                  stroke-linejoin="round"
                  stroke-miterlimit="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  height={40}
                  className="star-svg"
                >
                  <path
                    d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z"
                    fillRule="nonzero"
                  />
                </svg>
                <svg
                  clipRule="evenodd"
                  fillRule="evenodd"
                  stroke-linejoin="round"
                  stroke-miterlimit="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  height={40}
                  className="star-svg"
                >
                  <path
                    d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z"
                    fillRule="nonzero"
                  />
                </svg>
                <svg
                  clipRule="evenodd"
                  fillRule="evenodd"
                  stroke-linejoin="round"
                  stroke-miterlimit="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  height={40}
                  className="star-svg"
                >
                  <path
                    d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z"
                    fillRule="nonzero"
                  />
                </svg>
                <svg
                  clipRule="evenodd"
                  fillRule="evenodd"
                  stroke-linejoin="round"
                  stroke-miterlimit="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  height={40}
                  className="star-svg"
                >
                  <path
                    d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z"
                    fillRule="nonzero"
                  />
                </svg>
                <svg
                  clipRule="evenodd"
                  fillRule="evenodd"
                  stroke-linejoin="round"
                  stroke-miterlimit="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  height={40}
                  className="star-svg"
                >
                  <path
                    d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z"
                    fillRule="nonzero"
                  />
                </svg>
              </div>
            </div>
            <div className=" flex flex-col gap-2 text-slate-400 text-sm w-full ">
              <div className="flex justify-between border-b border-slate-800">
                <h1 className=" ">Runtime: </h1>
                <h1> {movies.runtime} mins</h1>
              </div>
              <div className="flex justify-between border-b border-slate-800">
                <h1 className=" ">Avg Ratings: </h1>
                <h1>
                  {" "}
                  {getNumbersWithOneDecimal(
                    JSON.stringify(movies.vote_average)
                  )}
                </h1>
              </div>
              <div className="flex justify-between border-b border-slate-800">
                <h1 className=" ">Budget: </h1>
                <h1>
                  {" "}
                  {getNumbersWithOneDecimal(
                    JSON.stringify(movies.budget / 1000000)
                  )}{" "}
                  M{" "}
                </h1>
              </div>
              <div className="flex justify-between border-b border-slate-800">
                <h1 className=" ">Revenue: </h1>
                <h1>
                  {" "}
                  {getNumbersWithOneDecimal(
                    JSON.stringify(movies.revenue / 1000000)
                  )}{" "}
                  M
                </h1>
              </div>
              <div className="flex justify-between border-b border-slate-800">
                <h1 className=" ">Language: </h1>
                <h1> {movies.original_language}</h1>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <div className="text-2xl font-bold flex items-baseline gap-2">
              <h1>{movies.title}</h1>
              {movies.title !== movies.original_title && (
                <span className=" font-medium font-serif text-slate-400 text-lg">
                  '{movies.original_title}'{" "}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <h1 className="text-slate-200 underline">
                {movies.release_date?.slice(0, 4)}
              </h1>{" "}
              <h1 className="text-slate-400">Directed by:</h1>{" "}
              {director && (
                <Link
                  /*  onClick={() => setActiveItem(director[0]?.id)} */
                  href={`/search/person/${director[0]?.id}`}
                  key={director[0]?.id}
                >
                  <h1 className="underline hover:text-green-400 text-slate-200">
                    {director[0]?.name}{" "}
                  </h1>
                </Link>
              )}
            </div>
            <div className="text-slate-400 mt-4 ">
              <h1>{movies.tagline}</h1>
            </div>
            <div className="text-slate-400 mt-4 text-sm">
              <p>{movies.overview}</p>
            </div>
            <div className="mt-4 flex gap-2">
              {movies.genres?.map((genre: any) => (
                <Link
                  href={`/genres/${genre.name}`}
                  className="bg-slate-800 px-2 py-1 rounded-md text-slate-400 hover:text-slate-100"
                  key={genre.name}
                >
                  {genre.name}{" "}
                </Link>
              ))}{" "}
            </div>

            <div className="border-b flex gap-6 justify-center  py-2 border-slate-700 text-slate-200 my-4 text-center ">
              <button
                className={`hover:text-green-300 ${
                  isCredits ? "text-green-400" : "text-slate-300"
                }`}
                onClick={() => setIsCredits(true)}
              >
                Cast
              </button>{" "}
              <button
                className={`hover:text-green-300 ${
                  !isCredits ? "text-green-400" : "text-slate-300"
                }`}
                onClick={() => setIsCredits(false)}
              >
                Crew
              </button>{" "}
            </div>
            <div className={`m-1 ${showMore ? "text" : "line-clamp-7"}`}>
              {isCredits &&
                movies.credits?.cast.map((member: any) => (
                  <Link href={`/search/person/${member.id}`} key={member.name}>
                    <h1 className="inline-block text-sm m-1 bg-slate-800 px-2 py-1 rounded-md text-slate-400 hover:text-slate-100">
                      {member.name}{" "}
                    </h1>
                  </Link>
                ))}
              {!isCredits &&
                movies.credits?.crew.map((member: any) => (
                  <h1
                    key={member.name}
                    className="inline-block text-sm m-1 bg-slate-800 px-2 py-1 rounded-md text-slate-400 hover:text-slate-100"
                  >
                    {member.name}{" "}
                  </h1>
                ))}
            </div>
            {movies.credits?.cast.length > 30 && (
              <button
                className="w-40 underline self-center text-sm bg-slate-800 px-2 py-1 rounded-md text-slate-400 hover:text-slate-100"
                onClick={toggleMore}
              >
                {showMore ? "Show Less" : "Show More"}
              </button>
            )}
          </div>
          {/*
           
          
          <div>
            {movies.production_countries?.map((country: any) => (
              <div>{country.name} </div>
            ))}{" "}
          </div>
          <div>
            {movies.production_companies?.map((company: any) => (
              <div>{company.name} </div>
            ))}{" "}
          </div>
          */}
        </div>
        {/* <h1 className="text-5xl m-10 text-center bg-red-500 p-8">
        Under Construction
      </h1> */}
      </div>
    </div>
  );
};

export default Movies;
