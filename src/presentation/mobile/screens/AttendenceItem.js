import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ImageBackground,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { RadioButton } from "react-native-paper";

import colors from "../constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

import { isAbsent, isPresent } from "../store/actions/actions";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { forwardRef } from "react";
import { useImperativeHandle } from "react";
import { useEffect } from "react";
import { Modal } from "@ui-kitten/components";

const { height, width } = Dimensions.get("window");

const AttendenceItem = (props, ref) => {
  const indexprop = props.index;
  const students = useSelector((state) => state.studentReducer.students);
  const type = props.type;

  const [newStudent, setnewStudent] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  let StudentsSize = students.length;

  const [checked, setChecked] = useState(props.isPresent);
  const dispatch = useDispatch();

  const onStatusContainer = async (status) => {
    if (status == "onPresent") {
      try {
        setisLoading(true);
        await dispatch(isPresent("1", props.studentId, type));
        setisLoading(false);
        setnewStudent(!newStudent);
        return props.onStatus();
      } catch (err) {
        Alert.alert("Error", err.message);
      }
    }
    try {
      if (status == "onAbsent") {
        setisLoading(true);
        await dispatch(isAbsent("1", props.studentId, type));
        setisLoading(false);

        setnewStudent(!newStudent);
        return props.onStatus();
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  useImperativeHandle(ref, () => ({}));

  let prev =
    indexprop == 0
      ? students[indexprop].isPresentOne
      : students[indexprop - 1].isPresentOne;

  let next =
    indexprop < StudentsSize - 1
      ? students[indexprop + 1].isPresentOne
      : students[indexprop].isPresentOne;

  return (
    <View style={styles.studentContainer}>
      <View
        style={{
          width: "100%",
          height: "40%",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#4e17f0",
            height: height / 2.7,
            width: width / 2.7,
            borderBottomLeftRadius: height / 4,
            borderBottomRightRadius: height / 4,
            justifyContent: "flex-end",
            alignItems: "center",
            elevation: 30,
            shadowColor: "#4e17f0",
          }}
        >
          <View style={{ height: "15%", width: "90%" }}>
            <ImageBackground
              style={{ height: "100%", width: "100%", flex: 1 }}
              source={require("../assets/images/line.png")}
              resizeMode="center"
            ></ImageBackground>
          </View>
          <View style={styles.imageContainer}>
            <View style={styles.image}>
              <ImageBackground
                style={{ width: "100%", height: "100%", flex: 1 }}
                source={require("./../assets/images/studentProfile.jpg")}
                resizeMode="cover"
              ></ImageBackground>
            </View>
          </View>
        </View>
        <View
          style={{
            height: "100%",
            width: "20%",
            position: "absolute",
            top: 0,
            left: width / 1.25,

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              height: "60%",
              width: "95%",
              backgroundColor: "gray",
              borderRadius: width / 20,
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: "33.33%",
                width: "100%",
                backgroundColor: prev ? "#69be28" : "#d32d41",
                borderTopLeftRadius: width / 20,
                borderTopRightRadius: width / 20,
                justifyContent: "center",
                alignItems: "center",
                borderBottomColor: "black",
                borderBottomWidth: 1,
              }}
            >
              <Text style={styles.trackText}>
                {indexprop == 0 ? "" : students[indexprop - 1].studentName}
              </Text>
            </View>
            <View
              style={{
                height: "33.33%",
                width: "100%",
                backgroundColor: students[indexprop].isPresentOne
                  ? "#69be28"
                  : "#d32d41",
                justifyContent: "center",
                alignItems: "center",
                borderBottomColor: "black",
                borderBottomWidth: 1,
              }}
            >
              <Text style={styles.trackText}>
                {students[indexprop].studentName}
              </Text>
            </View>
            <View
              style={{
                height: "33.33%",
                width: "100%",
                backgroundColor: next ? "#69be28" : "#d32d41",
                borderBottomLeftRadius: width / 20,
                borderBottomRightRadius: width / 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.trackText}>
                {indexprop < StudentsSize - 1
                  ? students[indexprop + 1].studentName
                  : ""}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          width: "80%",
          height: "30%",

          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.stdInfoContainer}>
          <View style={{ alignItems: "center", justifyContent: "flex-start" }}>
            <Text
              style={{
                fontSize: 28,
                textAlign: "center",
                color: "blue",
                textTransform: "capitalize",
              }}
            >
              {props.studentName}
            </Text>
          </View>
          <View style={{ justifyContent: "flex-start" }}>
            <View style={styles.stdInfoItem}>
              <Text style={styles.text}>student ID: </Text>
              <Text style={styles.text}>{props.studentId}</Text>
            </View>
            <View style={styles.stdInfoItem}>
              <Text style={styles.text}>Father Name: </Text>
              <Text style={styles.text}>{props.fatherName}</Text>
            </View>
            <View style={styles.stdInfoItem}>
              <Text style={{ fontSize: 17 }}>Grand Father Name: </Text>
              <Text style={styles.text}>{props.grandFatherName}</Text>
            </View>
          </View>
        </View>
        {/* <TouchableOpacity
          containerStyle={styles.statusContainer}
          onPress={onStatusContainer}
        >
          {checked ? (
            <MaterialCommunityIcons
              name="account-check"
              size={60}
            ></MaterialCommunityIcons>
          ) : (
            <MaterialCommunityIcons
              name="account-check-outline"
              size={60}
            ></MaterialCommunityIcons>
          )}
        </TouchableOpacity> */}
      </View>
      <View
        style={{
          width: "100%",
          height: "20%",

          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onStatusContainer.bind(this, "onAbsent")}
          containerStyle={{
            height: "50%",
            width: "40%",
          }}
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "#d32d41",
            borderTopRightRadius: width / 3,
            borderBottomRightRadius: width / 3,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, color: "white" }}>Absent</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onStatusContainer.bind(this, "onPresent")}
          activeOpacity={0.6}
          containerStyle={{
            height: "50%",
            width: "40%",
          }}
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "#69be28",
            borderTopLeftRadius: width / 3,
            borderBottomLeftRadius: width / 3,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, color: "white" }}>Present</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={isLoading}
        backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <ActivityIndicator size={60}></ActivityIndicator>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  studentContainer: {
    flex: 1,
    height,
    width,

    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    height: width / 3,
    borderRadius: width / 1.5,
    overflow: "hidden",
    elevation: 30,
    shadowColor: "yellow",

    width: width / 3,
  },
  imageContainer: {
    height: "40%",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "14%",
  },
  stdInfoContainer: {
    height: "90%",
    width: "80%",
    justifyContent: "space-around",
  },
  stdInfoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statusContainer: {
    height: "30%",
    alignItems: "flex-end",
    width: "80%",
    justifyContent: "flex-end",
    padding: 10,
  },

  text: {
    fontSize: 20,
    textAlign: "center",
    textTransform: "capitalize",
  },
  trackText: {
    color: "white",
    fontSize: 15,
    textTransform: "capitalize",
  },
});

export default forwardRef(AttendenceItem);
