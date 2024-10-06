import React, { useState, useEffect, useContext } from "react";
import Navbar from "../Sections/Navbar";
import Button4 from "../Components/Button4";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Ensure correct import
import { toast } from "react-toastify";
import { AuthContext } from "../AuthProvider";
import { Helmet } from "react-helmet";
import { BiHide, BiShow } from "react-icons/bi";
import Footer from "../Sections/Footer";

const API_URL = import.meta.env.VITE_API_URL;
const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useContext(AuthContext);
  const [pswdShow, setPswdShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); // Remember Me checkbox state
  if (isAuthenticated) {
    navigate("/User/Dashboard");
  }
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
    setError,
    setValue,
  } = useForm();

  const handleToggle = (e) => {
    e.preventDefault();
    setPswdShow((pswdShow) => !pswdShow);
  };

  const onSubmit = async (data) => {
    if (rememberMe) {
      // Save email and password to localStorage if Remember Me is checked
      localStorage.setItem("rememberedEmail", data.email);
      localStorage.setItem("rememberedPassword", data.password);
      localStorage.setItem("rememberMe", true);
    } else {
      // Clear localStorage if Remember Me is unchecked
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
      localStorage.setItem("rememberMe", false);
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/users/login/`, data);
      const { access, refresh } = res.data.token;
      toast.success(`Login Succesful`);
      login(access, refresh);
      navigate("/User/Dashboard");
    } catch (error) {
      if (error.response) {
        const serverErrors = error.response.data;
        for (const [key, value] of Object.entries(serverErrors)) {
          setError(key, { type: "server", message: value[0] });
        }
        toast.error(`Login Failed: Email or Password is not Valid`);
        console.log(error.response.data.errors);
        reset(); // Clear form fields
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // On mount, check if login data is in localStorage
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedPassword = localStorage.getItem("rememberedPassword");
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";

    if (savedEmail && savedPassword && savedRememberMe) {
      setValue("email", savedEmail);
      setValue("password", savedPassword);
      setRememberMe(savedRememberMe);
    }
  }, [setValue]);

  return (
    <>
      <Helmet>
        <title>Login | Fashion Nana </title>
      </Helmet>
      <Navbar />

      <div className="flex w-[99%] flex-col items-center justify-center bg-slate-100 py-20 sm:flex-row sm:py-20">
        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          className="flex w-80 flex-col justify-center rounded-xl border bg-white p-5 shadow-md md:h-96 md:w-96"
        >
          <div className="text-center text-xl font-medium"> LOGIN</div>
          <div className="relative my-3 flex flex-col justify-between">
            <input
              type="email"
              {...register("email", {
                required: { value: true, message: "This field is Required" },
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Entered value does not match email format",
                },
              })}
              className="peer w-full border bg-white p-2 text-lg font-medium focus:outline-none focus:ring-0"
              placeholder=" "
            />

            <label
              htmlFor="username"
              className="absolute left-2 top-2 -translate-y-6 transform text-sm font-medium text-slate-600 transition-transform duration-300 peer-placeholder-shown:top-2 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-lg peer-placeholder-shown:text-slate-900 peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-slate-600"
            >
              Email
            </label>

            {errors.email && (
              <div className="text-sm text-red-500">{errors.email.message}</div>
            )}
          </div>
          <div className="relative my-3 flex flex-col justify-between">
            <div className="relative flex flex-col">
              <input
                type={pswdShow ? "password" : "text"}
                placeholder=""
                {...register("password", {
                  required: { value: true, message: "This field is Required" },
                  minLength: {
                    value: 8,
                    message: "Password must be 8 character Long",
                  },
                })}
                className="peer border bg-white p-2 text-lg font-medium focus:outline-none focus:ring-0"
              />
              <button
                onClick={(e) => handleToggle(e)}
                className="z-5 absolute bottom-0 right-0 -translate-y-1 rounded-md p-2 text-lg text-primary transition-all"
              >
                {pswdShow ? <BiShow /> : <BiHide />}
              </button>
              <label
                htmlFor="password"
                className="absolute left-2 top-2 -translate-y-6 transform text-sm font-medium text-slate-600 transition-transform duration-300 peer-placeholder-shown:top-2 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-lg peer-placeholder-shown:text-slate-900 peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-slate-600"
              >
                Password
              </label>
            </div>

            {errors.password && (
              <div className="text-sm text-red-500">
                {errors.password.message}
              </div>
            )}
          </div>

          <div className="mb-4 flex items-center justify-start space-x-2">
            <div className="relative flex flex-col">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
            </div>
            <label htmlFor="checks" className=" ">
              Remember me{" "}
            </label>
          </div>

          <Button4 disabled={isSubmitting} type="submit" text="Login" />
          {loading && (
            <>
              <div class="text-center">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    class="inline h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            </>
          )}
          {/* <i className="mx-auto my-1">or</i>
          <Link className="mx-auto my-2 h-fit w-44 space-y-4 rounded-full border border-slate-700 text-center text-slate-800 hover:text-slate-600">
            Login with Google
          </Link> */}
          <Link
            to="/User/ResetMail"
            className="text-center text-slate-600 hover:text-slate-700"
          >
            {" "}
            Forgot Password?{" "}
          </Link>
        </form>
        <div className="relative h-80 w-80 md:h-96 md:w-96">
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="h-80 w-80 rounded-xl object-cover shadow-lg md:h-96 md:w-96"
          />
          <div className="absolute bottom-6 mx-auto h-16 w-full gap-5 text-center text-white">
            <h4 className="text-lg"> Don't have an account</h4>
            <Link
              to="/Signup"
              className="mx-auto my-2 w-44 rounded-full border border-white px-5 py-1 text-center text-sm text-white hover:text-slate-300"
            >
              Sign Up here!
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
