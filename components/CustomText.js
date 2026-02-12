// components/CustomText.js
import React from "react";
import { Text as DefaultText, TextInput as DefaultTextInput } from "react-native";

export const AppText = (props) => {
  return (
    <DefaultText {...props} style={[{ fontFamily: "Poppins-Black" }, props.style]}>
      {props.children}
    </DefaultText>
  );
};

export const AppTextInput = (props) => {
  return (
    <DefaultTextInput
      {...props}
      style={[{ fontFamily: "Poppins-Black" }, props.style]}
    />
  );
};
