import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DrawerNavigator from "./Navigation";

const NavWrapper = () => {
  const stacknavigator = createStackNavigator();
  return (
    <NavigationContainer>
      <DrawerNavigator></DrawerNavigator>
    </NavigationContainer>
  );
};
export default NavWrapper;
