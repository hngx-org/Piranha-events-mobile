import { Dispatch, SetStateAction } from "react";
import { ViewProps, StyleSheet } from "react-native";
import { Surface, Text, TextInput } from "react-native-paper";

interface LargeTextBoxProps extends ViewProps {
  title: string;
  placeholder: string;
  textBoxHeight: number;
  value: string;
  onChangeText: Dispatch<SetStateAction<string>>;
}

export default function LargeTextBox({title, placeholder, textBoxHeight, value, onChangeText, ...props}: LargeTextBoxProps) {
  return (
    <Surface {...props} theme={{colors: {outline: 'transparent'}}}>
      <Text style={styles.title}>{title}</Text>
      <TextInput value={value} placeholderTextColor={"white"} onChangeText={onChangeText} textColor="white" style={[styles.textBox, {height: textBoxHeight}]} placeholder={placeholder} theme={{roundness: 0}}></TextInput>
    </Surface>
  );
}

const styles = StyleSheet.create({

    textBox: {
        
        backgroundColor: "#1B1B1B",
        color: "white",
    },

    title: {
        color: "white",
        fontSize: 18,
        borderRadius: 0,
    }
})
