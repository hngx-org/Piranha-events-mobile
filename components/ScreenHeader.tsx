import { Image, Pressable, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import { appColors } from "../utils/globalStyles";
import { appImages } from "../assets";

const ScreenHeader = ({
  title,
  containerStyle,
  onPressOne,
  onPressTwo,
  level,
}: {
  title: string;
  containerStyle?: ViewStyle;
  onPressOne?: () => void;
  onPressTwo?: () => void;
  level: number;
}) => {

  console.log(level);

  return level === 0 ? (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.levelZeroTitle}>{title}</Text>

      <View style={styles.addGroup}>
        <TouchableOpacity onPress={() => onPressTwo!()}>
          <Text variant="bodyMedium" style={{ fontWeight: "600", color: appColors.white, fontSize: 20 }}>
            Plus
          </Text>
        </TouchableOpacity>

        <Text variant="bodySmall" style={{ fontWeight: "600", color: appColors.white }}>
          Add groups
        </Text>
      </View>
    </View>
  ) : (
    <View style={[styles.container2, containerStyle]}>
      <Pressable onPress={() => onPressOne!()}>
        <Image
          source={appImages.goBack}
          style={{
            width: 10,
            height: 20,
            marginRight: 80,
          }}
        />
      </Pressable>

      <View style={styles.addGroup}>
        <TouchableOpacity onPress={!!onPressTwo && onPressTwo()}>
          <Text variant="bodyLarge" style={{ fontWeight: "800", color: appColors.white, fontSize: 20 }}>
            {title}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 69,
    paddingVertical: 10,
  },
  levelZeroTitle: {
    color: appColors.white,
    fontSize: 20,
    fontWeight: "800",
  },
  container2: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 30,
    paddingVertical: 10,
  },
  addGroup: {
    alignItems: "center",
  },
});
