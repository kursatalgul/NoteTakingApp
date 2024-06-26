import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import axios from "axios";
import * as Yup from "yup";
import { Formik } from "formik";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import InputText from "../component/InputText";
import ButtonTouchableOpacity from "../component/ButtonTouchableOpacity";

const loginValidationSchema = Yup.object().shape({
  username: Yup.string().required("Kullanıcı Adı boş bırakılamaz."),
  password: Yup.string().required("Şifre boş bırakılamaz."),
});

const LoginScreen = ({ navigation }) => {
  const handleLogin = async () => {
    try {
      // Sunucuya kullanıcı adı ve şifre ile istek yapılır
      const response = await axios.post("https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imt1cnNhdCIsInBhc3N3b3JkIjoiYWxndWwifQ.FzbfjDfBbr9h0c-84U4sYUZpki6UJvMcAM1LhooR0OY", {
        username,
        password,
      });

      // Sunucudan gelen JWT token alınır
      const token = response.data.token;

      // Token AsyncStorage üzerinde saklanır
      await AsyncStorage.setItem("token", token);

      // Başarılı giriş durumunda "Notes" ekranına yönlendirme yapılır
      navigation.navigate("Notes");
    } catch (error) {
      Alert.alert("Login Error", "Invalid Username or Password");
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
