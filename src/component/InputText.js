import React, { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import Label from "./Label";
import styles from "./styles";

const InputText = ({
  placeholder,
  secureTextEntry,
  empty,
  value,
  onChangeText,
}) => {
  const style = styles();
  const [text, setText] = useState(value);

  if (empty === true) {
    return (
      <TouchableOpacity
        onPressOut={onPressOut}
        onPress={handleFocus}
        style={style.input}
      >
        <Label
          style={{ marginTop: 15 ,}}
          text={placeholder}
        />
      </TouchableOpacity>
    );
  }

  return (
    <TextInput
      style={style.input}
      value={text}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      onChangeText={(input) => {
        setText(input);
        onChangeText && onChangeText(input);
      }}
    />
  );
};

export default InputText;
