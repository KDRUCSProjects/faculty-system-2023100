import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
  Alert,
  Switch,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAttendence, loadSubjects } from "../store/actions/actions";
import { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import colors from "../constants/colors";
import { HeaderBackButton } from "@react-navigation/stack";
import SubjectItem from "./SubjectItem";
import SelectSubjectItem from "./SelectSubjectItem";
import { logout } from "../store/actions/actions";

import { Modal } from "@ui-kitten/components";
import * as updates from "expo-updates";
import { getStudentBySubject } from "../store/actions/actions";
import BackHandlerChild from "../optimization/BackHandlerChild";

export default function SelectChance(props) {
  BackHandlerChild();
  const subjects = useSelector((state) => state.MainReducer.subjects);
  const [isFirst, setisFirst] = useState(true);
  const [isSecond, setisSecond] = useState(false);
  const [isThird, setisThird] = useState(false);
  const [isError, setisError] = useState(false);
  const id = props.route.params.subjectId;

  const [isLoading, setisLoading] = useState(false);

  const dispatch = useDispatch();

  const onclick = async () => {
    if (!isFirst && !isSecond && !isThird) {
      setisError(true);
      return;
    }
    try {
      if (isFirst) {
        setisLoading(true);
        await dispatch(getStudentBySubject(id, 1));
        setisLoading(false);

        props.navigation.navigate("CreateShoka", {
          subjectId: id,
          status: "first",
        });
        console.log("first");
      }
      if (isSecond) {
        setisLoading(true);
        await dispatch(getStudentBySubject(id, 2));
        setisLoading(false);
        props.navigation.navigate("CreateShoka", {
          subjectId: id,
          status: "second",
        });
      }
      if (isThird) {
        setisLoading(true);
        await dispatch(getStudentBySubject(id, 3));
        setisLoading(false);
        props.navigation.navigate("CreateShoka", {
          subjectId: id,
          status: "third",
        });
      }
    } catch (err) {
      console.log(err.message);
      setisLoading(false);
      //props.navigation.navigate("selectType", { subjectId: selected });
      Alert.alert("Error", err.message);
      if (err.code == 401) {
        // props.navigation.replace("Login");
        await dispatch(logout());
        await AsyncStorage.clear().then().then();
        props.navigation.navigate("Login");
        // updates.reloadAsync();

        return;
      }
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
              fontSize: 20,
              margin: 10,
              fontWeight: "bold",
              fontStyle: "italic",
            }}
          >
            Choose Chance for this student
          </Text>
          <View
            style={{
              height: "40%",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
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
                  value={isFirst}
                  onValueChange={() => {
                    setisError(false);
                    setisFirst(!isFirst);
                    setisSecond(false);
                    setisThird(false);
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
                  value={isSecond}
                  onValueChange={() => {
                    setisError(false);
                    setisFirst(false);
                    setisSecond(!isSecond);
                    setisThird(false);
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
                  Third
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
                  value={isThird}
                  onValueChange={() => {
                    setisError(false);
                    setisFirst(false);
                    setisSecond(false);
                    setisThird(!isThird);
                  }}
                />
              </View>
            </View>
            {isError ? (
              <Text style={{ height: 30, fontSize: 18, color: "red" }}>
                One option Should be selected!
              </Text>
            ) : (
              <View style={{ height: 30 }}></View>
            )}
          </View>
          <View
            style={{
              height: "35%",
              width: "90%",
              marginTop: "3%",
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginHorizontal: 10,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "blue",
                height: 45,
                width: 80,
                borderRadius: 8,
                padding: 10,
                marginLeft: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => props.navigation.goBack()}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
              >
                Back
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: colors.primary,
                height: 45,
                width: 80,
                borderRadius: 8,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={onclick}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
              >
                Next
              </Text>
            </TouchableOpacity>
          </View>
          <Modal
            visible={isLoading}
            backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <ActivityIndicator size={60}></ActivityIndicator>
          </Modal>
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
