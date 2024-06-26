import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ButtonTouchableOpacity = ({
  text,
  onPress,
  height,
  width,
  loading,
  disabled,
  icon,
}) => {
  if (loading === true) {
    disabled = true;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#000000",
        height: height !== undefined ? height : 64,
        width: width !== undefined ? width : "90%",

        borderRadius: 64,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        marginTop: 10,
      }}
      disabled={disabled}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          color: "white",
        }}
      >
        {loading ? "Loading..." : text}
      </Text>

      {icon && (
        <View
          style={{
            backgroundColor: "white",
            width: 40,
            aspectRatio: 1,
            borderRadius: 40,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: 12,
            right: 12,
            bottom: 12,
          }}
        ></View>
      )}
    </TouchableOpacity>
  );
};

export default ButtonTouchableOpacity;
