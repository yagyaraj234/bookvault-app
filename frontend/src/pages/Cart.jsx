import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, setCartValue } from "../store/cart/cartSlice";
import { NavLink, useNavigate } from "react-router-dom";

const Cart = () => {
  const [order, setOrder] = useState(false);
  const cart = useSelector((state) => state.cartSlice);
  const { item: cartItems, cartValue } = cart;
  const [userData, setUserData] = useState({
    email: "",
    card_no: "",
    expiry: "",
    cvv: "",
    name: "",
    address: "",
    zip: "",
    state: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const calculateCartValue = useMemo(
    () => () => {
      const cartTotal = cartItems?.reduce((acc, curr) => {
        return acc + (curr?.saleInfo?.listPrice?.amount || 0);
      }, 0);
      dispatch(setCartValue(cartTotal));
    },
    [cartItems, dispatch]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrder(true);
    console.log(userData);
    setTimeout(() => {
      dispatch(removeFromCart());
      navigate("/order-placed");
      setOrder(false);
    }, 5000);

    console.log("hehe");
  };

  useEffect(() => {
    calculateCartValue();
  }, [calculateCartValue]);

  return (
    <>
      <div class="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div class="px-4 pt-8">
          <p class="text-xl font-medium">Order Summary</p>
          <p class="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <div class="mt-8 space-y-3 rounded-lg border border-gray-800 shadow-2xl px-2 py-4 sm:px-6 max-h-[80vh] overflow-y-auto">
            {cartItems?.map((cart) => (
              <div
                class="text-white flex flex-col rounded-lg  sm:flex-row bg-gray-900"
                key={cart.id}
              >
                <img
                  class="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  src={cart?.volumeInfo?.imageLinks?.thumbnail}
                  alt="hkj"
                />
                <div class="flex w-full flex-col px-4 py-4">
                  <span class="font-semibold">{cart?.volumeInfo?.title}</span>
                  <span class="float-right text-gray-400">
                    Publiser:
                    {cart.volumeInfo?.publisher || "Not available"}
                  </span>
                  <div className="flex justify-between">
                    <p class="text-lg font-semibold text-gray-400">
                      {cart?.saleInfo?.listPrice?.amount || "Free ( Ebook )"}
                    </p>
                    <button
                      onClick={() => dispatch(removeFromCart(cart?.id))}
                      className="underline text-gray-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {cartItems?.length ? (
          <div class="mt-10  px-4 pt-8 lg:mt-0">
            <p class="text-xl font-medium text-white">Payment Details</p>
            <p class="text-gray-400">
              Complete your order by providing your payment details.
            </p>
            <form onSubmit={handleSubmit}>
              <label for="email" class="mt-4 mb-2 block text-sm font-medium">
                Email
              </label>
              <div class="relative">
                <input
                  required
                  onChange={handleChange}
                  type="email"
                  id="email"
                  name="email"
                  class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none text-gray-200 focus:z-10 focus:border-blue-500 focus:ring-blue-500 bg-gray-800
                "
                  placeholder="your.email@gmail.com"
                />
                <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <ion-icon name="at-outline"></ion-icon>
                </div>
              </div>
              <label
                for="card-holder"
                class="mt-4 mb-2 block text-sm font-medium"
              >
                Card Holder
              </label>
              <div class="relative">
                <input
                  required
                  onChange={handleChange}
                  type="text"
                  id="name"
                  name="name"
                  class="w-full rounded-md border text-gray-200 border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 bg-gray-800"
                  placeholder="Your full name here"
                />
                <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <ion-icon name="person-outline"></ion-icon>
                </div>
              </div>
              <label for="card-no" class="mt-4 mb-2 block text-sm font-medium">
                Card Details
              </label>
              <div class="flex">
                <div class="relative w-7/12 flex-shrink-0">
                  <input
                    required
                    onChange={handleChange}
                    type="number"
                    id="card_no"
                    name="card_no"
                    class="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none text-gray-200 focus:z-10 focus:border-blue-500 focus:ring-blue-500 bg-gray-800 "
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                  />
                  <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3 text-gray-300 max-sm:hidden">
                    <ion-icon name="card-outline" size="small"></ion-icon>
                  </div>
                </div>
                <input
                  required
                  onChange={handleChange}
                  type="text"
                  name="expiry"
                  class="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none text-gray-200 focus:z-10 focus:border-blue-500 focus:ring-blue-500 bg-gray-800"
                  placeholder="MM/YY"
                />
                <input
                  required
                  onChange={handleChange}
                  type="number"
                  name="cvv"
                  class="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none text-gray-200 focus:z-10  bg-gray-800 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="CVC"
                />
              </div>
              <label
                for="billing-address"
                class="mt-4 mb-2 block text-sm font-medium"
              >
                Billing Address
              </label>
              <div class="flex flex-col sm:flex-row gap-2">
                <div class="relative flex-shrink-0 sm:w-7/12">
                  <input
                    onChange={handleChange}
                    required
                    type="text"
                    id="address"
                    name="address"
                    class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none text-gray-200 focus:z-10 focus:border-blue-500 focus:ring-blue-500 bg-gray-800"
                    placeholder="Street Address"
                  />
                  <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <img
                      class="h-4 w-4 object-contain"
                      src="https://www.shutterstock.com/image-vector/india-flag-260nw-91811036.jpg"
                      alt="flag"
                    />
                  </div>
                </div>
                <select
                  onChange={handleChange}
                  type="text"
                  name="state"
                  class="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none text-gray-200 focus:z-10 focus:border-blue-500 focus:ring-blue-500 bg-gray-800"
                >
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                </select>
                <input
                  required
                  onChange={handleChange}
                  type="text"
                  name="zip"
                  class="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none text-gray-200 sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500 bg-gray-800"
                  placeholder="ZIP"
                />
              </div>

              {/* <!-- Total --> */}
              <div class="mt-6 border-t border-b py-2">
                <div class="flex items-center justify-between text-gray-600">
                  <p class="text-sm font-medium text-gray-300">Subtotal</p>
                  <p class="font-semibold text-gray-300">₹ {cartValue}</p>
                </div>
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-gray-300">Shipping</p>
                  <p class="font-semibold text-gray-300"> ₹ 0</p>
                </div>
              </div>
              <div class="mt-6 flex items-center justify-between text-gray-200">
                <p class="text-sm font-medium ">Total</p>
                <p class="text-2xl font-semibold ">₹ {cartValue}</p>
              </div>
              <button
                type="submit"
                class="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
              >
                {order ? "Placing Order..." : "Place Order"}
              </button>
            </form>
          </div>
        ) : (
          <div className="flex items-center flex-col gap-5">
            <p className="text-center font-semibold text-xl">Cart is Empty</p>
            <NavLink
              to="/products"
              className="text-white border p-2 rounded-lg font-semibold"
            >
              Shop Now
            </NavLink>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
