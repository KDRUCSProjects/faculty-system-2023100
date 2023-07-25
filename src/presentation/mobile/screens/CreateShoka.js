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
import Toast from "react-native-simple-toast";
import { IndexPath, Select, SelectItem } from "@ui-kitten/components";
import { useEffect } from "react";
import { Modal } from "@ui-kitten/components/ui";

export default function CreateShoka(props) {
  const subjectIdParam = props.route.params.subjectId;
  const status = props.route.params.status;

  const [isGetStudentLoading, setisGetStudentLoading] = useState(false);

  const students = useSelector((state) => state.studentsBySubject.students);

  const subjects = useSelector((state) => state.MainReducer.subjects);
  const ref = useRef();

  const [selectedSubject, setselectedSubject] = useState(null);

  const [selectedStudent, setselectedStudent] = useState(null);

  const [midTerm, setmidTerm] = useState("");
  const [assignments, setassignments] = useState("");
  const [finals, setfinals] = useState("");
  const [practicalMarks, setpracticalMarks] = useState("");

  const [midTermError, setmidTermError] = useState(false);
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

  useEffect(() => {
    ref.current.scrollToEnd();
  }, [marksError]);

  const onSave = async () => {
    const numRegEx = /\b([0-9]|[1-9][0-9]|100)\b/;

    if (!selectedStudent) {
      setselectedStudentErr("a Student should be selected!");
      return;
    }

    if (midTerm == "") {
      setmidTermError("This field is required!");
      return;
    }

    if (parseInt(midTerm) > 20) {
      setmidTermError("midTerm marks should be between 0-20");
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
        parseInt(midTerm) >
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
          studentId,
          midTerm,
          assignments,
          finals,
          practicalMarks,
          status
        )
      );
    } catch (e) {
      setisLoading(false);
      if (e.code == 401) {
        props.navigation.navigate("Login");
      }
      Alert.alert("Sorry!", e.message);
      return;
    }
    setisLoading(false);
    setselectedSubject(null);
    setSelectedIndex(null);
    setselectedStudent(null);
    setselectedStudentIndex(null);
    setmidTerm(null);
    setassignments(null);
    setfinals(null);
    Toast.BOTTOM;
    Toast.show("Shoka Created", 2);
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          height: "100%",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            height: 60,
            marginTop: "7%",
            backgroundColor: colors.primary,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <View style={{ width: "20%" }}>
            <HeaderBackButton
              onPress={() => props.navigation.goBack()}
              backImage={() => (
                <ImageBackground
                  style={{ height: 25, width: 32 }}
                  source={require("../assets/images/lessthan.png")}
                ></ImageBackground>
              )}
            ></HeaderBackButton>
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
                  <Select
                    style={{
                      borderWidth: 1,
                      borderRadius: 4,
                      borderColor: "black",
                    }}
                    placeholder="Choose Student"
                    status={!selectedStudentErr ? "basic" : "danger"}
                    size="large"
                    value={selectedStudent}
                    selectedIndex={selectedStudentIndex}
                    onSelect={(index) => {
                      setselectedStudent(students[index.row].studentName);
                      setstudentId(students[index.row].studentId);
                      setselectedStudentErr(false);
                      return setselectedStudentIndex(index);
                    }}
                  >
                    {students.map((student) => {
                      return (
                        <SelectItem
                          key={student.studentId}
                          title={student.studentName}
                        ></SelectItem>
                      );
                    })}
                  </Select>
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
                  <Text style={{ fontSize: 17 }}>Midterm Marks</Text>
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
                    label={"Midterm Marks"}
                    mode="outlined"
                    textColor="black"
                    outlineColor="black"
                    contentStyle={{
                      fontSize: 13,
                    }}
                    keyboardType="number-pad"
                    inputMode="numeric"
                    maxLength={2}
                    error={midTermError}
                    value={midTerm}
                    onChangeText={(text) => {
                      setmarksError(false);
                      setmidTermError(false);
                      setmidTerm(text);
                    }}
                  ></TextInput>
                  {midTermError ? (
                    <Text style={{ color: "red" }}>{midTermError}</Text>
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
      </View>

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
