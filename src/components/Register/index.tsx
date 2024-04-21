import { auth, googleProvider } from "@/config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState, useEffect, useRef } from "react";

const Register = ({ handleCloseSignInForm }: any) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        handleCloseSignInForm();
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  console.log(auth?.currentUser?.email);

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setIsUserLoggedIn(true);
      handleCloseSignInForm();
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setIsUserLoggedIn(true);
      handleCloseSignInForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.6)] flex justify-center items-center z-[999] ">
      {!isUserLoggedIn && (
        <div ref={formRef} className="bg-[#212121] p-8 rounded shadow-md w-96 ">
          <div className="text-right">
            <button onClick={handleCloseSignInForm} className="">
              X
            </button>
          </div>
          <h1 className="text-3xl font-bold text-center mb-8 ">Register</h1>
          <form className="flex flex-col ">
            <input
              type="text"
              className="w-full border-gray-300 text-black rounded px-3 py-2 mb-4 focus:border-blue-400 text-xl focus:text-black"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="w-full border-gray-300 text-black rounded px-3 py-2 mb-4 focus:border-blue-400 text-xl focus:text-black"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="w-full bg-blue-500 text-xl text-white py-2 rounded hover:bg-blue-600 transition-all"
              onClick={signIn}
            >
              Register
            </button>
            <div className="text-center text-xl text-gray-500 mt-2">- Or -</div>
            <button
              type="button"
              className="w-full flex justify-center bg-gray-200 text-xl text  text-white py-2 rounded hover:bg-gray-300 transition-all mt-2"
              onClick={signInWithGoogle} // Attach signInWithGoogle function to onClick event
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="28"
                height="28 "
                viewBox="0 0 48 48"
              >
                <path
                  fill="#fbc02d"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#e53935"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4caf50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1565c0"
                  d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
            </button>
          </form>
        </div>
      )}

      {/*   {!auth.currentUser && (
        <div>
          <input
            className="text-black"
            placeholder="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="text-black"
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={signIn}>Sign In</button>
          <button onClick={signInWithGoogle}>Sign in with Google</button>
          <button onClick={logout}>Log Out</button>
        </div>
      )} */}
      {/*  <div className="flex flex-row gap-3 justify-center items-center">
        <button className="  hover:text-green-400 ">Login</button>

        <h1 className="text-gray-400 text-2xl font-light">|</h1>

        <button className="  hover:text-green-400 ">Register</button>
      </div> */}
    </div>
  );
};

export default Register;
