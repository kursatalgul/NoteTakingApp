import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";
import { useTheme } from "@react-navigation/native";

const Label = ({ text, style }) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    label: {
      fontSize: 16,
      marginBottom: 5,
      color: "black",
    },
  });

  return <Text style={Object.assign({}, styles.label, style)}></Text>;
};

export default Label;
