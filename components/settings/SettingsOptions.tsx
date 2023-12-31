import {
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { colors } from "../../utils/styles";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "../../contexts/UserContext";
import { Portal, Snackbar } from "react-native-paper";
import { useAuth } from "@clerk/clerk-expo";

interface IOption {
  title: string;
  data: {
    label: string;
    icon: React.JSX.Element;
    isPremium?: boolean;
    isLogout?: boolean;
  }[];
}

const SettingsOptions = () => {
  const navigation = useNavigation<any>();

  // const { handleSignOut } = useUserContext();

  const [visible, setVisible] = React.useState(false);

  const onShowSnackBar = () => setVisible(true);

  const onDismissSnackBar = () => setVisible(false);

  // const logoutHandler = async () => {
  //   handleSignOut(() => {
  //     navigation.replace("");
  //   });
  // };

  const settingsOptions: IOption[] = [
    {
      title: "Account Settings",
      data: [
        {
          label: "Edit Profile",
          icon: (
            <FontAwesome name="pencil" size={16} style={styles.optionIcon} />
          ),
        },
        {
          label: "Privacy",
          icon: (
            <MaterialCommunityIcons
              name="shield-account"
              size={16}
              style={styles.optionIcon}
            />
          ),
        },
        {
          isPremium: true,
          label: "Upgrade to premium",
          icon: (
            <MaterialCommunityIcons
              name="elevation-rise"
              size={16}
              style={styles.optionIcon}
            />
          ),
        },
      ],
    },
    {
      title: "Other Settings",
      data: [
        {
          label: "Notification",
          icon: (
            <Ionicons
              name="notifications-outline"
              size={16}
              style={styles.optionIcon}
            />
          ),
        },
        {
          label: "Appearance",
          icon: (
            <Ionicons
              name="color-palette-outline"
              size={16}
              style={styles.optionIcon}
            />
          ),
        },
        {
          label: "Language and Region",
          icon: (
            <SimpleLineIcons name="globe" size={16} style={styles.optionIcon} />
          ),
        },
      ],
    },
    {
      title: "Help and Support",
      data: [
        {
          label: "Help and Support",
          icon: (
            <Ionicons
              name="md-help-circle"
              size={16}
              style={styles.optionIcon}
            />
          ),
        },
        {
          label: "About",
          icon: <Feather name="info" size={16} style={styles.optionIcon} />,
        },
        {
          isLogout: true,
          label: "Logout",
          icon: (
            <SimpleLineIcons
              name="logout"
              size={16}
              style={[styles.optionIcon, { color: colors.red }]}
            />
          ),
        },
      ],
    },
  ];

  const { isLoaded, signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <SectionList
        sections={settingsOptions}
        keyExtractor={(item, index) => index.toString()}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.optionContainer}
            onPress={() => (item?.isLogout ? signOut() : onShowSnackBar())}
          >
            <View style={styles.optionContainerLeft}>
              {item.icon}

              <Text
                style={[
                  styles.optionTitle,
                  item?.isLogout ? { color: colors.red } : {},
                ]}
              >
                {item.label}
              </Text>

              {item?.isPremium && (
                <AntDesign name="staro" size={20} color={colors.yellow} />
              )}
            </View>

            <Entypo name="chevron-small-right" size={24} color={colors.white} />
          </TouchableOpacity>
        )}
      />

      {/* Coming soon snackbar */}
      <Portal>
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          action={{
            label: "close",
            onPress: () => onDismissSnackBar(),
          }}
        >
          Coming soon
        </Snackbar>
      </Portal>
    </View>
  );
};

export default SettingsOptions;

const styles = StyleSheet.create({
  container: { flex: 1 },

  sectionHeader: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "700",
    marginTop: 14,
    marginBottom: 14,
  },

  optionContainer: {
    backgroundColor: colors.dark10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 18,
    borderRadius: 11,

    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    justifyContent: "space-between",
  },

  optionContainerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  optionIcon: {
    color: colors.purple,
  },

  optionTitle: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 32,
    color: colors.white,
    letterSpacing: -0.16,
  },
});
