import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "../../Components/Button";
import Navbar from "../../Sections/Navbar";
import { Helmet } from "react-helmet";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const ResetMail = () => {
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
        `${API_URL}/api/users/send-reset-pswd-mail/`,
        data,
      );
      console.log(res.data);
      toast.success(res.data.msg);
      reset();
    } catch (error) {
      if (error.response) {
        const serverErrors = error.response.data;
        for (const [key, value] of Object.entries(serverErrors)) {
          setError(key, { type: "server", message: value[0] });
        }
        toast.error(` Failed: ${error.response.data.errors.non_field_errors}`);
        console.log(error.response.data.errors);
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
              htmlFor="username"
              className="text-xl font-semibold text-slate-900"
            >
              Email:{" "}
            </label>
            <input
              type="email"
              placeholder="user@gmail.com"
              {...register("email", {
                required: { value: true, message: "This field is Required" },
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Entered value does not match email format",
                },
              })}
              className="peer w-full border bg-white p-2 text-lg font-medium focus:outline-none focus:ring-0"
            />
            {errors.email && (
              <div className="text-sm text-red-500">{errors.email.message}</div>
            )}
          </div>

          <Button
            disabled={isSubmitting}
            type="submit"
            text="Send Reset Link"
          />
        </form>
      </div>
    </>
  );
};

export default ResetMail;
