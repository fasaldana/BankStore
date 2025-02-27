import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

type CustomButtonProps = {
  text: string;
  textColor: string;
  backgroundColor: string;
  onPress: () => void;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  textColor,
  backgroundColor,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor }]}
    >
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomButton;
