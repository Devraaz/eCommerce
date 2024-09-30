import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "../../config-axios";
import { toast } from "react-toastify";
import Button from "../../Components/Button";
import Navbar from "../../Sections/Navbar";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const ResetPassword = () => {
  const [pswdShow, setPswdShow] = useState(true);
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const handleToggle = (e) => {
    e.preventDefault();
    setPswdShow((pswdShow) => !pswdShow);
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${API_URL}/api/users/reset-password/${uid}/${token}/`,
        data,
      );
      toast.success(`Changed Successfully`);
      navigate("/Login");
      reset(); // Clear form fields
    } catch (error) {
      if (error.response) {
        const serverErrors = error.response.data;
        for (const [key, value] of Object.entries(serverErrors)) {
          setError(key, { type: "server", message: value[0] });
        }
        toast.error(`Changing Failed: ${error.response.data.errors}`);
        reset(); // Clear form fields
      }
    }
  };
  return (
    <>
      <Helmet>
        <title>Change Password | India's Smartest Shopping Point</title>
      </Helmet>
      <Navbar />
      <div className="flex w-[99%] flex-col items-center justify-center bg-slate-100 py-20 sm:flex-row sm:py-20">
        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          className="flex w-80 flex-col justify-center rounded-xl border bg-white p-5 shadow-md md:h-96 md:w-96"
        >
          <div className="relative my-3 flex flex-col justify-between">
            <label
              htmlFor="password"
              className="text-xl font-semibold text-slate-900"
            >
              New Password:{" "}
            </label>
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
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
                    message:
                      "Password must contain atleast a letter, a number and a Character",
                  },
                })}
                className="peer w-full border bg-white p-2 text-lg font-medium focus:outline-none focus:ring-0"
              />
              <button
                onClick={(e) => handleToggle(e)}
                className="z-5 absolute bottom-0 right-0 rounded-md bg-slate-800 p-2 text-white"
              >
                {pswdShow ? "Show" : "Hide"}
              </button>
            </div>
            {errors.password && (
              <div className="text-sm text-red-500">
                {errors.password.message}
              </div>
            )}
          </div>
          <div className="relative my-3 flex flex-col justify-between">
            <label
              htmlFor="password"
              className="text-xl font-semibold text-slate-900"
            >
              Confirm Password:{" "}
            </label>
            <div className="relative flex flex-col">
              <input
                type={pswdShow ? "password" : "text"}
                placeholder=""
                {...register("password2", {
                  required: { value: true, message: "This field is Required" },
                  minLength: {
                    value: 8,
                    message: "Password must be 8 character Long",
                  },
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
                    message:
                      "Password must contain atleast a letter, a number and a Character",
                  },
                })}
                className="peer w-full border bg-white p-2 text-lg font-medium focus:outline-none focus:ring-0"
              />
              <button
                onClick={(e) => handleToggle(e)}
                className="z-5 absolute bottom-0 right-0 rounded-md bg-slate-800 p-2 text-white"
              >
                {pswdShow ? "Show" : "Hide"}
              </button>
            </div>
            {errors.password2 && (
              <div className="text-sm text-red-500">
                {errors.password2.message}
              </div>
            )}
          </div>

          <Button
            disabled={isSubmitting}
            type="submit"
            text="Change Password"
          />
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
