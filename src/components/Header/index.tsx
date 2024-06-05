import React, { useEffect, useRef } from "react";
import { MainContext } from "@/components/Context/context";
import { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { genres } from "@/pages/api/api";
import Register from "@/components/Register";
import Login from "@/components/Login";
import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";

function Header() {
  const router = useRouter();
  const { setActiveItem /* ResponsiveImage */ } = useContext<any>(MainContext);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isRegisterVisible, setIsRegisterVisible] = useState<boolean>(false);
  const [isLoginVisible, setIsLoginVisible] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // SignInForm Visibility
  const handleCloseSignInForm = () => {
    setIsRegisterVisible(false);
    document.body.style.overflow = "auto";
  };
  const handleOpenSignInForm = () => {
    setIsRegisterVisible(true);
    document.body.style.overflow = "hidden";
  };

  // Login Form Visibility
  const handleOpenLoginForm = () => {
    setIsLoginVisible(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseLoginForm = () => {
    setIsLoginVisible(false);
    document.body.style.overflow = "auto";
  };

  // Toggle Functionality
  const [isOpen, setIsOpen] = useState(false);
  /* const handleToggle = () => {
    setIsOpen(!isOpen);
  }; */

  // Toggle Profile
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  /*   const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
  }; */

  // Sign Out Functionality
  const logout = async (event: any) => {
    event.preventDefault();
    try {
      await signOut(auth);
      /*   setIsUserLoggedIn(false); */
      window.location.href = router.asPath; // Redirect the page when user logs out
    } catch (error) {
      console.log(error);
    }
  };

  // Search Functionality
  const handleSearch = (e: any) => {
    e.preventDefault();
    router.push(`/search/movie/${searchTerm}`);
  };

  // Listen for changes in authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user); // Update currentUser state when authentication state changes
    });
    return () => unsubscribe();
  }, []);

  return (
    <header className="flex justify-center items-center h-16 sticky top-0 left-0 right-0 bg-slate-950 z-50 ">
      <div className="flex justify-center items-center w-full max-w-full sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1000px] mx-4 ">
        <div className="flex  w-full items-center ">
          <Link key="2" className="mr-4 w-8 md:w-10 -mt-2" href="/">
            <img className="w-full" src="/favicon.ico" />
          </Link>
          <div className="flex text-xs md:text-base ">
            <div className="flex relative hover:bg-slate-800 h-16 w-16 md:w-32">
              <Link
                key="1"
                href="/all-movies"
                className="flex justify-center text-center items-center w-full"
              >
                All movies
              </Link>
            </div>
            <div
              className="flex relative hover:bg-slate-800 h-16 w-20 md:w-32"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <button className="text-center items-center w-full">
                Genres
              </button>

              {isOpen && (
                <div className="absolute flex flex-col left-1/2 top-16 -translate-x-1/2 bg-slate-800 text-gray-200 w-full text-[0.6rem] md:text-base font-semibold border-t-[1px] border-gray-600 ">
                  {genres.map((genre: any, index: any) => (
                    <Link key={index} href={`/genres/${genre.name}`}>
                      <ul>
                        <li
                          key={index}
                          id={genre.name}
                          className="text-left p-1 px-2 border-b-[1px] border-gray-600 hover:text-green-400 hover:bg-slate-700"
                          onClick={() => setActiveItem(genre.id)}
                        >
                          {genre.name}
                        </li>
                      </ul>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex-grow mr-4 md:mr-6">
          <form onSubmit={handleSearch} className="flex justify-end">
            <input
              type="search"
              id="search"
              name="search"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-16 sm:w-32 md:w-64  h-8 rounded-3xl p-2 text-[10px] md:text-base text-black outline-none"
            />
          </form>
        </div>
        <div className="flex relative text-xs md:text-base">
          {isRegisterVisible && (
            <Register handleCloseSignInForm={handleCloseSignInForm} />
          )}
          {isLoginVisible && (
            <Login handleCloseLoginForm={handleCloseLoginForm} />
          )}

          {currentUser ? (
            <div className="flex relative justify-center items-center px-2 hover:bg-slate-800 hover:border-black h-10 rounded-t-md">
              <button
                onMouseEnter={() => setIsProfileOpen(true)}
                onMouseLeave={() => setIsProfileOpen(false)}
                className="h-16 max-w-16 md:w-full md:max-w-36 font-bold truncate"
              >
                {auth?.currentUser?.displayName || auth?.currentUser?.email}
              </button>
              <div className={isProfileOpen ? "absolute top-full w-full" : ""}>
                {isProfileOpen && (
                  <div
                    className="bg-slate-800 overflow-hidden shadow-xl rounded-b-md inline-block w-full"
                    onMouseEnter={() => setIsProfileOpen(true)}
                    onMouseLeave={() => setIsProfileOpen(false)}
                  >
                    <Link
                      href={`/user/${auth?.currentUser?.email}/movies`}
                      className="block text-center  py-2 text-gray-200 border-t-[1px] border-gray-600 hover:text-green-400 hover:bg-slate-700"
                    >
                      Collection
                    </Link>
                    <Link
                      onClick={logout}
                      href="/"
                      className="block  text-center  py-2 text-gray-200 border-t-[1px] border-gray-600 hover:text-green-400 hover:bg-slate-700 "
                    >
                      Sign Out
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center gap-3 md:gap-6">
              <button
                onClick={handleOpenLoginForm}
                className="hover:text-green-400"
              >
                Login
              </button>
              <button
                onClick={handleOpenSignInForm}
                className="hover:text-green-400"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
