/* // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  res.status(200).json({ name: "John Doe" });
}
 */

/* // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  res.status(200).json({ name: "John Doe" });
}
 */

export const API_KEY = "api_key=95c1bdf00d97593736866409336863ca";
export const BASE_URL = "https://api.themoviedb.org/3";
export const API_URL =
  BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
export const IMG_URL = "https://image.tmdb.org/t/p/w200";
export const searchURL = BASE_URL + "/search/movie?" + API_KEY;
/* export const animationURL = API_URL + "&with_genres=16"; */
export const GENRE_URL = API_URL + "&with_genres=";
/* export const denemeURL = BASE_URL + "/discover/movie?" + API_KEY + "&page=1"; */

/* (" ?language=en-US"); */

export const genres = [
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

export interface Movie {
  page: number;
  results: [
    {
      id: number;
      title: string;
      poster_path: string;
      vote_average: number;
      overview: string;
    }
  ];
  total_pages: number;
  total_results: number;
}

export const getMovies = async (url: string): Promise<Movie> => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
