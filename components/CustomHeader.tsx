import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CustomHeader: React.FC = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="home" size={22} color="black" />
      <Text style={styles.title}>BANCO</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0f265c",
    marginLeft: 10,
  },
});

export default CustomHeader;
