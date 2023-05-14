import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Navigation from "./Navigation";

const NavWrapper = () => {
  const stacknavigator = createStackNavigator();
  return (
    <NavigationContainer>
      <Navigation></Navigation>
    </NavigationContainer>
  );
};
export default NavWrapper;
