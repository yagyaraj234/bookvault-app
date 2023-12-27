import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import useFetch from "../hooks/useFetch";
import { addToCart } from "../store/cart/cartSlice";
import { useDispatch } from "react-redux";

const ProductDescription = () => {
  const [cartBtn, setCartBtn] = useState(false);
  const { id } = useParams();
  const url = `https://www.googleapis.com/books/v1/volumes/${id}?key=${process.env.REACT_APP_API_KEY}`;
  const dispatch = useDispatch();
  const { data, loading } = useFetch(url);

  const handleCart = () => {
    setCartBtn(true);
    setTimeout(() => {
      dispatch(addToCart(data));
      setCartBtn(false);
    }, 1000);
  };

  useEffect(() => {});
  return (
    <section className="py-12 sm:py-16">
      {loading ? (
        <div className="flex items-center justify-center w-screen">
          <ThreeDots
            height={80}
            width={80}
            radius={9}
            color="#4682B4"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      ) : (
        <div className="container mx-auto px-4">
          <nav className="flex">
            <ol  className="flex items-center">
              <li className="text-left">
                <div className="-m-1">
                  <NavLink
                    to="/"
                    className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"
                  >
                    Home
                  </NavLink>
                </div>
              </li>

              <li className="text-left">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <div className="-m-1">
                    <NavLink
                      to="/products"
                      className="rounded-md p-1 text-sm font-medium text-gray-400 focus:text-gray-700 focus:shadow hover:text-gray-600"
                    >
                      {" "}
                      Products{" "}
                    </NavLink>
                  </div>
                </div>
              </li>

              <li className="text-left">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <div className="-m-1">
                    <div
                      className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"
                      aria-current="page"
                    >
                      {data?.volumeInfo?.title}
                    </div>
                  </div>
                </div>
              </li>
            </ol>
          </nav>

          <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-3 lg:row-end-1">
              <div className="lg:flex lg:items-start">
                <div className="lg:order-2 lg:ml-5">
                  <div className="max-w-xl overflow-hidden rounded-lg">
                    <img
                      className="h-6/12 w-6/12 md:h-11/12 md:w-11/12 mx-auto"
                      src={data?.volumeInfo?.imageLinks?.thumbnail}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
              <h1 className="sm: text-2xl font-bold text-gray-200 sm:text-3xl">
                {data?.volumeInfo?.title}
              </h1>

              <div className="mt-10 flex flex-col items-center justify-between space-y-4  border-b py-4 sm:flex-row sm:space-y-0">
                <div className="flex items-end">
                  <h1 className="text-3xl font-bold">
                    {data?.saleInfo?.listPrice?.amount
                      ? `₹${data?.saleInfo?.listPrice?.amount}`
                      : "Free ( Ebook )"}
                  </h1>
                </div>

                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none border-gray-700 hover:border-gray-500 p-2 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                  onClick={handleCart}
                >
                  {cartBtn ? "Adding to cart" : "Add to Cart"}
                </button>
              </div>

              <ul className="mt-8 space-y-2">
                <li className="flex gap-2 items-center text-left text-sm font-medium text-gray-600">
                  <ion-icon name="globe-outline"></ion-icon>
                  Free shipping worldwide
                </li>

                <li className="flex gap-2 items-center text-left text-sm font-medium text-gray-600">
                  <ion-icon name="card-outline"></ion-icon>
                  Cancel Anytime
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3">
              <div className="border-b border-gray-300">
                <nav className="flex gap-4">
                  <div
                    href="#"
                    title=""
                    className=" border-gray-900 py-4 text-sm font-medium text-gray-200 hover:border-gray-400 "
                  >
                    Description
                  </div>
                </nav>
              </div>

              <div className="mt-8 flow-root sm:mt-12">
                <h1 className="text-3xl font-bold">
                  {data?.volumeInfo?.title}
                </h1>
                <p className="mt-4 text-white">
                  Published date :
                  <span className="text-gray-300 font-medium">
                    {data?.volumeInfo?.publishedDate}
                  </span>
                </p>
                <p className="mt-4 text-white">
                  Publisher :
                  <span className="text-gray-300 font-medium">
                    {data?.volumeInfo?.publisher}
                  </span>
                </p>
                <p className="mt-4 text-white">
                  Ratings :
                  <span className="text-gray-300 font-medium">
                    {data?.volumeInfo?.averageRating}
                  </span>
                </p>
                <p className="mt-4 text-white">
                  language :{" "}
                  <span className="text-gray-500font-medium uppercase">
                    {data?.volumeInfo?.language}
                  </span>
                </p>
                <p className="mt-4 text-white">
                  Page count :
                  <span className="text-gray-300 font-medium">
                    {data?.volumeInfo?.printedPageCount}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDescription;
