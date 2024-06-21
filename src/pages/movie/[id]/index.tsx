import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import ReactPlayer from "react-player";
import { auth, db } from "@/config/firebase";
import {
  collection,
  doc,
  deleteDoc,
  setDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

import { getMovies, BASE_URL, API_KEY, IMG_URL } from "@/pages/api/api";
import Ratings from "@/components/Rating";
/* import Image from "next/image"; */
import Link from "next/link";
/* import { Rate } from "antd"; */
import TransparentImage from "@/components/TransparentImage";

const Movies: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movies, setMovies] = useState<any>("");
  /*   const [isOkay, setIsOkay] = useState<any>(false); */
  const [isCredits, setIsCredits] = useState<boolean>(true);
  const [showMore, setShowMore] = useState(false);
  /*  const { activeItem, setActiveItem } = useContext<any>(); */
  const [isUserLogged, setIsUserLogged] = useState<any>(false);
  /*   const [isMovieData, setIsMovieData] = useState(); */
  /*   const moviesCollectionRef = collection(db, "movies"); */

  const toggleMore = () => {
    setShowMore(!showMore);
  };

  const handleCrew = () => {
    setShowMore(false);
    setIsCredits(false);
  };

  const handleCast = () => {
    setShowMore(false);
    setIsCredits(true);
  };

  const director = movies.credits?.crew.filter(
    ({ job }: any) => job === "Director"
  );

  const trailer = movies.videos?.results.filter(
    ({ type }: any) => type === "Trailer"
  );

  function getCurrentDateTimeNumber(): number {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // Months are zero-based
    const day = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();

    // Combine the components into a single number in the format YYYYMMDDHHmmss
    return (
      year * 10000000000 +
      month * 100000000 +
      day * 1000000 +
      hour * 10000 +
      minute * 100 +
      second
    );
  }

  const submitMovie = async (
    { id, title, popularity, poster_path, release_date, vote_average }: any,
    userRating: any
  ) => {
    try {
      // Get Firestore collection reference for users

      const usersCollectionRef = collection(db, "users");

      // Set user-specific movie data using the user's UID as document ID
      await setDoc(
        doc(usersCollectionRef, auth.currentUser!.uid, "movies", String(id)),
        {
          averageRating: vote_average,
          movieId: id,
          popularity: popularity,
          posterPath: poster_path,
          releaseDate: release_date,
          title: title,
          userRating: userRating,
          whenRated: getCurrentDateTimeNumber(),
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMovie = async (movie: any) => {
    const toString = String(movie.id);
    const movieDoc = doc(
      db,
      "users",
      auth.currentUser!.uid,
      "movies",
      toString
    );
    await deleteDoc(movieDoc);
  };

  const updateMovie = async (movie: any, newRating: number) => {
    const toString = String(movie.id);
    const movieDoc = doc(
      db,
      "users",
      auth.currentUser!.uid,
      "movies",
      toString
    );
    await updateDoc(movieDoc, { userRating: newRating });
  };

  const [isMovieDb, setIsMovieDb] = useState<any>();

  /*   const movieDataRef = collection(db, "users", auth.currentUser!.uid, "movies"); */

  const userId = auth?.currentUser?.uid; // Accessing currentUser safely

  const movieDataRef = userId
    ? collection(db, "users", userId, "movies")
    : null;

  useEffect(() => {
    if (!userId) {
      return; // Exit early if userId is null
    }

    const getMovieFromDb = async (movieId: any) => {
      try {
        // @ts-ignore
        const docRef = doc(movieDataRef, movieId);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          const movieData = {
            ...docSnapshot.data(),
            id: docSnapshot.id,
          };
          console.log(movieData);
          setIsMovieDb(movieData);
          /*   setMovie(movieData); // Assuming setMovie is your state setter function for the single movie */
        } else {
          console.log("No movie found with the specified ID");
        }
      } catch (err) {
        console.error(err);
      }
    };

    // Pass the specific movie ID to retrieve
    const movieId = id;
    getMovieFromDb(movieId);
  }, [userId, id]);

  // Get Numbers With One Decimal
  const getNumbersWithOneDecimal = (value: string) => {
    // Match numbers with up to one decimal place
    const regex = /^\d*\.?\d{0,1}/;
    const match = value?.match(regex);
    if (match) {
      return match[0];
    } else {
      return null;
    }
  };

  // Get Movies By Id
  const handleMovieById = async () => {
    const data = await getMovies(
      `${BASE_URL}/movie/${id}?&append_to_response=credits,videos&language=en-US&${API_KEY}`
    );
    setMovies(data);
    /* setIsMovieData(data); 
    console.log(isMovieData);*/
  };

  // Get Movie Id From URL
  useEffect(() => {
    if (id) {
      handleMovieById();
    }
  }, [id]);

  // Listen for changes in authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsUserLogged(user); // Update currentUser state when authentication state changes
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex justify-center min-h-[78vh]  ">
      <div className=" max-w-[1000px] m-4  ">
        <div className="mb-4 pointer-events-none   ">
          {trailer && trailer[0] ? (
            <div className=" relative pt-[56.25%]">
              <ReactPlayer
                className="absolute top-0 left-0 border-2 border-primary  "
                url={`https://www.youtube.com/watch?v=${trailer[0]?.key}`}
                controls={false}
                loop={true}
                playing={true}
                volume={0}
                width="100%"
                height="100%"
                playbackRate={0.8}
              />{" "}
              <div className="absolute top-0 left-0 transition">
                <TransparentImage
                  alt={movies.title}
                  imagePath={`${
                    "https://image.tmdb.org/t/p/w1280" + movies.backdrop_path
                  }`}
                />
              </div>
            </div>
          ) : (
            <div>
              <img
                src={`${
                  "https://image.tmdb.org/t/p/w1280" + movies.backdrop_path
                }`}
                alt={movies.title}
                className="border-2 border-primary"
              />
            </div>
          )}
        </div>
        <div className="flex gap-6  ">
          <div className="flex flex-col w-32 lg:w-[228px] items-baseline ">
            {" "}
            <div className="w-full lg:w-[228px]  ">
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
            <div className="bg-slate-800 w-full relative   my-2 pr-2 rounded-sm flex text-center justify-center items-center ">
              {isUserLogged ? (
                <div>
                  {isMovieDb && (
                    <Ratings
                      initialValue={isMovieDb.userRating || 0}
                      updateMovie={updateMovie}
                      movies={movies}
                      submitMovie={submitMovie}
                      deleteMovie={deleteMovie}
                    />
                  )}
                  {!isMovieDb && (
                    <Ratings
                      initialValue={0}
                      updateMovie={updateMovie}
                      movies={movies}
                      submitMovie={submitMovie}
                      deleteMovie={deleteMovie}
                    />
                  )}

                  {/*  <button
                    onClick={() => submitMovie(movies)}
                    className="bg-green-700 text-slate-900 p-1 px-4  "
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => deleteMovie(movies)}
                    className="bg-red-500 p-1 px-4"
                  >
                    Delete
                  </button> */}
                </div>
              ) : (
                <div className="w-52 ">
                  <div className="relative ">
                    <img alt="no-rating" src="/noStar.jpg" />
                    <div className="absolute top-0  w-32 md:w-[228px] md:-left-[6px] h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity  bg-black bg-opacity-50 cursor-default">
                      <p className="text-green-400 text-sm md:text-base">
                        Login to Rate
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className=" flex flex-col gap-2 text-slate-400 text-xs md:text-sm w-full ">
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
            <div className="text-lg md:text-2xl font-bold flex items-baseline gap-2">
              <h1>{movies.title}</h1>
              {movies.title !== movies.original_title && (
                <span className=" font-medium font-serif text-slate-400 text-lg">
                  '{movies.original_title}'{" "}
                </span>
              )}
            </div>
            <div className="flex gap-2 text-xs md:text-base ">
              <h1 className="text-slate-200 underline   ">
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
            <div className="text-slate-400 mt-4 text-xs md:text-base ">
              <h1>{movies.tagline}</h1>
            </div>
            <div className="text-slate-400 mt-4 text-xs md:text-sm">
              <p>{movies.overview}</p>
            </div>
            <div className="flex-wrap mt-4 flex gap-1 md:gap-2 text-[10px] md:text-base">
              {movies.genres?.map((genre: any) => (
                <Link
                  href={`/genres/${genre.name}`}
                  className=" bg-slate-800 px-2 py-1 rounded-md text-slate-400 hover:text-slate-100"
                  key={genre.name}
                >
                  {genre.name}{" "}
                </Link>
              ))}{" "}
            </div>

            <div className="border-b flex gap-6 justify-center  py-2 border-slate-700 text-slate-200 md:my-4 text-center text-sm md:text-base ">
              <button
                className={`hover:text-green-300 ${
                  isCredits ? "text-green-400" : "text-slate-300"
                }`}
                onClick={handleCast}
              >
                Cast
              </button>{" "}
              <button
                className={`hover:text-green-300 ${
                  !isCredits ? "text-green-400" : "text-slate-300"
                }`}
                onClick={handleCrew}
              >
                Crew
              </button>{" "}
            </div>
            <div className="m-1 text-[10px] md:text-sm">
              {isCredits &&
                movies.credits?.cast
                  .slice(0, showMore ? undefined : 15)
                  .map((member: any) => (
                    <Link
                      href={`/search/person/${member.id}`}
                      key={member.name}
                    >
                      <h1 className="inline-block  m-1 bg-slate-800 px-2 py-1 rounded-md text-slate-400 hover:text-slate-100">
                        {member.name}{" "}
                      </h1>
                    </Link>
                  ))}
              {!isCredits &&
                movies.credits?.crew
                  .slice(0, showMore ? undefined : 15)
                  .map((member: any) => (
                    <h1
                      key={member.name}
                      className="inline-block  m-1 bg-slate-800 px-2 py-1 rounded-md text-slate-400 hover:text-slate-100"
                    >
                      {member.name}{" "}
                    </h1>
                  ))}
            </div>
            {movies.credits?.cast.length > 15 && (
              <button
                className="w-40 underline self-center text-[10px] md:text-sm bg-slate-800 px-2 py-1 rounded-md text-slate-400 hover:text-slate-100"
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
