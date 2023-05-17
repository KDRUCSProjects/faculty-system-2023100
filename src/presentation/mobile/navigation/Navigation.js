import {
  HeaderBackButton,
  createStackNavigator,
} from "@react-navigation/stack";
import { ImageBackground, Text } from "react-native";
import colors from "../constants/colors";
import role from "../screens/roleSelection";
import login from "../screens/login";
import studentIdScreen from "../screens/studentIdScreen";
import attendence from "../screens/attendence";
import teacherScreen from "../screens/teacherScreen";
import auth from "../screens/auth";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Navigation = (props) => {
  const mainNavigation = createStackNavigator();

  return (
    <mainNavigation.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: colors.secondry,
        },
        headerTintColor: "white",
      }}
    >
      <mainNavigation.Screen
        name="authScreen"
        component={auth}
      ></mainNavigation.Screen>
      <mainNavigation.Screen
        name="FCS for University"
        component={role}
        options={{}}
      ></mainNavigation.Screen>
      <mainNavigation.Screen
        name="Login"
        component={login}
        options={{
          headerLeft: (navData) => (
            <HeaderBackButton
              disabled={true}
              onPress={props.navigation.toggleDrawer}
              backImage={() => <ImageBackground></ImageBackground>}
            ></HeaderBackButton>
          ),
        }}
      ></mainNavigation.Screen>
      <mainNavigation.Screen
        name="Mark Checking"
        component={studentIdScreen}
      ></mainNavigation.Screen>
      <mainNavigation.Screen
        name="teacherScreen"
        component={teacherScreen}
        options={{
          headerLeft: (navData) => (
            <HeaderBackButton
              onPress={props.navigation.toggleDrawer}
              backImage={() => (
                <ImageBackground
                  style={{ height: 30, width: 20 }}
                  source={require("../assets/images/menu.png")}
                ></ImageBackground>
              )}
            ></HeaderBackButton>
          ),
          headerBackImage: () => {},
        }}
      ></mainNavigation.Screen>
      <mainNavigation.Screen
        name="attendenceScreen"
        component={attendence}
      ></mainNavigation.Screen>
    </mainNavigation.Navigator>
  );
};
const DrawerNavigator = (pops) => {
  const drawer = createDrawerNavigator();
  return (
    <drawer.Navigator initialRouteName="Home">
      <drawer.Screen name="Home" component={Navigation} />
      <drawer.Screen name="Logout" component={login} />
    </drawer.Navigator>
  );
};
export default DrawerNavigator;
