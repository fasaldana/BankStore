import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/Product";
import CustomButton from "../components/CustomButton";

type ProductDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "ProductDetail"
>;

type ProductDetailScreenProps = {
  route: ProductDetailScreenRouteProp;
  navigation: NavigationProp<RootStackParamList, "ProductDetail">;
};

const ProductDetails: React.FC<ProductDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
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
      <CustomButton
        backgroundColor="#ccc"
        text="Editar"
        textColor="#0f265c"
        onPress={() =>
          navigation.navigate("AddProduct", { product, isEdit: true })
        }
      />
      <CustomButton
        backgroundColor="#dc3545"
        text="Eliminar"
        textColor="#fff"
        onPress={() => setModalVisible(true)}
      />
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
    width: 180,
    height: 180,
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
    fontSize: 14,
  },
  description: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 20,
    flex: 2,
    alignSelf: "flex-end",
    textAlign: "right",
  },
});

export default ProductDetails;
