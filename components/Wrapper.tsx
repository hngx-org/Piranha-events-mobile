import { Image, StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { PropsWithChildren, ReactNode } from "react";
import { appImages } from "../assets";

const Wrapper = ({ children, propStyle }: { children: ReactNode; propStyle: ViewStyle }) => {
  return (
    <View style={[styles.container, propStyle]}>
      <Image
        source={appImages.bgImage}
        style={{
          position: "absolute",
          width: "120%",
          height: "100%",
          zIndex: -1,
        }}
        resizeMode="contain"
      />
      {children}
    </View>
  );
};

export default Wrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(15, 15, 15)",
  },
});
