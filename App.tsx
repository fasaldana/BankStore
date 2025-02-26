import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ProductsList from "./screens/ProductsList";
import ProductDetails from "./screens/ProductDetails";
import AddProduct from "./screens/AddProduct";
import CustomHeader from "./components/CustomHeader";
import { RootStackParamList } from "./types/Product";

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ProductList"
        screenOptions={{
          headerTitle: () => <CustomHeader />,
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="ProductList" component={ProductsList} />
        <Stack.Screen name="ProductDetail" component={ProductDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
