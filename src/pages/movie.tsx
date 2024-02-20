import React, { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";

import { getMovies, BASE_URL, API_KEY, IMG_URL } from "@/pages/api/api";

function Movies() {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<any>("");

  const handleMovieById = async () => {
    const data: any = await getMovies(
      `${BASE_URL}/movie/${id}?language=en-US&${API_KEY}`
    );
    setMovie(data);
  };

  useEffect(() => {
    handleMovieById();
  }, []);

  return (
    <>
      {/*    <Header /> */}
      <h1 className="text-5xl m-10 text-center bg-red-500 p-8">
        Under Construction
      </h1>
      <img src={`${IMG_URL + movie.poster_path}`} alt={movie.title} />
      <div>{movie.original_title}</div>
      <Footer />
    </>
  );
}

export default Movies;

/* import { createContext } from "react";

export const GlobalContext = createContext;

export const GlobalProvider = (props) => {
  return (
    <GlobalContext.Provider value={{ deger: "hehe" }}>
      {props.children}
    </GlobalContext.Provider>
  );
}; */
