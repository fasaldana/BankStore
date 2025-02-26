import axios from "axios";

const API_URL = "http://192.168.1.26:3002/bp/products";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error fetching products: " + error.message);
    } else {
      throw new Error("Error fetching products");
    }
  }
};
