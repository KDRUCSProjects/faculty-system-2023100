import React from "react";
import { ImageBackground, StyleSheet, ViewProps } from "react-native";
import {
  Divider,
  Drawer,
  DrawerItem,
  Icon,
  IconElement,
  IconProps,
  IndexPath,
  State,
} from "@ui-kitten/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Header = (props) => (
  <>
    <ImageBackground
      style={[props.style, styles.header]}
      source={require("../../assets/images/student.png")}
    />
    <Divider />
  </>
);

export default MainDrawer = (props) => {
  const dispatch = useDispatch();
  return (
    <Drawer
      header={Header}
      selectedIndex={new IndexPath(props.state.index)}
      onSelect={(index) => {
        if (index.row === 1) {
          console.log(index);
          AsyncStorage.clear().then().then();
          dispatch(logout());
          props.navigation.navigate("Login");
          return;
        }

        // props.navigation.navigate(props.state.routeNames[index.row]);
      }}
    >
      <DrawerItem
        title="Home"
        accessoryLeft={
          <MaterialCommunityIcons name={"home"} size={25} color="#232323" />
        }
      />
      <DrawerItem
        title="Logout"
        accessoryLeft={
          <MaterialCommunityIcons name={"logout"} size={25} color="#232323" />
        }
      />
    </Drawer>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 128,
    flexDirection: "row",
    alignItems: "center",
    marginTop: "10%",
  },
});
