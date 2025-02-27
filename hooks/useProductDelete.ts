import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/Store";
import { useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/Product";
import { deleteProduct } from "../redux/product/ProductSlice";

export const useProductDelete = (
  productId: string,
  navigation: NavigationProp<RootStackParamList>
) => {
  const dispatch = useDispatch<AppDispatch>();
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = async () => {
    try {
      await dispatch(deleteProduct(productId)).unwrap();
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "ProductList",
            params: { successMessage: "Producto eliminado correctamente!" },
          },
        ],
      });
    } catch (error) {
      console.error("Failed to delete product:", error);
    } finally {
      setModalVisible(false);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return { modalVisible, setModalVisible, handleDelete, handleCancel };
};
