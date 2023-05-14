import { StyleSheet, View, Text } from "react-native";

import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import colors from "../constants/colors";
import AttendenceItem from "./AttendenceItem";

export default function attendence(props) {
  const students = [
    [1, "khan"],
    [2, "jan"],
    [2, "jan"],
    [2, "jan"],
    [2, "jan"],
    [2, "jan"],
    [2, "jan"],
    [2, "jan"],
    [2, "jan"],
    [2, "jan"],
    [2, "jan"],
  ];
  return (
    <View style={styles.container}>
      <ScrollView style={styles.Scroll}>
        {students.map((student) => {
          const studentName = student[1];
          const studentId = student[0];
          return (
            <AttendenceItem
              studentName={studentName}
              studentId={studentId}
            ></AttendenceItem>
          );
        })}
      </ScrollView>
      <TouchableOpacity style={styles.submitbtn} activeOpacity={0.5}>
        <Text style={styles.submittext}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "stretch",
    margin: 10,
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
  Scroll: {},
});
