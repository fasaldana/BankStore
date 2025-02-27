import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchProducts,
  createProduct as apiCreateProduct,
  updateProduct as apiUpdateProduct,
  checkProductIdExists,
} from "../../api/Product";
import { Product } from "../../types/Product";

type ProductState = {
  products: Product[];
  loading: boolean;
  error: string | null;
};

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

export const loadProducts = createAsyncThunk<Product[], void>(
  "products/loadProducts",
  async (): Promise<Product[]> => {
    const response = await fetchProducts();
    return response;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product: Product, { rejectWithValue }) => {
    const idExists = await checkProductIdExists(product.id);
    if (idExists) {
      return rejectWithValue("ID already exists");
    }
    await apiCreateProduct(product);
    return product;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product: Product, { rejectWithValue }) => {
    try {
      await apiUpdateProduct(product.id, product);
      return product;
    } catch (error) {
      return rejectWithValue("Failed to update product");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load products";
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload
          ? [...state.products, action.payload]
          : state.products;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;
