import React, { useEffect } from "react";
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
import { useState } from "react";
import { useSelector } from "react-redux";
import * as updates from "expo-updates";

export default MainDrawer = (props) => {
  const teacherName = useSelector((state) => state.MainReducer.userName);
  let teacherPhoto = useSelector((state) => state.MainReducer.photoUri);

  if (!teacherPhoto) {
    teacherPhoto = "null";
  }

  const dispatch = useDispatch();

  const [selectedItem, setselectedItem] = useState(0);

  return (
    <Drawer
      header={() => (
        <View style={[props.style, styles.header]}>
          <View>
            <View
              style={{
                width: 100,
                height: 100,
                borderWidth: 1,
                borderColor: "#a7e9eb",
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
                source={
                  !teacherPhoto | teacherPhoto.includes("null")
                    ? require("../../assets/images/avatar.png")
                    : {
                        uri: teacherPhoto,
                      }
                }
              ></ImageBackground>
            </View>
            <Text style={{ fontSize: 16, textAlign: "center" }}>
              {teacherName}
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
      selectedIndex={new IndexPath(selectedItem)}
      onSelect={async (index) => {
        if (index.row === 0) {
          setselectedItem(0);
          props.navigation.navigate("selectSemister");
        }

        if (index.row === 1) {
          setselectedItem(1);
          props.navigation.navigate("Subjects");
        }
        if (index.row === 2) {
          setselectedItem(2);
          props.navigation.navigate("settingsScreen");
        }

        if (index.row === 3) {
          setselectedItem(0);
          props.navigation.navigate("Login");
          await dispatch(logout());
          await AsyncStorage.clear().then().then();
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
        title="Subjects"
        accessoryLeft={
          <ImageBackground
            source={require("../../assets/images/subjects.png")}
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
