import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { email, fullName, password } = data;
    console.log(data);
    try {
      const res = await axios.post(`/api/v1/users/register`, {
        email,
        fullName,
        password,
      });
      reset();
      toast.success("Account Created.");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col gap-12 justify-center items-center">
      <Toaster />
      <h1 className="text-white text-center font-semibold md:text-3xl text-xl">
        Signup Here
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 md:w-[25vw] w-[90vw]  mx-auto"
      >
        <label className="text-white font-medium space-x-1">Full Name</label>
        <input
          className="p-3  outline-none  dark:border-none text-gray-100 rounded-md bg-gray-900"
          placeholder="xyz@gmail.com"
          {...register("fullName", {
            required: "fullName is required",
            minLength: {
              value: 5,
              message: "minimum 5 characters required",
            },
          })}
        />
        <label className="text-white font-medium space-x-1">Email</label>
        <input
          className="p-3  outline-none dark:border-none text-gray-100 rounded-md bg-gray-900"
          placeholder="xyz@gmail.com"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <p className=" text-red-500">{`${errors.email.message}`}</p>
        )}

        <label className="text-white mt-2 font-medium space-x-1">
          Password
        </label>
        <input
          className="p-3  outline-none  text-gray-100 rounded-md  bg-gray-900"
          placeholder="%jd%392"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "must be 8 letters",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500">{`${errors.password.message}`}</p>
        )}

        <button
          className="bg-blue-700 disabled:bg-gray-600 p-2 rounded-md text-white mt-2 font-medium"
          type="submit"
          disabled={isSubmitting}
        >
          Signup
        </button>
        <Link
          to="/login"
          className="bg-blue-700 p-2 rounded-md text-white text-center"
        >
          Already Have Account? Click Here.
        </Link>
      </form>
    </div>
  );
};

export default Signup;
