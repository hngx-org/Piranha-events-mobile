import { ViewStyle, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { StatusBar } from "expo-status-bar";

type ScreenProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  scrollable?: boolean;
};

const AppScreen = ({ children, style, scrollable }: ScreenProps) => {
  return (
    <SafeAreaView edges={["top"]} style={[styles.container, style]}>
      {scrollable ? (
        <ScrollView
          bounces={false}
          style={styles.container}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          {children}
        </ScrollView>
      ) : (
        children
      )}
      <StatusBar style="dark" backgroundColor="white" />
    </SafeAreaView>
  );
};

export default AppScreen;
