import { useState, useEffect } from "react";
import Link from "next/link";
import { API_URL, getMovies, BIG_IMG_URL, IMG_URL } from "@/pages/api/api";

const Home: React.FC = () => {
  const [movies, setMovies] = useState<any>("");
  const [previewMovies, setPreviewMovies] = useState<any>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleMovies = async () => {
    const data = await getMovies(`${API_URL}&page=1`);
    setMovies(data.results);
    setPreviewMovies(data.results.slice(0, 10)); // Get the first five movies
  };

  const prevImage = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? previewMovies.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextImage = () => {
    const isLastImage = currentIndex === previewMovies.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  console.log(movies);

  useEffect(() => {
    handleMovies();

    /* setInterval(() => {
      if (movies && currentIndex < movies.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setCurrentIndex(0);
      }
    }, 1000); */
  }, []);

  return (
    <>
      <div className="flex flex-col  justify-center text-sm min-h-[78vh]">
        <div className="flex w-[1000px] h-[600px]  m-auto p-4 relative group ">
          {previewMovies && (
            <div className="w-full h-full rounded-2xl   ">
              <Link href={`/movie/${previewMovies[currentIndex].id}`}>
                <div
                  className="w-full h-full rounded-2xl duration-500 bg-cover "
                  style={{
                    backgroundImage: `url(${
                      BIG_IMG_URL + previewMovies[currentIndex].backdrop_path
                    })`,
                  }}
                ></div>
              </Link>

              <div
                className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-slate-200 cursor-pointer scale-y-150   "
                onClick={prevImage}
              >
                &#706;
              </div>
              <div
                className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-slate-200 cursor-pointer scale-y-150  "
                onClick={nextImage}
              >
                &#707;
              </div>
              <div className=" p-4 my-4 absolute bottom-[0%] bg-black bg-opacity-50 rounded-tr-2xl rounded-bl-2xl  ">
                <img
                  className="h-16 border-b-2 pb-1 "
                  src="/logo.png"
                  alt="logo"
                />
                <div className="text-gray-400  ">
                  <h1>The digital hub for movie buffs</h1>
                </div>
              </div>
              <div className="flex justify-center -mt-12 items-end py-2 font-bold text-slate-400 gap-1  ">
                {previewMovies &&
                  previewMovies.map((movie: string, index: number) => (
                    <div
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={
                        currentIndex === index
                          ? "text-xl cursor-pointer text-green-400"
                          : "text-xl cursor-pointer "
                      }
                    >
                      &#9675;
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col  justify-center items-center ">
          {/* <div className="m-4 w-[1000px]">
            <div className="w-full  mx-4 ">
              <img
                className="h-16 border-b-2 pb-1 "
                src="/logo.png"
                alt="logo"
              />
              <div className="text-gray-400 ">
                <h1>The digital hub for movie buffs</h1>
              </div>
            </div>
          </div> */}
          <div className="grid grid-cols-2  max-w-[1000px]  ">
            <div className="bg-slate-800 h-[100px] hover:bg-slate-700 flex items-center gap-8 py-4 m-4 px-8 rounded-md  ">
              <svg
                className="w-1/6 "
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                fill="white"
                viewBox="0 0 24 24"
              >
                <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
              </svg>

              <h1 className="w-5/6  ">
                Keep track of every film you’ve ever watched (or just start from
                the day you join)
              </h1>
            </div>
            <div className="bg-slate-800  h-[100px] hover:bg-slate-700 flex items-center  m-4 gap-8 py-4  px-8 rounded-md">
              <svg
                className="w-1/6 "
                clipRule="evenodd"
                fillRule="evenodd"
                stroke-linejoin="round"
                width="48"
                height="48"
                fill="white"
                stroke-miterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z"
                  fillRule="nonzero"
                />
              </svg>
              <h1 className="w-5/6 ">
                Rate each film on a five-star scale (with halves) to record and
                share your reaction
              </h1>
            </div>
            <div className="bg-slate-800 h-[100px] hover:bg-slate-700 flex items-center  m-4 gap-8 px-8 py-4  rounded-md">
              <svg
                className="w-1/6 "
                clipRule="evenodd"
                fillRule="evenodd"
                stroke-linejoin="round"
                stroke-miterlimit="2"
                viewBox="0 0 24 24"
                width="48"
                height="48"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z"
                  fillRule="nonzero"
                />
              </svg>
              <h1 className="w-5/6 ">
                Show some love for your favorite films, lists and reviews with a
                “like”
              </h1>
            </div>
            <div className="bg-slate-800 h-[100px] hover:bg-slate-700 flex items-center   m-4 gap-8 px-8 py-4  rounded-md">
              <svg
                className="w-1/6 "
                clipRule="evenodd"
                fillRule="evenodd"
                stroke-linejoin="round"
                stroke-miterlimit="2"
                viewBox="0 0 24 24"
                width="48"
                height="48"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m17 17.75c0-.414-.336-.75-.75-.75h-13.5c-.414 0-.75.336-.75.75s.336.75.75.75h13.5c.414 0 .75-.336.75-.75zm5-4c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm-9-4c0-.414-.336-.75-.75-.75h-9.5c-.414 0-.75.336-.75.75s.336.75.75.75h9.5c.414 0 .75-.336.75-.75zm7-4c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75z"
                  fillRule="nonzero"
                />
              </svg>
              <h1 className="w-5/6 ">
                Discover and explore new movies and make collections
              </h1>
            </div>
          </div>
          <div className="flex flex-col mt-8 w-[1000px]">
            <div className="flex justify-between">
              <div className=" mx-4 text-gray-400 ">Recent Movies</div>{" "}
              <Link
                href="/all-movies"
                className=" mx-4 text-gray-400 hover:text-gray-200"
              >
                View All
              </Link>
            </div>

            <div className="flex border-t border-gray-700 py-4 justify-center  gap-1 mx-4 mt-2">
              {previewMovies &&
                previewMovies.map((movie: any) => (
                  <div>
                    <Link
                      href={`/movie/${movie.id}`}
                      key={movie.id}
                      className="movie "
                    >
                      <div className=" relative flex text-center justify-center cursor-pointer border rounded-sm border-gray-800 h-full hover:border-green-400 shadow-lg ">
                        <img
                          src={`${
                            movie.poster_path
                              ? IMG_URL + movie.poster_path
                              : "/noimage.jpg"
                          }`}
                          alt={movie.title}
                          className=" "
                        />
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
            <div className="flex flex-col max-w-[1000px] mx-4 text-gray-200">
              <div className="text-3xl font-bold my-8">
                <h1>In Movie-Sphere You Can...</h1>
              </div>
              <div className="flex border-b border- border-gray-700 gap-16 justify-center items-center pt-4 pb-16 ">
                <div className="flex-1 border rounded-sm border-gray-800 shadow-lg h-[420px] w-[420px] overflow-hidden  ">
                  <img className="   " src="/movie.png" alt="promote" />
                </div>
                <div className="flex flex-col gap-4 flex-1 text-base ">
                  <h1 className="text-2xl font-bold ">
                    Track your personal movie collection
                  </h1>
                  <h1>
                    1 Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Totam nam commodi, iure dolorem optio excepturi, repellat
                    voluptatibus numquam, mollitia hic quae maxime? Quo animi
                    consequatur ab obcaecati, iure porro nemo!
                  </h1>
                </div>
              </div>
              <div className="flex border-b border- border-gray-700 gap-16 justify-center items-center py-16  ">
                <div className="flex flex-col gap-4 flex-1 text-base ">
                  <h1 className="text-2xl font-bold ">
                    Express your thoughts with Rating
                  </h1>
                  <h1>
                    1 Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Totam nam commodi, iure dolorem optio excepturi, repellat
                    voluptatibus numquam, mollitia hic quae maxime? Quo animi
                    consequatur ab obcaecati, iure porro nemo!
                  </h1>
                </div>
                <div className="flex-1 border rounded-sm border-gray-800 shadow-lg h-[420px] w-[420px] overflow-hidden  ">
                  <img src="/rate.png" alt="promote" />
                </div>
              </div>
              <div className="flex  gap-16 justify-center items-center border-b  border-gray-700 py-16  ">
                <div className="flex-1   border rounded-sm border-gray-800 shadow-lg h-[420px] w-[420px] overflow-hidden  ">
                  <img src="/search.png" alt="promote" />
                </div>
                <div className="flex flex-col gap-4 flex-1 text-base ">
                  <h1 className="text-2xl font-bold ">
                    Explore and find new movies{" "}
                  </h1>
                  <h1>
                    1 Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Totam nam commodi, iure dolorem optio excepturi, repellat
                    voluptatibus numquam, mollitia hic quae maxime? Quo animi
                    consequatur ab obcaecati, iure porro nemo!
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
