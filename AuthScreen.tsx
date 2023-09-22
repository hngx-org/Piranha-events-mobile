import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import AddNewGroup from "./components/MyPeople/AddNewGroup";
import InsideGroup from "./components/MyPeople/InsideGroup";
import { UserContext, UserContextProps } from "./contexts/UserContext";
import SignIn from "./screens/SignIn";

const Stack = createNativeStackNavigator();

export default function AuthScreen() {
  const { userInfo } = useContext(UserContext) as UserContextProps;

  return (
    <NavigationContainer>
      {userInfo ? (
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="InsideGroup" component={InsideGroup} />
          <Stack.Screen name="AddNewGroup" component={AddNewGroup} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="SignIn"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="SignIn" component={SignIn} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
