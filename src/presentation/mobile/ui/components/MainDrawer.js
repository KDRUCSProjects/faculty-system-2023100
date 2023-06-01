import React from "react";
import {
  ImageBackground,
  StyleSheet,
  ViewProps,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
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

export default MainDrawer = (props) => {
  const dispatch = useDispatch();
  return (
    <Drawer
      header={() => (
        <>
          <ImageBackground
            style={[props.style, styles.header]}
            source={require("../../assets/images/student.png")}
          >
            <TouchableOpacity
              style={{ position: "absolute", marginRight: 10 }}
              onPress={() => props.navigation.closeDrawer()}
            >
              <MaterialCommunityIcons
                name={"window-close"}
                size={40}
                color="#232323"
              />
            </TouchableOpacity>
          </ImageBackground>
          <Divider />
        </>
      )}
      selectedIndex={new IndexPath(props.state.index)}
      onSelect={(index) => {
        if (index.row === 1) {
          console.log(index);
          AsyncStorage.clear().then().then();
          dispatch(logout());
          props.navigation.navigate("Login");
        }

        // props.navigation.navigate(props.state.routeNames[index.row]);
      }}
      style={{}}
    >
      <DrawerItem
        title="Home"
        accessoryLeft={
          <ImageBackground
            source={require("../../assets/images/home.png")}
            style={{ height: 30, width: 25 }}
          ></ImageBackground>
        }
      />
      <DrawerItem
        title="Logout"
        accessoryLeft={
          <ImageBackground
            source={require("../../assets/images/logout.png")}
            style={{ height: 30, width: 25 }}
          ></ImageBackground>
        }
      />
    </Drawer>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 128,
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: "10%",
    justifyContent: "flex-end",
  },
});
