import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomButton from "../components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";
import { addProduct, updateProduct } from "../redux/product/ProductSlice";
import { Product } from "../types/Product";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/Product";

type AddProductProps = {
  navigation: NavigationProp<RootStackParamList, "AddProduct">;
  route: RouteProp<RootStackParamList, "AddProduct">;
};

type FormData = {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
};

const AddProduct: React.FC<AddProductProps> = ({ navigation, route }) => {
  const { product, isEdit } = route.params || {};
  const errorText = "Este campo es requerido!";
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.products);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    setError,
  } = useForm<FormData>();

  const [showDatePicker, setShowDatePicker] = useState<
    "release" | "revision" | null
  >(null);

  useEffect(() => {
    if (isEdit && product) {
      setValue("id", product.id);
      setValue("name", product.name);
      setValue("description", product.description);
      setValue("logo", product.logo);
      setValue("date_release", product.date_release);
      setValue("date_revision", product.date_revision);
    }
  }, [isEdit, product, setValue]);

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (
    event: any,
    selectedDate: Date | undefined,
    type: "release" | "revision"
  ) => {
    setShowDatePicker(null);
    if (selectedDate) {
      const formattedDate = formatDate(selectedDate);
      if (type === "release") {
        setValue("date_release", formattedDate);
        const revisionDate = new Date(selectedDate);
        revisionDate.setFullYear(revisionDate.getFullYear() + 1);
        setValue("date_revision", formatDate(revisionDate));
      } else {
        setValue("date_revision", formattedDate);
      }
    }
  };

  const onSubmit = async (data: Product) => {
    try {
      if (isEdit) {
        await dispatch(updateProduct(data)).unwrap();
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "ProductList",
              params: { successMessage: "Producto actualizado correctamente!" },
            },
          ],
        });
      } else {
        await dispatch(addProduct(data)).unwrap();
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "ProductList",
              params: { successMessage: "Producto agregado correctamente!" },
            },
          ],
        });
      }
      reset();
    } catch (error) {
      setError("id", {
        type: "manual",
        message: error instanceof Error ? error.message : String(error),
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={[styles.container, { paddingBottom: 40 }]}
      >
        <Text style={styles.sectionTitle}>Formulario de Registro</Text>
        <Text style={styles.label}>ID</Text>
        <Controller
          control={control}
          rules={{
            required: "ID no válido",
            minLength: {
              value: 3,
              message: "ID debe tener al menos 3 caracteres",
            },
            maxLength: {
              value: 10,
              message: "ID no puede tener más de 10 caracteres",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                isEdit && styles.disabled,
                errors.id && styles.errorInput,
              ]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              editable={!isEdit}
            />
          )}
          name="id"
        />
        {errors.id && <Text style={styles.errorText}>{errors.id.message}</Text>}

        <Text style={styles.label}>Nombre</Text>
        <Controller
          control={control}
          rules={{
            required: errorText,
            minLength: {
              value: 5,
              message: "Nombre debe tener al menos 5 caracteres",
            },
            maxLength: {
              value: 100,
              message: "Nombre no puede tener más de 100 caracteres",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.name && styles.errorInput]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="name"
        />
        {errors.name && (
          <Text style={styles.errorText}>{errors.name.message}</Text>
        )}

        <Text style={styles.label}>Descripción</Text>
        <Controller
          control={control}
          rules={{
            required: errorText,
            minLength: {
              value: 10,
              message: "Descripción debe tener al menos 10 caracteres",
            },
            maxLength: {
              value: 200,
              message: "Descripción no puede tener más de 200 caracteres",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.description && styles.errorInput]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="description"
        />
        {errors.description && (
          <Text style={styles.errorText}>{errors.description.message}</Text>
        )}

        <Text style={styles.label}>Logo</Text>
        <Controller
          control={control}
          rules={{ required: errorText }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.logo && styles.errorInput]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="logo"
        />
        {errors.logo && (
          <Text style={styles.errorText}>{errors.logo.message}</Text>
        )}

        <Text style={styles.label}>Fecha Liberación</Text>
        <Controller
          control={control}
          rules={{
            required: errorText,
          }}
          render={({ field: { value } }) => (
            <>
              <TextInput
                style={[styles.input, errors.date_release && styles.errorInput]}
                value={value}
                onPress={() => setShowDatePicker("release")}
              />
              {showDatePicker === "release" && (
                <DateTimePicker
                  value={value ? new Date(value) : new Date()}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={(event, selectedDate) =>
                    handleDateChange(event, selectedDate, "release")
                  }
                  minimumDate={new Date()}
                />
              )}
            </>
          )}
          name="date_release"
        />
        {errors.date_release && (
          <Text style={styles.errorText}>{errors.date_release.message}</Text>
        )}

        <Text style={styles.label}>Fecha Revisión</Text>
        <Controller
          control={control}
          rules={{ required: errorText }}
          render={({ field: { value } }) => (
            <>
              <TextInput
                style={[
                  styles.input,
                  styles.disabled,
                  errors.date_revision && styles.errorInput,
                ]}
                value={value}
                editable={false}
              />
            </>
          )}
          name="date_revision"
        />
        {errors.date_revision && (
          <Text style={styles.errorText}>{errors.date_revision.message}</Text>
        )}

        <View style={{ marginTop: 20 }}>
          <CustomButton
            backgroundColor="#ffdd00"
            textColor="#0f265c"
            text="Enviar"
            onPress={handleSubmit(onSubmit)}
          />
          {!isEdit && (
            <CustomButton
              backgroundColor="#ccc"
              textColor="#0f265c"
              text="Reiniciar"
              onPress={() => reset()}
            />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  disabled: {
    backgroundColor: "#f0f0f0",
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default AddProduct;
