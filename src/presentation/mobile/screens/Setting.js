import {
  StyleSheet,
  View,
  Text,
  Alert,
  BackHandler,
  ImageBackground,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from "react-native";
import colors from "../constants/colors";
import { HeaderBackButton } from "@react-navigation/stack";
import { Divider } from "@ui-kitten/components";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import BackHandlerParent from "../optimization/BackHanlderParent";

export default function Setting(props) {
  BackHandlerParent();

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          height: "100%",
          width: "100%",
        }}
      >
        <StatusBar hidden={false}></StatusBar>
        <View
          style={{
            height: 60,
            marginTop: Platform.OS == "android" ? "7%" : 0,
            backgroundColor: colors.primary,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ width: "20%" }}>
            <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
              <ImageBackground
                style={{ height: 25, width: 32 }}
                source={require("../assets/images/menu.png")}
              ></ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={{ width: "70%" }}>
            <Text style={{ color: "white", fontSize: 23 }}>Edit profile</Text>
          </View>
        </View>
        <View
          style={{
            height: "85%",
            marginTop: "2%",
            marginLeft: "2%",
            justifyContent: "flex-start",
            alignItems: "stretch",
          }}
        >
          <TouchableOpacity
            style={{
              height: "10%",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onPress={() =>
              props.navigation.navigate("EditProfile", {
                screen: "Change account info",
              })
            }
          >
            <View
              style={{
                height: "100%",
                width: "15%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ImageBackground
                style={{ width: "90%", height: "90%" }}
                source={require("../assets/images/editProfile.png")}
              ></ImageBackground>
            </View>

            <View
              style={{
                height: "100%",
                width: "70%",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <Text style={{ fontSize: 20 }}>Account info</Text>
            </View>

            <View
              style={{
                height: "100%",
                width: "15%",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <ImageBackground
                style={{ width: "70%", height: "70%" }}
                source={require("../assets/images/forward.png")}
              ></ImageBackground>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: "10%",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onPress={() =>
              props.navigation.navigate("EditProfile", {
                screen: "Change password",
              })
            }
          >
            <View
              style={{
                height: "100%",
                width: "15%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ImageBackground
                style={{ width: "90%", height: "90%" }}
                source={require("../assets/images/changePassword.png")}
              ></ImageBackground>
            </View>

            <View
              style={{
                height: "100%",
                width: "70%",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <Text style={{ fontSize: 20 }}>Change password</Text>
            </View>

            <View
              style={{
                height: "100%",
                width: "15%",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <ImageBackground
                style={{ width: "70%", height: "70%" }}
                source={require("../assets/images/forward.png")}
              ></ImageBackground>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});
