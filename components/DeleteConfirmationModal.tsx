import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import CustomButton from "./CustomButton";
import { Ionicons } from "@expo/vector-icons";

type DeleteConfirmationModalProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  productName: string;
};

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  visible,
  onClose,
  onConfirm,
  onCancel,
  productName,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
              <Text style={styles.modalText}>
                ¿Estás seguro de eliminar el producto {productName}?
              </Text>
              <View style={styles.separator} />
              <CustomButton
                backgroundColor="#ffdd00"
                text="Confirmar"
                textColor="#0f265c"
                onPress={onConfirm}
              />
              <CustomButton
                backgroundColor="#ccc"
                text="Cancelar"
                textColor="#0f265c"
                onPress={onCancel}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 20,
    width: "100%",
  },
});

export default DeleteConfirmationModal;
