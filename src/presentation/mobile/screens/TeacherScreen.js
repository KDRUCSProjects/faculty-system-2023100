import {
  StyleSheet,
  View,
  ImageBackground,
  SafeAreaView,
  BackHandler,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { HeaderBackButton } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

import { Layout, TopNavigation, Divider } from "@ui-kitten/components";
import colors from "../constants/colors";
import { StatusBar } from "expo-status-bar";

export default function TeacherScreen(props) {
  const username = useSelector((state) => state.MainReducer.userName);
  const semisterId = props.route.params.semisterId;

  const onTakeAttendence = () => {
    props.navigation.navigate("selectSubject", {
      choice: "takeAttendence",
      semisterId: semisterId,
    });
  };
  const onCreateShoka = () => {
    props.navigation.navigate("selectSubject", {
      choice: "createShoka",
      semisterId: semisterId,
    });
  };
  return (
    <Layout
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
          marginTop: "7%",
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
          <Text style={{ color: "white", fontSize: 23 }}>
            FCS for University
          </Text>
        </View>
      </View>

      <Layout style={styles.container}>
        <View style={styles.teacherInfo}>
          <Text style={{ fontSize: 25 }}>Welcome To Third Class</Text>
        </View>

        <View style={[styles.attendenceContainer, styles.shadowProp]}>
          <View
            style={{
              elevation: 2,
              shadowColor: "rgba(100, 100, 111, 0.4)",

              borderRadius: 15,
              width: "80%",
              height: "45%",
            }}
          >
            <TouchableWithoutFeedback
              style={{
                height: "100%",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-around",
              }}
              onPress={onCreateShoka}
            >
              <View style={{ height: 90, width: 90 }}>
                <ImageBackground
                  style={{ flex: 1 }}
                  source={require("../assets/images/viewAttendence.png")}
                ></ImageBackground>
              </View>
              <Text style={{ fontSize: 25 }}>Create Shoka</Text>
            </TouchableWithoutFeedback>
          </View>

          <View
            style={{
              elevation: 2,
              shadowColor: "rgba(100, 100, 111, 0.4)",
              borderRadius: 15,
              width: "80%",
              height: "45%",
            }}
          >
            <TouchableWithoutFeedback
              style={{
                height: "100%",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-around",
              }}
              onPress={onTakeAttendence}
            >
              <View style={{ height: 90, width: 90 }}>
                <ImageBackground
                  style={{ flex: 1 }}
                  source={require("../assets/images/takeAttendence.png")}
                ></ImageBackground>
              </View>
              <Text style={{ fontSize: 25 }}>Take Attendence</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <View style={{ alignSelf: "flex-start", margin: "2%" }}></View>
      </Layout>
    </Layout>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "85%",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  teacherInfo: {},
  attendenceContainer: {
    width: "100%",
    height: "80%",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
