import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getMovies, IMG_URL, API_KEY, BASE_URL } from "@/pages/api/api";

const Search: React.FC = () => {
  const router = useRouter();
  const { query }: any = router;
  const [details, setDetails] = useState<any>("");

  // Get The Person Details Method
  const handlePerson = async () => {
    if (query.id) {
      const data = await getMovies(
        `${BASE_URL}/person/${query.id}?${API_KEY}&language=en-US&append_to_response=movie_credits `
      );
      setDetails(data);
    }
  };

  console.log(details);

  useEffect(() => {
    handlePerson();
  }, [query]);

  return (
    <div className="flex justify-center  min-h-[78vh]  ">
      {details && (
        <div className="flex items-start justify-center max-w-[1000px] p-2 gap-1 md:gap-6 ">
          <div className="w-32 md:w-56">
            <div className="w-full">
              {" "}
              <img
                src={`${
                  details.profile_path
                    ? IMG_URL + details.profile_path
                    : "/noimage.jpg"
                }`}
                alt={details.name}
                className=" border-2 border-slate-800 w-full rounded-sm   "
              />
            </div>
            <div className="">
              <h1 className="text-center font-bold text-slate-200 my-2">
                {details?.name}{" "}
              </h1>
              <h1 className="w-28 sm:w-32 md:w-56 text-center text-slate-400  text-xs md:text-sm">
                {details?.biography || "There is no data about this person"}{" "}
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 justify-center mx-2  gap-3 ">
            {(details?.movie_credits?.cast || [])
              .concat(details?.movie_credits?.crew || [])
              .reduce((uniqueMovies: any[], movie: any) => {
                // Check if the movie already exists in the uniqueMovies array
                if (!uniqueMovies.some((m) => m.id === movie.id)) {
                  uniqueMovies.push(movie); // If not, add it to the uniqueMovies array
                }
                return uniqueMovies;
              }, [])
              .map((movie: any) => (
                <Link href={`/movie/${movie.id}`} key={movie.id}>
                  <div className=" relative flex text-center  justify-center  cursor-pointer border rounded-sm border-gray-400  h-full hover:border-green-400 ">
                    <img
                      src={`${
                        movie.poster_path
                          ? IMG_URL + movie.poster_path
                          : "/noimage.jpg"
                      }`}
                      alt={movie.title}
                    />
                    <div className="absolute w-full h-full flex font-bold items-center justify-center opacity-0 bg-slate-950/[.0] transition  hover:bg-slate-950/70 hover:opacity-100  ">
                      <h3 className="">{movie.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
