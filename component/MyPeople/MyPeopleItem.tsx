import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import { appColors } from "../../utils/globalStyles";
import { useNavigation } from "@react-navigation/native";

const MyPeopleItem = ({ group, index }: { group: any; index: number }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("InsideGroup", {})}
      style={[styles.container, { marginRight: index % 2 === 0 ? "4%" : 0 }]}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={group.image}
          style={{
            width: "100%",
          }}
          resizeMode="contain"
        />
      </View>

      <Text variant="bodySmall" style={styles.groupName}>
        {group?.name}
      </Text>

      <Text variant="bodySmall" style={styles.info}>
        +{group?.event?.length} events
      </Text>
    </TouchableOpacity>
  );
};

export default MyPeopleItem;

const styles = StyleSheet.create({
  container: {
    width: "48%",
    justifyContent: "flex-start",
  },
  imageWrapper: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  groupName: {
    width: "100%",
    fontWeight: "800",
    color: "white",
    textAlign: "center",
  },
  info: {
    width: "100%",
    textAlign: "center",
    fontWeight: "800",
    color: appColors.red,
  },
});
