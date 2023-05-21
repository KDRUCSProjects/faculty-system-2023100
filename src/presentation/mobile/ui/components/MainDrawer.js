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
  return (
    <Drawer
      header={Header}
      selectedIndex={new IndexPath(props.state.index)}
      onSelect={(index) =>
        props.navigation.navigate(props.state.routeNames[index.row])
      }
    >
      <DrawerItem
        title="Home"
        accessoryLeft={
          <ImageBackground
            source={require("../../assets/images/marks.png")}
          ></ImageBackground>
        }
      />
      <DrawerItem title="Logout" />
    </Drawer>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 128,
    flexDirection: "row",
    alignItems: "center",
  },
});
