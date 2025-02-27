import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../redux/product/ProductSlice";
import { RootState } from "../redux/Store";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { RootStackParamList, Product } from "../types/Product";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";
import { AppDispatch } from "../redux/Store";

type ProductsListProps = {
  navigation: NavigationProp<RootStackParamList, "ProductList">;
  route: RouteProp<RootStackParamList, "ProductList">;
};

const ProductsList: React.FC<ProductsListProps> = ({ navigation, route }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  useEffect(() => {
    if (route.params?.successMessage) {
      setSuccessMessage(route.params.successMessage);
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  }, [route.params?.successMessage]);

  const filteredProducts =
    products?.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.id.toString().includes(searchQuery)
    ) || [];

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate("ProductDetail", { product: item })}
    >
      <View>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemSubtitle}>ID: {item.id}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {successMessage && (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>{successMessage}</Text>
        </View>
      )}
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <CustomButton
        text="Agregar"
        textColor="#0f265c"
        backgroundColor="#ffdd00"
        onPress={() => navigation.navigate("AddProduct")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
  },
  searchBar: {
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#CCC",
  },
  listContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#CCC",
    backgroundColor: "#FFF",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  successContainer: {
    backgroundColor: "#d4edda",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  successText: {
    color: "#155724",
    fontSize: 16,
  },
});

export default ProductsList;
