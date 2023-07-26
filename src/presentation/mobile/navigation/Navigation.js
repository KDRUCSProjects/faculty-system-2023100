import {
  CardStyleInterpolators,
  HeaderBackButton,
  createStackNavigator,
} from "@react-navigation/stack";
import { Easing, ImageBackground, Text } from "react-native";
import colors from "../constants/colors";
import role from "../screens/roleSelection";
import Login from "../screens/Login";
import StudentIdScreen from "../screens/StudentIdScreen";
import Attendence from "../screens/Attendence";
import TeacherScreen from "../screens/TeacherScreen";
import Auth from "../screens/Auth";
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
import SelectChance from "../screens/SelectChance";

const StudentScreen = () => {
  const stdScreen = createStackNavigator();
  return (
    <stdScreen.Navigator screenOptions={{ headerShown: false }}>
      <stdScreen.Screen
        name="Mark Checking"
        component={StudentIdScreen}
      ></stdScreen.Screen>
    </stdScreen.Navigator>
  );
};

const AuthNavigation = (props) => {
  const authNavigationNavigator = createStackNavigator();
  return (
    <authNavigationNavigator.Navigator screenOptions={{ headerShown: false }}>
      <authNavigationNavigator.Screen
        name="AuthScreen"
        component={Auth}
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
        component={AuthNavigation}
      ></mainNavigation.Screen>
      <mainNavigation.Screen
        name="editProfile"
        component={EditProfile}
      ></mainNavigation.Screen>
      <mainNavigation.Screen
        name="studentScreen"
        component={StudentScreen}
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
        component={Login}
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
        component={TeacherScreen}
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
        component={Attendence}
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
        component={Login}
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
