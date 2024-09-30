import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../AuthProvider";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { TiTick } from "react-icons/ti";
import { IoIosCloseCircle } from "react-icons/io";

const API_URL = import.meta.env.VITE_API_URL;

const Address = () => {
  const { IsAuthenticated, user } = useContext(AuthContext);
  const [address, setAddress] = useState([]);
  const [currentAddress, setCurrentAddress] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur", // Triggers validation on blur
  });

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("access_token");

      const formData = new FormData();

      // Log FormData
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const res = await axios.post(`${API_URL}/api/users/addAddress/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      toast.success("Address Saved Successfully");
    } catch (error) {
      console.error("Error saving Address", error);
    }
  };

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await axios.get(`${API_URL}/api/users/addAddress/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setAddress(res.data);
      } catch (error) {
        console.log("Error ", error);
      }
    };

    fetchAddress();
  }, [address]);

  const handleSelect = async (id) => {
    setCurrentAddress(id);
    console.log(id);
    try {
      const token = localStorage.getItem("access_token");
      const res = await axios.patch(
        `${API_URL}/api/users/addAddress/${id}/`,
        {
          is_current: "True",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
    } catch (error) {
      console.log("Error ", error);
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const token = localStorage.getItem("access_token");
      const res = await axios.delete(`${API_URL}/api/users/addAddress/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log("Error ", error);
    }
  };
  return (
    <>
      <div className="mx-auto flex w-full max-w-[600px] flex-col md:mx-0">
        <div className="text-center text-lg font-bold text-primary">
          Personal Information
        </div>
        <div className="mx-auto my-2 grid w-80 grid-cols-1 justify-center gap-2 rounded-xl border bg-white p-5 shadow-md md:w-[600px] md:grid-cols-2">
          {/* Full Name */}
          <div>
            <label
              htmlFor="address1"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name:
            </label>
            <input
              id="address1"
              type="text"
              value={user.name}
              disabled
              className="mx-2 w-full border bg-white p-2 text-lg font-medium text-primary focus:outline-none focus:ring-0"
            />
          </div>
          {/* Email */}
          <div>
            <label
              htmlFor="address1"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              id="address1"
              type="text"
              value={user.email}
              disabled
              className="mx-2 w-full border bg-white p-2 text-lg font-medium text-primary focus:outline-none focus:ring-0"
            />
          </div>
        </div>

        <div className="text-center text-lg font-bold text-primary">
          Current Address
        </div>
        <div className="mx-auto my-2 grid w-80 grid-cols-1 justify-center gap-2 rounded-xl border bg-white p-5 shadow-md md:w-[600px] md:grid-cols-2">
          {address.map((data) => (
            <>
              <div
                onClick={() => handleSelect(data.id)}
                className={`w-76 relative rounded-md border ${currentAddress === data.id ? "bg-blue-200" : "bg-slate-50"} cursor-pointer p-2`}
              >
                <button onClick={() => handleDelete(data.id)} title="Delete">
                  <IoIosCloseCircle className="absolute right-2 top-2 w-6 text-red-600" />
                </button>
                <p className="text-md font-medium">
                  {data.is_current ? (
                    <span className="absolute top-0 flex items-center gap-1">
                      Selected <TiTick className="text-xl text-green-600" />
                    </span>
                  ) : (
                    ""
                  )}
                </p>
                <p className="text-md font-medium">{data.address1}</p>
                <p className="text-md font-medium">{data.address2}</p>
                <p className="text-md font-medium">{data.district}</p>
                <p className="text-md font-medium">{data.pin}</p>
                <p className="text-md font-medium">{data.phone}</p>
              </div>
            </>
          ))}
          {/* <button
            // onClick={}
            className="mt-4 w-full rounded-md bg-blue-500 py-2 text-white"
            disabled={!currentAddress}
          >
            Save Current Address
          </button> */}
        </div>

        <div className="mt-10 text-center text-lg font-bold text-primary">
          Add New Address
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto my-3 space-y-2"
        >
          <div className="mx-auto grid w-80 grid-cols-1 justify-center gap-2 rounded-xl border bg-white p-5 shadow-md md:w-[600px] md:grid-cols-2">
            {/* Address-1 */}
            <div>
              <label
                htmlFor="address1"
                className="block text-sm font-medium text-gray-700"
              >
                House No/Lane No./Street No.
              </label>
              <input
                id="address1"
                type="text"
                defaultValue={address ? address.address1 : ""}
                {...register("address1", { required: "Address-1 is required" })}
                className="mx-2 w-full border bg-white p-2 text-lg font-medium text-primary focus:outline-none focus:ring-0"
              />
              {errors.address1 && (
                <p className="text-sm text-red-600">
                  {errors.address1.message}
                </p>
              )}
            </div>
            {/* Address-2 */}
            <div>
              <label
                htmlFor="address2"
                className="block text-sm font-medium text-gray-700"
              >
                Town/City
              </label>
              <input
                id="address2"
                type="text"
                defaultValue={address ? address.address2 : ""}
                {...register("address2")}
                className="mx-2 w-full border bg-white p-2 text-lg font-medium text-primary focus:outline-none focus:ring-0"
              />
            </div>
            {/* State */}
            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700"
              >
                State
              </label>
              <input
                id="state"
                type="text"
                value="Odisha"
                {...register("state", { required: "State is required" })}
                className="mx-2 w-full border bg-white p-2 text-lg font-medium text-primary focus:outline-none focus:ring-0"
              />
              {errors.state && (
                <p className="text-sm text-red-600">{errors.state.message}</p>
              )}
            </div>
            {/* District */}
            <div>
              <label
                htmlFor="district"
                className="block text-sm font-medium text-gray-700"
              >
                District
              </label>
              <input
                id="district"
                type="text"
                defaultValue={address ? address.district : ""}
                {...register("district", { required: "District is required" })}
                className="mx-2 w-full border bg-white p-2 text-lg font-medium text-primary focus:outline-none focus:ring-0"
              />
              {errors.district && (
                <p className="text-sm text-red-600">
                  {errors.district.message}
                </p>
              )}
            </div>
            {/* pin */}
            <div>
              <label
                htmlFor="pin"
                className="block text-sm font-medium text-gray-700"
              >
                Pin
              </label>
              <input
                id="pin"
                type="text"
                defaultValue={address ? Number(address.pin) : ""}
                {...register("pin", {
                  required: "pin is required",
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "pin must be a 6-digit number",
                  },
                })}
                className="mx-2 w-full border bg-white p-2 text-lg font-medium text-primary focus:outline-none focus:ring-0"
              />
              {errors.pin && (
                <p className="text-sm text-red-600">{errors.pin.message}</p>
              )}
            </div>
            {/* phone */}
            <div>
              <label
                htmlFor="pin"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                id="phone"
                type="text"
                defaultValue={address ? Number(address.phone) : ""}
                {...register("phone", {
                  required: "Phone no. is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone no. must be a 10-digit number",
                  },
                })}
                className="mx-2 w-full border bg-white p-2 text-lg font-medium text-primary focus:outline-none focus:ring-0"
              />
              {errors.phone && (
                <p className="text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="float-right mx-auto rounded-md bg-indigo-600 px-4 py-2 font-medium text-white transition-all hover:bg-indigo-700"
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default Address;
