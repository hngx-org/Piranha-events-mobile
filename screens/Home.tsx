
import { Surface, Text } from 'react-native-paper';
import {StyleSheet} from 'react-native';

export default function Home() {
  return (
    <Surface style={styles.container}>
      <Text variant="headlineMedium">This is the home screen</Text>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
});
