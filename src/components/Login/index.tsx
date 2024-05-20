import { auth } from "@/config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect, useRef } from "react";

const Login = ({ handleCloseLoginForm }: any) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [error, setError] = useState<string>("");

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        handleCloseLoginForm();
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
      await signInWithEmailAndPassword(auth, email, password);
      setIsUserLoggedIn(true);
      handleCloseLoginForm();
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.6)] flex justify-center items-center z-[999] ">
      {!isUserLoggedIn && (
        <div ref={formRef} className="bg-[#212121] p-8 rounded shadow-md w-96 ">
          <div className="text-right">
            <button onClick={handleCloseLoginForm} className="">
              X
            </button>
          </div>
          <h1 className="text-3xl font-bold text-center mb-8 ">Login</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form className="flex flex-col ">
            <input
              type="text"
              className="w-full border-gray-300 text-black rounded px-3 py-2 mb-4 focus:border-blue-400 text-xl focus:text-black"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  signIn();
                }
              }}
            />

            <input
              type="password"
              className="w-full border-gray-300 text-black rounded px-3 py-2 mb-4 focus:border-blue-400 text-xl focus:text-black"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  signIn();
                }
              }}
            />
            <button
              type="button"
              className="w-full bg-blue-500 text-xl text-white py-2 rounded hover:bg-blue-600 transition-all"
              onClick={signIn}
            >
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
