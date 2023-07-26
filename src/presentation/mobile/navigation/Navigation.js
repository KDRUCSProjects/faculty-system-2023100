import {
  CardStyleInterpolators,
  HeaderBackButton,
  createStackNavigator,
} from "@react-navigation/stack";
import { Easing, ImageBackground, Text } from "react-native";
import colors from "../constants/colors";
import role from "../screens/roleSelection";
import login from "../screens/login";
import studentIdScreen from "../screens/studentIdScreen";
import attendence from "../screens/attendence";
import teacherScreen from "../screens/teacherScreen";
import auth from "../screens/auth";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainDrawer from "../ui/components/MainDrawer";
import { TransitionSpecs } from "@react-navigation/stack";
import {
  TabBar,
  BottomNavigation,
  BottomNavigationTab,
} from "@ui-kitten/components";

import { timing } from "react-native-reanimated";
import Setting from "../screens/Setting";
import Subject from "../screens/Subjects";
import AccountInfo from "../screens/AccountInfo";
import ChangePassword from "../screens/ChangePassword";
import CreateShoka from "../screens/CreateShoka";
import SelectSubject from "../screens/SelectSubject";
import SelectType from "../screens/SelectType";
import SelectChance from "../screens/selectChance";

const studentScreen = () => {
  const stdScreen = createStackNavigator();
  return (
    <stdScreen.Navigator screenOptions={{ headerShown: false }}>
      <stdScreen.Screen
        name="Mark Checking"
        component={studentIdScreen}
      ></stdScreen.Screen>
    </stdScreen.Navigator>
  );
};

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

const EditProfile = () => {
  const editProfileNavigator = createStackNavigator();
  return (
    <editProfileNavigator.Navigator screenOptions={{ headerShown: false }}>
      <editProfileNavigator.Screen
        name="Change account info"
        component={AccountInfo}
      ></editProfileNavigator.Screen>
      <editProfileNavigator.Screen
        name="Change password"
        component={ChangePassword}
      ></editProfileNavigator.Screen>
    </editProfileNavigator.Navigator>
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

        transitionSpec: {
          open: {
            animation: "timing",
            config: { duration: 300, easing: Easing.sin },
          },
          close: TransitionSpecs.ScaleFromCenterAndroidSpec,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <mainNavigation.Screen
        name="auth"
        component={authNavigation}
      ></mainNavigation.Screen>
      <mainNavigation.Screen
        name="EditProfile"
        component={EditProfile}
      ></mainNavigation.Screen>
      <mainNavigation.Screen
        name="studentScreen"
        component={studentScreen}
        options={{}}
      ></mainNavigation.Screen>

      <mainNavigation.Screen
        name="settingsScreen"
        component={Setting}
        options={{}}
      ></mainNavigation.Screen>

      <mainNavigation.Screen
        name="selectSubject"
        component={SelectSubject}
        options={{}}
      ></mainNavigation.Screen>

      <mainNavigation.Screen
        name="selectType"
        component={SelectType}
        options={{}}
      ></mainNavigation.Screen>

      <mainNavigation.Screen
        name="CreateShoka"
        component={CreateShoka}
        options={{}}
      ></mainNavigation.Screen>

      <mainNavigation.Screen
        name="SelectChance"
        component={SelectChance}
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
    <drawer.Navigator
      drawerContent={(props) => <MainDrawer {...props} />}
      screenOptions={{
        swipeEnabled: false,
        gestureEnabled: true,
        headerShown: false,
      }}
    >
      <drawer.Screen
        name="Home"
        component={Navigation}
      />
      <drawer.Screen
        name="Login"
        component={login}
      ></drawer.Screen>
      <drawer.Screen
        name="Settings"
        component={Setting}
      ></drawer.Screen>
      <drawer.Screen
        name="Subjects"
        component={Subject}
      ></drawer.Screen>
    </drawer.Navigator>
  );
};

export default DrawerNavigator;
