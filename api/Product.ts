import axios from "axios";
import { Product } from "../types/Product";

const API_URL = "http://localhost:3002/bp/products";

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<{ data: Product[] }>(API_URL);
    return response.data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error fetching products: " + error.message);
    } else {
      throw new Error("Error fetching products");
    }
  }
};

export const createProduct = async (product: {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
}) => {
  try {
    const response = await axios.post(API_URL, {
      id: product.id,
      name: product.name,
      description: product.description,
      logo: product.logo,
      date_release: product.date_release,
      date_revision: product.date_revision,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error("Error creating product: " + error.message);
    } else {
      throw new Error("Error creating product");
    }
  }
};

export const updateProduct = async (
  id: string,
  product: {
    name: string;
    description: string;
    logo: string;
    date_release: string;
    date_revision: string;
  }
) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, {
      name: product.name,
      description: product.description,
      logo: product.logo,
      date_release: product.date_release,
      date_revision: product.date_revision,
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error updating product: " + error.message);
    } else {
      throw new Error("Error updating product");
    }
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    if (response.status === 200) {
      return "Product removed successfully";
    } else {
      throw new Error("Product not found");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error("Product not found");
    }
    if (error instanceof Error) {
      throw new Error("Error deleting product: " + error.message);
    } else {
      throw new Error("Error deleting product");
    }
  }
};

export const checkProductIdExists = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.status === 200;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return false;
    }
    if (error instanceof Error) {
      throw new Error("Error checking product ID: " + error.message);
    } else {
      throw new Error("Error checking product ID");
    }
  }
};
