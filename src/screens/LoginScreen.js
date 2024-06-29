import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import InputText from "../component/InputText";
import ButtonTouchableOpacity from "../component/ButtonTouchableOpacity";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/AuthContext";
import { api } from "../services/api";
import authService from "../services/auth.service";

const loginValidationSchema = Yup.object().shape({
  username: Yup.string().required("Kullanıcı Adı boş bırakılamaz."),
  password: Yup.string().required("Şifre boş bırakılamaz."),
});

const LoginScreen = ({ navigation }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const handleLogin = async (values) => {
    try {
      const { username, password } = values;
      const data = await authService.login(username, password);
      const decodedToken = jwtDecode(data.token);
      if (
        data &&
        decodedToken.username === username &&
        decodedToken.password === password
      ) {
        setAuth(decodedToken);
        navigation.navigate("Notes");
      } else {
        Alert.alert("Login Error", "Invalid Username or Password");
      }
    } catch (error) {
      Alert.alert("Login Error", "Something went wrong!");
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#ffd700", height: "100%" }}>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={loginValidationSchema}
        onSubmit={handleLogin}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <View style={styles.container}>
              <Text style={styles.text}>Your Notebook</Text>
            </View>
            <View style={styles.formContainer}>
              <InputText
                placeholder="Enter Your Username"
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
              />
              {touched.username && errors.username && (
                <Text style={styles.errorText}>{errors.username}</Text>
              )}
              <InputText
                placeholder="Enter Your Password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                secureTextEntry
                value={values.password}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
              <ButtonTouchableOpacity
                text="Sign In"
                onPress={handleSubmit}
                icon="blur-on"
              />
            </View>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 50,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  text: {
    fontWeight: "bold",
    fontSize: 23,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default LoginScreen;
