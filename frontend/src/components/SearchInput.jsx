import axios from "axios";
import React, { useState, useEffect,memo } from "react";
import { useDispatch } from "react-redux";
import { setFilterProducts } from "../store/product/productSlice";

const SearchInput = ({ setIsLoading }) => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  let timerId;

  const getSearchItems = async (searchQuery) => {
    setIsLoading(true);
    try {
      const url = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=${process.env.REACT_APP_API_KEY}&maxResults=40`;
      const res = await axios.get(url);

      if (res.data?.items) {
        dispatch(setFilterProducts(res.data.items));
      } else {
        dispatch(setFilterProducts([])); // Dispatch empty array if no items found
      }

      setIsLoading(false);
    } catch (error) {
      dispatch(setFilterProducts([]));
      setIsLoading(false);
    }
  };

  const debounceSearch = (value) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      getSearchItems(value);
    }, 2000);
  };

  useEffect(() => {
    debounceSearch(searchText);
  // eslint-disable-next-line
  }, [searchText]);

  return (
    <>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search here"
        className="input input-bordered w-full max-w-xs focus:outline-none mx-auto bg-gray-900"
      />
    </>
  );
};

export default memo(SearchInput);
