import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../store/user/userSlice";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    console.log(data);

    try {
      await axios.post(`/api/v1/users/login`, { email, password });
      navigate("/products");
      toast.success("Logged In");
      dispatch(setLoggedIn(true));
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col gap-12 justify-center items-center">
      <Toaster />
      <h1 className=" text-center font-semibold md:text-3xl text-xl text-white">
        Login Here
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 md:w-[25vw] w-[90vw]  mx-auto rounded-xl "
      >
        <label className="text-white  font-medium space-x-1">Email</label>
        <input
          className="p-3  outline-none border-2 dark:border-none text-gray-100 rounded-md bg-gray-900  border-gray-900"
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
          className="p-3  outline-none border-2 dark:border-none text-gray-100 rounded-md  bg-gray-900  border-gray-900"
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
          Log In
        </button>
        <Link
          to="/signup"
          className="bg-blue-700 p-2 rounded-md text-white text-center"
        >
          Don't Have Account? Click Here.
        </Link>
      </form>
    </div>
  );
};

export default Login;
