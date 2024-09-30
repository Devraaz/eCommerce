import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { BsX } from "react-icons/bs";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Quill from "quill"; // Import Quill
import "quill/dist/quill.snow.css"; // Import Quill's CSS
import "../../quill.css";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const API_URL = import.meta.env.VITE_API_URL;

const AddProduct = () => {
  const quillRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const {
    control,
    register,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    defaultValues: {
      variant: [],
      uploaded_images: [],
    },
  });

  // Handle Reset
  const handleReset = (e) => {
    e.preventDefault();
    reset();
  };

  // Handle Form Data
  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("access_token");

      // Create a FormData object
      const formData = new FormData();
      formData.append("product_name", data.product_name);
      formData.append("product_description", data.product_description);
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      formData.append("discount", data.discount);
      formData.append("category", data.category);

      Array.from(data.images).forEach((image, index) => {
        formData.append(`uploaded_images[${index}]`, image);
      });
      // Array.from(data.variant).forEach((variant, index) => {
      //   formData.append(`variant[${index}][size]`, variant.size);
      // });
      // Convert variant data to JSON string
      formData.append("variant", JSON.stringify(data.variant));

      // data.variant.forEach((variant, index) => {
      //   formData.append(`variant[${index}][size]`, variant.size);
      // });

      // Log FormData
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const res = await axios.post(
        `${API_URL}/api/products/addproducts/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
            "Content-Type": "multipart/form-data", // Ensure proper content type
          },
        },
      );

      toast.success("Product Added Successfully");
      console.log("Product saved:", res.data);
      reset();
    } catch (error) {
      console.error("Error saving product:", error);
    }

    console.log("Form Data:", data);
    localStorage.setItem("data_p", JSON.stringify(data));
  };

  useEffect(() => {
    const existingQuill = quillRef.current.__quill;
    if (!existingQuill) {
      const quill = new Quill(quillRef.current, {
        theme: "snow",
        modules: {
          toolbar: true,
        },
      });
      quill.on("text-change", () => {
        // Update form value when Quill content changes
        setValue("product_description", quill.root.innerHTML);
      });

      // Store the Quill instance on the ref element
      quillRef.current.__quill = quill;
    }

    const token = localStorage.getItem("access_token");
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const result = await axios.get(`${API_URL}/api/products/categories/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setCategories(result.data);
      } catch (error) {
        console.log("Error Fetching Cateogries", error);
      }
    };
    fetchCategories();
  }, []);

  const {
    fields: sizeFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "variant",
  });

  // Function to remove an image
  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setValue("images", updatedImages);
  };
  const images = watch("images", []);

  return (
    <>
      <Helmet>
        <title>Add Products | India's Smartest Shopping Point</title>
      </Helmet>
      <div className="right-0 mx-auto mb-5 w-full p-1">
        <div className="text-center text-xl font-medium text-white">
          Add Products
        </div>
        <div className="mx-auto p-5">
          <form
            onSubmit={handleSubmit(onSubmit)}
            action=""
            className="form grid grid-cols-1 gap-5 lg:grid-cols-2"
          >
            <section className="flex flex-col justify-center rounded-xl bg-slate-700 p-5 shadow-md md:w-96">
              <div className="relative my-3 flex flex-col justify-between gap-1">
                <label htmlFor="username" className="text-sm text-white">
                  Product Name:
                </label>

                <input
                  type="text"
                  {...register("product_name", {
                    required: {
                      value: true,
                      message: "This field is Required",
                    },
                  })}
                  className="rounded-md border border-slate-600 bg-transparent p-1 text-sm text-slate-200"
                  placeholder="Enter Product Name"
                />

                {errors.product_name && (
                  <div className="text-sm text-red-500">
                    {errors.product_name.message}
                  </div>
                )}
              </div>

              <div className="relative my-3 flex flex-col justify-between gap-1">
                <label htmlFor="username" className="text-sm text-white">
                  Product Description:
                </label>

                <input
                  type="textarea"
                  {...register("product_description", {
                    required: {
                      value: true,
                      message: "This field is Required",
                    },
                  })}
                  className="rounded-md border border-slate-600 bg-transparent p-1 text-sm text-slate-200"
                  placeholder="Enter Product Name"
                />

                {errors.product_description && (
                  <div className="text-sm text-red-500">
                    {errors.product_description.message}
                  </div>
                )}
              </div>
              <div className="relative my-3 flex flex-col justify-between gap-1">
                <label htmlFor="editor" className="text-sm text-white">
                  Product Description (Rich Text):
                </label>
                <div
                  ref={quillRef}
                  className="quill-editor rounded-md border border-slate-600 text-white"
                ></div>
              </div>

              {/* Fields for Price and Quantity */}
              <div className="flex w-full flex-row items-start gap-4">
                <div className="relative my-3 flex min-w-20 flex-col justify-between gap-1">
                  <label htmlFor="username" className="text-sm text-white">
                    Product Price:
                  </label>

                  <input
                    type="number"
                    {...register("price", {
                      required: {
                        value: true,
                        message: "This field is Required",
                      },
                    })}
                    className="rounded-md border border-slate-600 bg-transparent p-1 text-sm text-slate-200"
                    placeholder="Enter Price"
                  />

                  {errors.price && (
                    <div className="text-sm text-red-500">
                      {errors.price.message}
                    </div>
                  )}
                </div>
                <div className="relative my-3 flex min-w-20 flex-col justify-between gap-1">
                  <label htmlFor="username" className="text-sm text-white">
                    Product Quantity:
                  </label>

                  <input
                    type="number"
                    {...register("stock", {
                      required: {
                        value: true,
                        message: "This field is Required",
                      },
                    })}
                    className="rounded-md border border-slate-600 bg-transparent p-1 text-sm text-slate-200"
                    placeholder="Enter Quantity"
                  />

                  {errors.stock && (
                    <div className="text-sm text-red-500">
                      {errors.stock.message}
                    </div>
                  )}
                </div>
              </div>

              {/* Fields for Discount and Category */}
              <div className="flex w-full flex-row items-start gap-4">
                <div className="flex min-w-20 flex-row items-start gap-4">
                  <div className="relative my-3 flex flex-col justify-between gap-1">
                    <label htmlFor="username" className="text-sm text-white">
                      Discount:
                    </label>

                    <input
                      type="number"
                      {...register("discount", {
                        required: {
                          value: true,
                          message: "This field is Required",
                        },
                      })}
                      className="rounded-md border border-slate-600 bg-transparent p-1 text-sm text-slate-200"
                      placeholder="Enter Discount"
                    />

                    {errors.discount && (
                      <div className="text-sm text-red-500">
                        {errors.discount.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="relative my-3 flex min-w-20 flex-col justify-between gap-1">
                  <label htmlFor="category" className="text-sm text-white">
                    Category:
                  </label>
                  <select
                    {...register("category", {
                      required: {
                        value: true,
                        message: "This field is Required",
                      },
                    })}
                    className="rounded-md border border-slate-600 bg-slate-700 bg-transparent p-1 text-sm text-slate-200"
                  >
                    <option value="" className="bg-slate-700">
                      Select a category
                    </option>
                    {categories.map((category) => (
                      <option
                        className="bg-slate-700"
                        key={category.id}
                        value={category.id}
                      >
                        {category.description}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <div className="text-sm text-red-500">
                      {errors.category.message}
                    </div>
                  )}
                </div>
              </div>

              {/* Product Sizes Field */}
              <div className="relative my-3 flex flex-col justify-between gap-1">
                <label htmlFor="sizes" className="text-sm text-white">
                  Product Sizes:
                </label>
                {sizeFields.map((item, index) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <input
                      type="text"
                      {...register(`variant.${index}.size`, {
                        required: { value: true, message: "Size is required" },
                      })}
                      defaultValue={item.size}
                      className="rounded-md border border-slate-600 bg-transparent p-1 text-sm text-slate-200"
                      placeholder="Enter Size"
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="rounded bg-red-500 p-1 text-white"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => append({ size: "" })}
                  className="mt-2 rounded bg-green-500 p-2 text-white"
                >
                  Add Size
                </button>
                {errors.variant && (
                  <div className="text-sm text-red-500">
                    {errors.variant.message}
                  </div>
                )}
              </div>
            </section>

            <section className="flex flex-col rounded-xl bg-slate-700 p-5 shadow-md md:w-96">
              <label htmlFor="images" className="text-sm text-white">
                Upload Images:
              </label>
              <Controller
                name="images"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <input
                      id="images"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        const files = Array.from(e.target.files);
                        setValue("images", files);
                        onChange(files);
                      }}
                      onBlur={onBlur}
                      className="rounded border border-gray-300 p-2"
                    />
                    <div className="mt-2 flex flex-wrap gap-2">
                      {images &&
                        Array.from(images).map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Preview ${index}`}
                              className="h-32 w-32 rounded border border-gray-300 object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute right-0 top-0 rounded bg-red-500 p-1 text-white opacity-50 hover:opacity-95"
                            >
                              <BsX />
                            </button>
                          </div>
                        ))}
                    </div>
                  </>
                )}
              />
            </section>

            {/* Button Group */}
            <div className="flex flex-row items-start gap-4">
              <button
                type="submit"
                className="w-full rounded-md bg-green-500 p-2 text-white"
              >
                Submit
              </button>
              <button
                className="w-full rounded-md bg-blue-500 p-2 text-white"
                onClick={(e) => handleReset(e)}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
