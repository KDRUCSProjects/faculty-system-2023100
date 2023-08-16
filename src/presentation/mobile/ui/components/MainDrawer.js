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
import colors from "../../constants/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

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
          <View
            style={{
              width: "85%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 120,
                height: 120,
                borderWidth: 1,
                borderColor: colors.primary,
                borderRadius: 120 / 2,
                overflow: "hidden",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ImageBackground
                style={{
                  width: 120,
                  height: 120,
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
                resizeMode="cover"
              ></ImageBackground>
            </View>
            <Text
              style={{ fontSize: 18, textAlign: "center", fontWeight: "bold" }}
            >
              {teacherName}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: "15%",
              justifyContent: "flex-start",
              alignItems: "flex-end",
              marginTop: 5,
              marginRight: 10,
              height: "100%",
            }}
            onPress={() => props.navigation.closeDrawer()}
          >
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

        // if (index.row === 1) {
        //   setselectedItem(1);
        //   props.navigation.navigate("Subjects");
        // }
        if (index.row === 1) {
          setselectedItem(1);
          props.navigation.navigate("settingsScreen");
        }

        if (index.row === 2) {
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
        accessoryLeft={() => (
          <FontAwesome5
            name="home"
            size={18}
            color={colors.primary}
          />
        )}
      />
      {/* <DrawerItem
        title="Subjects"
        accessoryLeft={
          <ImageBackground
            source={require("../../assets/images/subjects.png")}
            style={{ height: 50, width: 25 }}
          ></ImageBackground>
        }
      /> */}
      <DrawerItem
        title="Settings"
        accessoryLeft={() => (
          <Ionicons
            name="settings"
            size={18}
            color={colors.primary}
          />
        )}
      />

      <DrawerItem
        title={"Logout"}
        accessoryLeft={() => (
          <MaterialCommunityIcons
            name="logout"
            size={18}
            color={colors.primary}
          />
        )}
      ></DrawerItem>
    </Drawer>
  );
};

const styles = StyleSheet.create({
  header: {
    height: "20%",
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: "10%",
    marginHorizontal: "5%",
    justifyContent: "flex-start",
  },
});
