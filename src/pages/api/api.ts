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

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
}

export const getMovies = async (url: string): Promise<Movie[]> => {
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
};
