import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider, MD3LightTheme as DefaultTheme } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyPeople from "../screens/MyPeople";
import InsideGroup from "../component/MyPeople/InsideGroup";
import AddNewGroup from "../component/MyPeople/AddNewGroup";

const MyPeopleStack = createNativeStackNavigator();

export default function MyPeopleStackNavigator() {
  return (
    <MyPeopleStack.Navigator initialRouteName="MyPeople" screenOptions={{ headerShown: false }}>
      <MyPeopleStack.Screen name="MyPeople" component={MyPeople} />
      <MyPeopleStack.Screen name="InsideGroup" component={InsideGroup} />
      <MyPeopleStack.Screen name="AddNewGroup" component={AddNewGroup} />
    </MyPeopleStack.Navigator>
  );
}
