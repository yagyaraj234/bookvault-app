export const filterProducts = (products, filterBy) => {
  if (filterBy === "low") {
    // Sort products from low to high based on price
    return products?.slice()?.sort((a, b) => {
      const priceA = a?.saleInfo?.listPrice?.amount || 0;
      const priceB = b?.saleInfo?.listPrice?.amount || 0;
      return priceA - priceB;
    });
  } else if (filterBy === "high") {
    // Sort products from high to low based on price
    return products?.slice()?.sort((a, b) => {
      const priceA = a?.saleInfo?.listPrice?.amount || 0;
      const priceB = b?.saleInfo?.listPrice?.amount || 0;
      return priceB - priceA;
    });
  } else if (filterBy === "inc-ebooks") {
    return products?.filter((item) => !item?.saleInfo?.listPrice?.amount);
  } else if (filterBy === "ex-ebooks") {
    return products?.filter((item) => item?.saleInfo?.listPrice?.amount);
  } else {
    return products;
  }
};
