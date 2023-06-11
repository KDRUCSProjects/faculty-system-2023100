import React from "react";
import {
  ImageBackground,
  StyleSheet,
  ViewProps,
  View,
  Text,
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
        <View style={[props.style, styles.header]}>
          <View>
            <View
              style={{
                width: 100,
                height: 100,
                borderWidth: 3,
                borderColor: "blue",
                borderRadius: 100 / 2,
                overflow: "hidden",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ImageBackground
                style={{
                  width: 100,
                  height: 100,
                  flex: 1,
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                }}
                source={require("../../assets/images/teacherProfile.jpg")}
              ></ImageBackground>
            </View>
            <Text style={{ fontSize: 16, textAlign: "center" }}>
              Ahmad Shah
            </Text>
          </View>
          <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
            <MaterialCommunityIcons
              name={"window-close"}
              size={35}
              color="#232323"
            />
          </TouchableOpacity>
        </View>
      )}
      selectedIndex={new IndexPath(props.state.index)}
      onSelect={(index) => {
        if (index.row === 0) {
          console.log(index);

          props.navigation.navigate("teacherScreen");
        }
        if (index.row === 1) {
          console.log(index);

          props.navigation.navigate("settingsScreen");
        }
        if (index.row === 2) {
          console.log(index);
          AsyncStorage.clear().then().then();
          dispatch(logout());
          props.navigation.navigate("Login");
        }

        // props.navigation.navigate(props.state.routeNames[index.row]);
      }}
      style={{}}
      contentContainerStyle={{
        justifyContent: "flex-start",
        flex: 1,

        marginBottom: "8%",
      }}
    >
      <DrawerItem
        title="Home"
        accessoryLeft={
          <ImageBackground
            source={require("../../assets/images/home.png")}
            style={{ height: 50, width: 25 }}
          ></ImageBackground>
        }
      />
      <DrawerItem
        title="Settings"
        accessoryLeft={
          <ImageBackground
            source={require("../../assets/images/gear.png")}
            style={{ height: 50, width: 25 }}
          ></ImageBackground>
        }
      />
      <DrawerItem
        title={"Logout"}
        accessoryLeft={
          <ImageBackground
            source={require("../../assets/images/logout.png")}
            style={{ height: 30, width: 25 }}
          ></ImageBackground>
        }
      ></DrawerItem>
    </Drawer>
  );
};

const styles = StyleSheet.create({
  header: {
    height: "20%",
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: "10%",
    marginHorizontal: "5%",
    justifyContent: "space-between",
  },
});
