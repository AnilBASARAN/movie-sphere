import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ReactPlayer from "react-player";

import { getMovies, BASE_URL, API_KEY, IMG_URL } from "@/pages/api/api";

const Movies: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movies, setMovies] = useState<any>("");
  const [isOkay, setIsOkay] = useState<any>(false);

  // Get Movies By Id
  const handleMovieById = async () => {
    const data = await getMovies(
      `${BASE_URL}/movie/${id}?&append_to_response=videos&language=en-US&${API_KEY}`
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
    <div>
      {/* <h1 className="text-5xl m-10 text-center bg-red-500 p-8">
        Under Construction
      </h1> */}

      <img src={`${IMG_URL + movies.poster_path}`} alt={movies.title} />
      <div>{movies.original_title}</div>
      {isOkay && (
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
      )}
    </div>
  );
};

export default Movies;
