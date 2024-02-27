import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { getMovies, BASE_URL, API_KEY, IMG_URL } from "@/pages/api/api";

const Movies: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movies, setMovies] = useState<any>("");

  // Get Movies By Id
  const handleMovieById = async () => {
    const data = await getMovies(
      `${BASE_URL}/movie/${id}?language=en-US&${API_KEY}`
    );
    setMovies(data);
  };

  // Get Movie Id From URL
  useEffect(() => {
    if (id) {
      handleMovieById();
    }
  }, [id]);

  return (
    <>
      <h1 className="text-5xl m-10 text-center bg-red-500 p-8">
        Under Construction
      </h1>
      <img src={`${IMG_URL + movies.poster_path}`} alt={movies.title} />
      <div>{movies.original_title}</div>
    </>
  );
};

export default Movies;
