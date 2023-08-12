import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
  Alert,
  Switch,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAttendence, loadSubjects } from "../store/actions/actions";
import { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import colors from "../constants/colors";
import { HeaderBackButton } from "@react-navigation/stack";
import SubjectItem from "./SubjectItem";
import SelectSubjectItem from "./SelectSubjectItem";
import { TouchableOpacity } from "react-native-gesture-handler";

import BackHandlerChild from "../optimization/BackHandlerChild";

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
      </View>
    </View>
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
