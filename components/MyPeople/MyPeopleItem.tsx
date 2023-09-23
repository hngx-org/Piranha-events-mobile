import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import { appColors } from "../../utils/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { SERVER_URL } from "../timeline/Timelinecomponent";

const MyPeopleItem = ({ group, index, id }: { group: any; index: number; id: string | number }) => {
  const navigation = useNavigation();

  const imageUrl = `${SERVER_URL}${group.image}`;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("InsideGroup", { id })}
      style={[styles.container, { marginRight: index % 2 === 0 ? "10%" : 0 }]}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: imageUrl }}
          style={{
            width: 200,
            height: 200,
          }}
          resizeMode="contain"
        />
      </View>

      <Text variant="bodySmall" style={styles.groupName}>
        {group?.name}
      </Text>

      {group?.event_counts ? (
        <Text variant="bodySmall" style={styles.info}>
          +{group?.event_counts} events
        </Text>
      ) : null}
      {group?.members_count ? (
        <Text variant="bodySmall" style={[styles.info, {color: appColors.purple}]}>
          {group?.members_count} member(s)
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

export default MyPeopleItem;

const styles = StyleSheet.create({
  container: {
    width: "45%",
    justifyContent: "flex-start",
    marginBottom: 57,
  },
  imageWrapper: {
    width: "100%",
    height: 130,
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
