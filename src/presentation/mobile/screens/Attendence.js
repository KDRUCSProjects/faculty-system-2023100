import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
  Dimensions,
  Alert,
  Button,
  ActivityIndicator,
  BackHandler,
  Platform,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../constants/colors";
import AttendenceItem from "./AttendenceItem";
import Animated, {
  event,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  scrollTo,
  withTiming,
  useSharedValue,
  runOnJS,
} from "react-native-reanimated";
import { HeaderBackButton } from "@react-navigation/stack";

import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveAttendence } from "../store/actions/actions";
import Toast from "react-native-root-toast";
import { logout } from "../store/actions/actions";
import { Modal } from "@ui-kitten/components";
import * as updates from "expo-updates";
import BackHandlerChild from "../optimization/BackHandlerChild";
import BackHandlerParent from "../optimization/BackHanlderParent";
import { useEffect } from "react";

export default function Attendence(props) {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        Alert.alert("Cancel?", "Do You want Cancel Attendence?", [
          {
            text: "No",
            onPress: () => {
              return;
            },
          },
          {
            text: "Yes",
            onPress: () => props.navigation.navigate("selectSemister"),
          },
        ]);
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);
  const childRef = useRef(null);
  var [offSetX, setOffSetX] = useState(0);
  const scrollRef = useRef({});
  const students = useSelector((state) => state.studentReducer.students);
  const subjectId = props.route.params.subjectId;
  const status = props.route.params.status;

  const [isLoading, setisLoading] = useState(false);

  const dispatch = useDispatch();

  let StudentsSize = students?.length;

  const onScroll = (event) => {
    setOffSetX(event.nativeEvent.contentOffset.x);
  };
  const onPresent = () => {
    const { width } = Dimensions.get("window");
    scrollRef.current.scrollTo({
      x: offSetX + width,
      y: 0,
      animated: true,
    });
  };
  const saveAttendenceDispatch = useDispatch();
  const onSaveAttendence = async () => {
    const selectedStudents = new Array();
    students.forEach((student) => {
      let studentStatus;
      if (status == "one") {
        studentStatus = student.isPresentOne;
      } else if (status == "two") {
        studentStatus = student.isPresentTwo;
      } else {
        studentStatus = student.isPresentOne;
      }

      selectedStudents.push({
        studentId: student.studentId,

        status: studentStatus,
      });
    });

    console.log(...selectedStudents);
    try {
      setisLoading(true);
      await saveAttendenceDispatch(
        saveAttendence(subjectId, selectedStudents, status)
      );
      setisLoading(false);
      let toast = Toast.show("Attendence updated!", {
        duration: Toast.durations.LONG,
      });

      setTimeout(function hideToast() {
        Toast.hide(toast);
      }, 2000);
      props.navigation.navigate("selectSemister");
    } catch (err) {
      setisLoading(false);
      Alert.alert("Error!", err.message);
      if (err.code == 401) {
        await dispatch(logout());
        await AsyncStorage.clear().then().then();
        //updates.reloadAsync();
        props.navigation.navigate("Login");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          height: "100%",
          width: "100%",
        }}
      >
        <View
          style={{
            width: "100%",
            height: 60,
            marginTop: Platform.OS == "android" ? "7%" : 0,
            backgroundColor: colors.primary,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ width: "20%" }}>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "Attendence not saved!",
                  "Do You want Cancel Attendence?",
                  [
                    {
                      text: "No",
                      onPress: () => {
                        return;
                      },
                    },
                    {
                      text: "Yes",
                      onPress: () => props.navigation.goBack(),
                    },
                  ]
                );
              }}
            >
              <ImageBackground
                style={{ height: 25, width: 32 }}
                source={require("../assets/images/lessthan.png")}
              ></ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={{ width: "60%" }}>
            <Text style={{ color: "white", fontSize: 23 }}>
              FCS for University
            </Text>
          </View>
          <View
            style={{
              width: "15%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() =>
                Alert.alert("Save?", "Do you want save attendence?", [
                  {
                    text: "No",
                    onPress: () => {
                      return;
                    },
                  },
                  {
                    text: "Yes",
                    onPress: onSaveAttendence,
                  },
                ])
              }
            >
              <ImageBackground
                style={{ height: 25, width: 32 }}
                source={require("../assets/images/save.png")}
              ></ImageBackground>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.Scroll}
          onScroll={onScroll}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          ref={scrollRef}
        >
          {!isLoading ? (
            students.map((student, index) => {
              const studentName = student.studentName;
              const studentId = student.studentId;
              const isPresent = student.isPresentOne;
              const fatherName = student.fatherName;
              const grandFatherName = student.grandFatherName;

              return (
                <AttendenceItem
                  key={studentId}
                  ref={childRef}
                  studentName={studentName}
                  fatherName={fatherName}
                  grandFatherName={grandFatherName}
                  studentId={studentId}
                  type={status}
                  isPresent={isPresent}
                  onStatus={onPresent}
                  studentsSize={StudentsSize}
                  index={index}
                  students={students}
                ></AttendenceItem>
              );
            })
          ) : (
            <Modal
              visible={isLoading}
              backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            >
              <ActivityIndicator size={60}></ActivityIndicator>
            </Modal>
          )}
        </ScrollView>
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
  },

  submitbtn: {
    minWidth: 250,
    borderRadius: 25,

    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: colors.secondry,
  },
  Scroll: {
    backgroundColor: "white",
    justifyContent: "flex-start",
  },
});
