import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from "react-native";
import { useSelector } from "react-redux";
import SelectStudentItem from "./SelectStudentItem";
import colors from "../constants/colors";

export default function SelectStudent(props) {
  const subjectIdParam = props.route.params.subjectId;
  const status = props.route.params.status;
  const students = useSelector((state) => state.studentsBySubject.students);
  const [selectedStudent, setselectedStudent] = useState(null);
  const [selectedStudentErr, setselectedStudentErr] = useState(false);

  const onSelectStudent = () => {
    if (!selectedStudent) {
      setselectedStudentErr("A Student should be selected!");
      return;
    }
    props.navigation.navigate("CreateShoka", {
      subjectId: subjectIdParam,
      status: status,
      studentId: selectedStudent,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          width: "100%",
          height: "90%",
          justifyContent: "center",
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
        <ScrollView
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {students?.map((student) => {
            return (
              <SelectStudentItem
                key={student.studentId}
                onPress={() => {
                  console.log(student.studentId);
                  setselectedStudentErr(false);
                  setselectedStudent(student.studentId);
                }}
                selected={selectedStudent}
                studentId={student.studentId}
                studentName={student.studentName}
                studentFatherName={student.fatherName}
              ></SelectStudentItem>
            );
          })}
        </ScrollView>
        {selectedStudentErr ? (
          <Text style={{ color: "red", textAlign: "center" }}>
            {selectedStudentErr}
          </Text>
        ) : (
          <View></View>
        )}
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={onSelectStudent}
      >
        <Text style={{ fontSize: 18, color: "white" }}>Select</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
