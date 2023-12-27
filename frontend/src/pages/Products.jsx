import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import ProductCard from "../components/ProductCard";
import Filter from "../components/Filter";
import SearchInput from "../components/SearchInput";
import { setProducts } from "../store/product/productSlice";
import { filterProducts } from "../utils/filter";

import { useDispatch, useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";

const url = `https://www.googleapis.com/books/v1/volumes?q=r&key=${process.env.REACT_APP_API_KEY}&maxResults=40`;

const Products = () => {
  const { loading, error, data } = useFetch(url);
  const [isLoading, setIsLoading] = useState(false);
  const [listProducts, setListProducts] = useState([]);

  const products = useSelector((state) => state.productSlice.product);
  const searchedProducts = useSelector(
    (state) => state.productSlice.filterProduct
  );
  const filterType = useSelector((state) => state.productSlice.filterType);

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setProducts(data.items));
    }
    // eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    let filteredProducts =
      searchedProducts.length > 0 ? searchedProducts : products;
    filteredProducts = filterProducts(filteredProducts, filterType);
    setListProducts(filteredProducts);
  }, [filterType, searchedProducts, products]);
  return (
    <>
      <div className="flex flex-col items-center">
        {error && (
          <p className="text-center">
            Something went wrong while loading books. <br />
            Please try again later. 🙏🙏
          </p>
        )}
      </div>

      {!error && (
        <div className="flex mt-5  gap-5 px-5 justify-around sm:justify-end">
          <SearchInput setIsLoading={setIsLoading} />
          <Filter setIsLoading={setIsLoading} />
        </div>
      )}

      <div className="">
        {isLoading || loading ? (
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3  justify-items-center grid-cols-1 my-10 gap-5 p-2">
            {listProducts?.map((product) => (
              <div
                key={product.id}
                data-product-id={product.id}
                className="hover:cursor-pointer"
              >
                <ProductCard productDetail={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
