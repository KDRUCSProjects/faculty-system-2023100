import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import colors from "../constants/colors";
import { HeaderBackButton } from "@react-navigation/stack";
import { Snackbar, TextInput } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  changePassword,
  checkPassword,
  createShoka,
  getStudentBySubject,
  logout,
  updateAccount,
} from "../store/actions/actions";
import Toast from "react-native-root-toast";
import { IndexPath, Select, SelectItem } from "@ui-kitten/components";
import { useEffect } from "react";
import { Modal } from "@ui-kitten/components/ui";
import * as updates from "expo-updates";
import { List } from "react-native-paper";
import BackHandlerChild from "../optimization/BackHandlerChild";
import { useHeaderHeight } from "@react-navigation/elements";

export default function CreateShoka(props) {
  // d();
  const subjectIdParam = props.route.params.subjectId;
  const status = props.route.params.status;

  const [isGetStudentLoading, setisGetStudentLoading] = useState(false);

  const students = useSelector((state) => state.studentsBySubject.students);

  const subjects = useSelector((state) => state.MainReducer.subjects);
  const ref = useRef();

  const [selectedSubject, setselectedSubject] = useState(null);

  const [selectedStudent, setselectedStudent] = useState(null);

  const [ProjectMarks, setProjectMarks] = useState("");
  const [assignments, setassignments] = useState("");
  const [finals, setfinals] = useState("");
  const [practicalMarks, setpracticalMarks] = useState("");

  const [ProjectMarksError, setProjectMarksError] = useState(false);
  const [assignmentsError, setassignmentsError] = useState(false);
  const [finalsError, setfinalsError] = useState(false);
  const [marksError, setmarksError] = useState(false);
  const [selectedStudentErr, setselectedStudentErr] = useState(false);
  const [practicalMarksErr, setpracticalMarksErr] = useState(false);

  const [studentId, setstudentId] = useState(null);
  const [subjectId, setsubjectId] = useState(null);

  const dispatch = useDispatch();

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedStudentIndex, setselectedStudentIndex] = useState(null);

  const [isLoading, setisLoading] = useState(false);

  // useEffect(() => {
  //   ref.current.scrollToEnd();
  // }, [marksError]);

  const onSave = async () => {
    const numRegEx = /\b([0-9]|[1-9][0-9]|100)\b/;

    if (!selectedStudent) {
      setselectedStudentErr("a Student should be selected!");
      return;
    }

    if (ProjectMarks == "") {
      setProjectMarksError("This field is required!");
      return;
    }

    if (parseInt(ProjectMarks) > 20) {
      setProjectMarksError("ProjectMarks marks should be between 0-20");
      return;
    }

    if (assignments == "") {
      setassignmentsError("This field is required!");
      return;
    }
    if (parseInt(assignments) > 20) {
      setassignmentsError("Assignments marks should be between 0-20");
      return;
    }
    if (finals == "") {
      setfinalsError("This field is required!");
      return;
    }
    if (parseInt(finals) > 60) {
      setfinalsError("Final marks should be between 0-60");
      return;
    }

    if (practicalMarks == "") {
      setpracticalMarksErr("This field is required!");
      return;
    }
    if (parseInt(practicalMarks) > 60) {
      setpracticalMarksErr("practical marks should be between 0-60");
      return;
    }
    if (
      parseInt(practicalMarks) +
        parseInt(finals) +
        parseInt(assignments) +
        parseInt(ProjectMarks) >
      100
    ) {
      setmarksError("Whole marks shouldn't be greater than 100");
      return;
    }
    try {
      setisLoading(true);
      await dispatch(
        createShoka(
          subjectIdParam,
          selectedStudent,
          ProjectMarks,
          assignments,
          finals,
          practicalMarks,
          status
        )
      );
    } catch (e) {
      setisLoading(false);
      if (e.code == 401) {
        // props.navigation.navigate("Login");
        await dispatch(logout());
        await AsyncStorage.clear().then().then();
        props.navigation.navigate("Login");
        //updates.reloadAsync();
      }
      Alert.alert("Sorry!", e.message);
      return;
    }
    setisLoading(false);
    setselectedSubject(null);
    setSelectedIndex(null);
    setselectedStudent(null);
    setselectedStudentIndex(null);
    setProjectMarks(null);
    setassignments(null);
    setfinals(null);
    let toast = Toast.show("Shoka Created!", {
      duration: Toast.durations.LONG,
    });

    setTimeout(function hideToast() {
      Toast.hide(toast);
    }, 2000);
    props.navigation.goBack();
  };
  const [expanded, setExpanded] = useState(true);

  const handlePress = () => setExpanded(!expanded);

  const headerHeight = useHeaderHeight();
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={headerHeight}
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{
            flex: 1,
            height: "100%",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              height: 60,
              marginTop: Platform.OS == "android" ? "7%" : 0,
              backgroundColor: colors.primary,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
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
            <View style={{ width: "60%", alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 23 }}>Create Shoka</Text>
            </View>
          </View>

          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
            }}
            ref={ref}
          >
            <View
              style={{
                height: "100%",

                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  height: "70%",
                  marginTop: "5%",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: "90%",
                    height: 90,
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: "40%",
                      height: 60,
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 17 }}>Student</Text>
                  </View>

                  <View
                    style={{
                      width: "60%",
                      height: 60,
                      justifyContent: "center",
                    }}
                  >
                    <ScrollView
                      horizontal={true}
                      style={{
                        borderWidth: 1,
                        borderRadius: 4,
                        borderColor: "black",
                      }}
                      showsHorizontalScrollIndicator={false}
                    >
                      {students?.map((student) => {
                        return (
                          <TouchableOpacity
                            style={{
                              borderWidth: 1,
                              borderRadius: 4,
                              borderColor: "black",
                              margin: 5,
                            }}
                            key={student.studentId}
                            onPress={() => {
                              console.log(student.studentId);
                              setselectedStudentErr(false);
                              setselectedStudent(student.studentId);
                            }}
                          >
                            <Text> {student.studentId} </Text>
                            <Text>{student.studentName}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                    {selectedStudentErr ? (
                      <Text style={{ color: "red" }}>{selectedStudentErr}</Text>
                    ) : (
                      <View></View>
                    )}
                  </View>
                </View>

                <View
                  style={{
                    width: "90%",
                    height: 90,
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: "40%",
                      height: 60,
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 17 }}>Project Marks</Text>
                  </View>

                  <View
                    style={{
                      width: "60%",
                      height: 60,
                      justifyContent: "center",
                    }}
                  >
                    <TextInput
                      style={{ height: 50 }}
                      label={"Project Marks"}
                      mode="outlined"
                      textColor="black"
                      outlineColor="black"
                      contentStyle={{
                        fontSize: 13,
                      }}
                      keyboardType="number-pad"
                      inputMode="numeric"
                      maxLength={2}
                      error={ProjectMarksError}
                      value={ProjectMarks}
                      onChangeText={(text) => {
                        setmarksError(false);
                        setProjectMarksError(false);
                        setProjectMarks(text);
                      }}
                    ></TextInput>
                    {ProjectMarksError ? (
                      <Text style={{ color: "red" }}>{ProjectMarksError}</Text>
                    ) : (
                      <View></View>
                    )}
                  </View>
                </View>

                <View
                  style={{
                    width: "90%",
                    height: 90,
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: "40%",
                      height: 60,
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 17 }}>
                      Assignments & Project Marks
                    </Text>
                  </View>

                  <View
                    style={{
                      width: "60%",
                      height: 60,
                      justifyContent: "center",
                    }}
                  >
                    <TextInput
                      style={{ height: 50 }}
                      label={"A & P Marks"}
                      mode="outlined"
                      textColor="black"
                      outlineColor="black"
                      contentStyle={{
                        fontSize: 13,
                      }}
                      keyboardType="number-pad"
                      inputMode="numeric"
                      maxLength={2}
                      error={assignmentsError}
                      value={assignments}
                      onChangeText={(text) => {
                        setmarksError(false);
                        setassignmentsError(false);
                        setassignments(text);
                      }}
                    ></TextInput>
                    {assignmentsError ? (
                      <Text style={{ color: "red" }}>{assignmentsError}</Text>
                    ) : (
                      <View></View>
                    )}
                  </View>
                </View>

                <View
                  style={{
                    width: "90%",
                    height: 90,
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: "40%",
                      height: 60,
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 17 }}>Final Marks</Text>
                  </View>

                  <View
                    style={{
                      width: "60%",
                      height: 60,
                      justifyContent: "center",
                    }}
                  >
                    <TextInput
                      style={{ height: 50 }}
                      label={"Final Marks"}
                      mode="outlined"
                      textColor="black"
                      outlineColor="black"
                      contentStyle={{
                        fontSize: 13,
                      }}
                      keyboardType="number-pad"
                      inputMode="numeric"
                      maxLength={2}
                      error={finalsError}
                      value={finals}
                      onChangeText={(text) => {
                        setmarksError(false);
                        setfinalsError(false);
                        setfinals(text);
                      }}
                    ></TextInput>
                    {finalsError ? (
                      <Text style={{ color: "red" }}>{finalsError}</Text>
                    ) : (
                      <View></View>
                    )}
                  </View>
                </View>

                <View
                  style={{
                    width: "90%",
                    height: 90,
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: "40%",
                      height: 60,
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 17 }}>Practical work Marks</Text>
                  </View>

                  <View
                    style={{
                      width: "60%",
                      height: 60,
                      justifyContent: "center",
                    }}
                  >
                    <TextInput
                      style={{ height: 50 }}
                      label={"Final Marks"}
                      mode="outlined"
                      textColor="black"
                      outlineColor="black"
                      contentStyle={{
                        fontSize: 13,
                      }}
                      keyboardType="number-pad"
                      inputMode="numeric"
                      maxLength={2}
                      error={practicalMarksErr}
                      value={practicalMarks}
                      onChangeText={(text) => {
                        setmarksError(false);
                        setfinalsError(false);
                        setpracticalMarksErr(false);
                        setpracticalMarks(text);
                      }}
                    ></TextInput>
                    {practicalMarksErr ? (
                      <Text style={{ color: "red" }}>{practicalMarksErr}</Text>
                    ) : (
                      <View></View>
                    )}
                  </View>
                </View>

                {marksError ? (
                  <View
                    style={{
                      width: "90%",
                      height: 90,
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontSize: 20, color: "red" }}>
                      {marksError}
                    </Text>
                  </View>
                ) : (
                  <View></View>
                )}
              </View>
            </View>
          </ScrollView>

          <Modal
            visible={isLoading}
            backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <ActivityIndicator size={60}></ActivityIndicator>
          </Modal>

          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              Alert.alert("Save?", "Do you want save?", [
                {
                  text: "No",
                  onPress: () => {
                    return;
                  },
                },
                {
                  text: "Yes",
                  onPress: onSave,
                },
              ])
            }
          >
            <Text style={{ fontSize: 18, color: "white" }}>Save</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "white",
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  btn: {
    width: "90%",
    borderRadius: 20,

    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "3%",
    backgroundColor: "#EB6A70",
  },
});
