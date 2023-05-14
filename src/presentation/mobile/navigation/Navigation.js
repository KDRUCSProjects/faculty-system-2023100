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

//import { createDrawerNavigator } from "@react-navigation/drawer";

export default Navigation = () => {
  //const drawer = createDrawerNavigator();
  const mainNavigation = createStackNavigator();

  return (
    <mainNavigation.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.secondry,
        },
        headerTintColor: "white",
      }}
    >
      {/* <drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </drawer.Navigator> 
       */}
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
      ></mainNavigation.Screen>
      <mainNavigation.Screen
        name="Mark Checking"
        component={studentIdScreen}
      ></mainNavigation.Screen>
      <mainNavigation.Screen
        name="teacherScreen"
        component={teacherScreen}
        options={{
          headerLeft: () => (
            <HeaderBackButton
              disabled={true}
              backImage={() => (
                <ImageBackground
                  style={{ height: 20, width: 20 }}
                  source={require("../assets/images/student.png")}
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
