import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { setFilterType } from "../store/product/productSlice";

const Filter = ({ setIsLoading }) => {
  const dispatch = useDispatch();

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    dispatch(setFilterType(selectedValue));
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="max-sm:text-sm">
      <select
        id="pricingType"
        name="pricingType"
        className="w-full h-10 border-1 border-gray-600 focus:outline-none text-white rounded px-2 md:px-3 py-0 md:py-1 tracking-wider bg-gray-900 p-1"
        onChange={handleSelectChange}
      >
        <option className="bg-gray-800" value="recommended">
          Recommended
        </option>
        <option className="bg-gray-800" value="low">
          Price: Low to High
        </option>
        <option className="bg-gray-800" value="high">
          Price: High to Low
        </option>
        <option className="bg-gray-800" value="inc-ebooks">
          Show Only Ebooks
        </option>
        <option className="bg-gray-800" value="ex-ebooks">
          Exclude Ebooks
        </option>
      </select>
    </div>
  );
};

export default memo(Filter);
