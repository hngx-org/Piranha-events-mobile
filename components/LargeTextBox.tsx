import { ViewProps, StyleSheet } from "react-native";
import { Surface, Text, TextInput } from "react-native-paper";

interface LargeTextBoxProps extends ViewProps {
  title: string;
  placeholder: string;
}

export default function LargeTextBox({title, placeholder, ...props}: LargeTextBoxProps) {
  return (
    <Surface {...props} theme={{colors: {outline: 'transparent'}}}>
      <Text style={styles.title}>{title}</Text>
      <TextInput style={styles.textBox} placeholder={placeholder} placeholderTextColor="#757575" theme={{roundness: 0}}></TextInput>
    </Surface>
  );
}

const styles = StyleSheet.create({

    textBox: {
        height: 114,
        backgroundColor: "#1B1B1B"
    },

    title: {
        color: "white",
        fontSize: 18,
        borderRadius: 0,
    }
})
