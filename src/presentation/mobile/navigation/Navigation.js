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

const authNavigation = (props) => {
  const authNavigationNavigator = createStackNavigator();
  return (
    <authNavigationNavigator.Navigator screenOptions={{ headerShown: false }}>
      <authNavigationNavigator.Screen
        name="authScreen"
        component={auth}
      ></authNavigationNavigator.Screen>
    </authNavigationNavigator.Navigator>
  );
};

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
        name="auth"
        component={authNavigation}
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

const DrawerNavigator = (props) => {
  const drawer = createDrawerNavigator();
  return (
    <drawer.Navigator initialRouteName={authNavigation}>
      <drawer.Screen name="Home" component={Navigation} />
      <drawer.Screen name="Logout" component={login} />
    </drawer.Navigator>
  );
};
export default DrawerNavigator;
