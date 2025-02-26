import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/Product";

type ProductDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "ProductDetail"
>;

type ProductDetailScreenProps = {
  route: ProductDetailScreenRouteProp;
};

const ProductDetails: React.FC<ProductDetailScreenProps> = ({ route }) => {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.infoHeader}>ID: {product.id}</Text>
      <Text>Información Extra</Text>
      <Text style={styles.name}>Nombre: {product.name}</Text>
      <Text style={styles.description}>Descripción {product.description}</Text>
      <Text>Logo</Text>
      <Image source={{ uri: product.logo }} style={styles.logo} />
      <Text style={styles.date}>
        Fecha de liberación: {product.date_release}
      </Text>
      <Text style={styles.date}>Fecha revisión: {product.date_revision}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoHeader: {
    fontWeight: "bold",
    fontSize: 24,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  name: {
    fontSize: 15,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  description: {
    fontSize: 15,
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
});

export default ProductDetails;
