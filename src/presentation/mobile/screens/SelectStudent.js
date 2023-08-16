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
import Header from "../ui/components/Header";
import BottomButton from "../ui/components/BottomButton";

export default function SelectStudent(props) {
  const subjectIdParam = props.route.params.subjectId;
  const status = props.route.params.status;
  const students = useSelector((state) => state.studentsBySubject.students);
  const [selectedStudent, setselectedStudent] = useState(null);
  const [selectedStudentErr, setselectedStudentErr] = useState(false);
  const [updated, setupdated] = useState(false);

  const onSelectStudent = () => {
    if (!selectedStudent) {
      setselectedStudentErr("A Student should be selected!");
      return;
    }
    const student = students.filter(
      (student) => student.studentId == selectedStudent
    );

    if (student[0].shokaList) {
      setupdated(student.studentId);
      props.navigation.navigate("CreateShoka", {
        subjectId: subjectIdParam,
        status: status,
        studentId: selectedStudent,
        update: true,
      });
    } else {
      props.navigation.navigate("CreateShoka", {
        subjectId: subjectIdParam,
        status: status,
        studentId: selectedStudent,
        update: false,
      });
    }
    setselectedStudent(null);
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
        {/* <View
               style={{
                  height: 60,
                  marginTop: Platform.OS == 'android' ? '7%' : 0,
                  backgroundColor: colors.primary,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
               }}
            >
               <View style={{ width: '20%' }}>
                  <TouchableOpacity onPress={() => props.navigation.goBack()}>
                     <ImageBackground
                        style={{ height: 25, width: 32 }}
                        source={require('../assets/images/lessthan.png')}
                     ></ImageBackground>
                  </TouchableOpacity>
               </View>
               <View style={{ width: '70%' }}>
                  <Text style={{ color: 'white', fontSize: 23 }}>FCS for University</Text>
               </View>
            </View> */}
        <Header
          leftIcon="back"
          onLeft={() => props.navigation.goBack()}
        ></Header>
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
                  setselectedStudentErr(false);
                  setselectedStudent(student.studentId);
                }}
                updated={student.shokaList}
                selected={selectedStudent}
                studentId={student.studentId}
                studentName={student.studentName}
                studentFatherName={student.fatherName}
                studentGrandFatherName={student.studentGrandFatherName}
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

      {/* <TouchableOpacity
        style={styles.btn}
        onPress={onSelectStudent}
      >
        <Text style={{ fontSize: 18, color: "white" }}>Select</Text>
      </TouchableOpacity> */}

      <BottomButton onPress={onSelectStudent}></BottomButton>
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
    borderRadius: 5,

    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "3%",
    backgroundColor: colors.primary,
  },
});
