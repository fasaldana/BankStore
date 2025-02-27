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
      <View style={styles.textContainer}>
        <View style={styles.inLineData}>
          <Text style={styles.title}>Nombre</Text>
          <Text style={styles.description}>{product.name}</Text>
        </View>
        <View style={styles.inLineData}>
          <Text style={styles.title}>Descripción</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
        <Text style={styles.title}>Logo</Text>
        <Image
          source={{ uri: product.logo }}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.inLineData}>
          <Text style={styles.title}>Fecha liberación</Text>
          <Text style={styles.description}>{product.date_release}</Text>
        </View>
        <View style={styles.inLineData}>
          <Text style={styles.title}>Fecha revisión</Text>
          <Text style={styles.description}>{product.date_revision}</Text>
        </View>
      </View>
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
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  textContainer: {
    marginTop: 20,
    padding: 15,
  },
  inLineData: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    flexWrap: "wrap",
  },
  title: {
    fontSize: 18,
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    flex: 2,
    alignSelf: "flex-end",
    textAlign: "right",
  },
});

export default ProductDetails;
