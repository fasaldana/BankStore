import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";
import { useEffect, useState } from "react";
import { loadProducts } from "../redux/product/ProductSlice";

export const useProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  const filteredProducts =
    products?.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.id.toString().includes(searchQuery)
    ) || [];

  return { filteredProducts, loading, error, searchQuery, setSearchQuery };
};
