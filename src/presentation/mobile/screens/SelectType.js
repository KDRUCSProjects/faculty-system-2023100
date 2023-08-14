import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
  Alert,
  Switch,
  Platform,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAttendence, loadSubjects } from "../store/actions/actions";
import { useEffect, useState } from "react";
import { Button, Card } from "react-native-paper";
import colors from "../constants/colors";
import { HeaderBackButton } from "@react-navigation/stack";
import SubjectItem from "./SubjectItem";
import SelectSubjectItem from "./SelectSubjectItem";
import { TouchableOpacity } from "react-native-gesture-handler";

import BackHandlerChild from "../optimization/BackHandlerChild";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");

export default function SelectType(props) {
  BackHandlerChild();
  const subjects = useSelector((state) => state.MainReducer.subjects);
  const [isOne, setisOne] = useState(false);
  const [isTwo, setisTwo] = useState(false);
  const [isBoth, setisBoth] = useState(true);
  const [isError, setisError] = useState(false);
  const id = props.route.params.subjectId;

  const dispatch = useDispatch();

  const onclick = async () => {
    if (!isOne && !isTwo && !isBoth) {
      setisError(true);
      return;
    }
    if (isOne) {
      props.navigation.navigate("attendenceScreen", {
        subjectId: id,
        status: "one",
      });
    }
    if (isTwo) {
      props.navigation.navigate("attendenceScreen", {
        subjectId: id,
        status: "two",
      });
    }
    if (isBoth) {
      props.navigation.navigate("attendenceScreen", {
        subjectId: id,
        status: "both",
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            height: "100%",
            width: "100%",
          }}
        >
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
              <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <ImageBackground
                  style={{ height: 25, width: 32 }}
                  source={require("../assets/images/lessthan.png")}
                ></ImageBackground>
              </TouchableOpacity>
            </View>
            <View style={{ width: "70%" }}>
              <Text style={{ color: "white", fontSize: 23 }}>
                FCS for University
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: 28,
              margin: 10,
              fontWeight: "bold",
              fontStyle: "italic",
            }}
          >
            Choose Attendence type
          </Text>
          <View
            style={{
              height: "90%",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "90%",
                height: 150,
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Card
                style={{ width: 120, height: 140 }}
                onPress={() => {
                  props.navigation.navigate("attendenceScreen", {
                    subjectId: id,
                    status: "one",
                  });
                }}
              >
                <Card.Content style={{ height: "40%" }}>
                  <Text
                    style={{ fontSize: 14, height: "70%", fontWeight: "bold" }}
                  >
                    First Cell
                  </Text>
                </Card.Content>

                <View
                  style={{
                    height: "60%",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="sticker-check-outline"
                    size={80}
                    color="black"
                  />
                </View>
              </Card>

              <Card
                style={{ width: 120, height: 140 }}
                onPress={() => {
                  props.navigation.navigate("attendenceScreen", {
                    subjectId: id,
                    status: "two",
                  });
                }}
              >
                <Card.Content style={{ height: "40%" }}>
                  <Text
                    style={{ fontSize: 14, height: "70%", fontWeight: "bold" }}
                  >
                    Second Cell
                  </Text>
                </Card.Content>

                <View
                  style={{
                    height: "60%",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="sticker-check-outline"
                    size={80}
                    color="black"
                  />
                </View>
              </Card>
            </View>

            <Card
              style={{ width: 120, height: 140 }}
              onPress={() => {
                props.navigation.navigate("attendenceScreen", {
                  subjectId: id,
                  status: "both",
                });
              }}
            >
              <Card.Content style={{ height: "40%" }}>
                <Text
                  style={{ fontSize: 14, height: "70%", fontWeight: "bold" }}
                >
                  Both Cells
                </Text>
              </Card.Content>

              <View
                style={{
                  height: "60%",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <FontAwesome5
                  name="check-double"
                  size={70}
                  color="black"
                />
              </View>
            </Card>
            {/*           
            <View
              style={{
                width: "80%",
                height: "10%",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "80%",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <Text
                  style={{
                    verticalAlign: "middle",
                    fontSize: 25,
                    fontWeight: "bold",
                    fontStyle: "italic",
                  }}
                >
                  First
                </Text>
              </View>
              <View style={{ width: "20%" }}>
                <Switch
                  style={{
                    transform: [{ scaleX: 1.8 }, { scaleY: 1.4 }],
                    width: 50,
                  }}
                  tintColor={colors.primary}
                  trackColor={colors.primary}
                  value={isOne}
                  onValueChange={() => {
                    setisError(false);
                    setisOne(!isOne);
                    setisTwo(false);
                    setisBoth(false);
                  }}
                />
              </View>
            </View>

            <View
              style={{
                width: "80%",
                height: "10%",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "80%",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <Text
                  style={{
                    verticalAlign: "middle",
                    fontSize: 25,
                    fontWeight: "bold",
                    fontStyle: "italic",
                  }}
                >
                  Second
                </Text>
              </View>
              <View style={{ width: "20%" }}>
                <Switch
                  style={{
                    transform: [{ scaleX: 1.8 }, { scaleY: 1.4 }],
                    width: 50,
                  }}
                  tintColor={colors.primary}
                  trackColor={colors.primary}
                  value={isTwo}
                  onValueChange={() => {
                    setisError(false);
                    setisOne(false);
                    setisTwo(!isTwo);
                    setisBoth(false);
                  }}
                />
              </View>
            </View>

            <View
              style={{
                width: "80%",
                height: "10%",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "80%",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <Text
                  style={{
                    verticalAlign: "middle",
                    fontSize: 25,
                    fontWeight: "bold",
                    fontStyle: "italic",
                  }}
                >
                  Both
                </Text>
              </View>
              <View style={{ width: "20%" }}>
                <Switch
                  style={{
                    transform: [{ scaleX: 1.8 }, { scaleY: 1.4 }],
                    width: 50,
                  }}
                  tintColor={colors.primary}
                  trackColor={colors.primary}
                  value={isBoth}
                  onValueChange={() => {
                    setisError(false);
                    setisOne(false);
                    setisTwo(false);
                    setisBoth(!isBoth);
                  }}
                />
              </View>
            {/* </View> */}
            {isError ? (
              <Text style={{ height: 30, fontSize: 18, color: "red" }}>
                One option Should be selected!
              </Text>
            ) : (
              <View style={{ height: 30 }}></View>
            )}
          </View>
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
