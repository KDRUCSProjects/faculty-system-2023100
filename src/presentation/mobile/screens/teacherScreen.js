import {
  StyleSheet,
  View,
  ImageBackground,
  SafeAreaView,
  BackHandler,
  Alert,
  Text,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { HeaderBackButton } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

import { Layout, TopNavigation, Divider } from "@ui-kitten/components";
import colors from "../constants/colors";

export default function teacherScreen(props) {
  const username = useSelector((state) => state.MainReducer.userName);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.addListener("beforeRemove", (event) => {
      event.preventDefault();
      Alert.alert("Exit", "Do you want Exit?", [
        { text: "No", onPress: () => {} },
        {
          text: "Yes",
          onPress: () => {
            BackHandler.exitApp();
          },
        },
      ]);
    });
  }, [navigation]);
  const onTakeAttendence = () => {
    props.navigation.navigate("attendenceScreen");
  };
  return (
    <Layout
      style={{
        flex: 1,
        height: "100%",
        width: "100%",
      }}
    >
      <View
        style={{
          height: "9%",
          marginTop: "7%",
          backgroundColor: colors.primary,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ width: "20%" }}>
          <HeaderBackButton
            onPress={() => props.navigation.toggleDrawer()}
            backImage={() => (
              <ImageBackground
                style={{ height: 25, width: 32 }}
                source={require("../assets/images/menu.png")}
              ></ImageBackground>
            )}
          ></HeaderBackButton>
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
              elevation: 3,
              shadowColor: "blue",
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
                alignContent: "space-around",
              }}
            >
              <View style={{ height: 180, width: 180 }}>
                <ImageBackground
                  style={{ flex: 1 }}
                  source={require("../assets/images/viewAttendence.png")}
                ></ImageBackground>
              </View>
              <Text style={{ fontSize: 25 }}>View Attendence</Text>
            </TouchableWithoutFeedback>
          </View>

          <View
            style={{
              elevation: 3,
              shadowColor: "blue",
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
                alignContent: "space-around",
              }}
              onPress={onTakeAttendence}
            >
              <View style={{ height: 180, width: 180 }}>
                <ImageBackground
                  style={{ flex: 1 }}
                  source={require("../assets/images/takeAttendence.png")}
                ></ImageBackground>
              </View>
              <Text style={{ fontSize: 25 }}>Take Attendence</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <View style={{ alignSelf: "flex-start", margin: "2%" }}>
          <Text style={{ fontSize: 25 }}>Your ID:CS10733854</Text>
        </View>
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
