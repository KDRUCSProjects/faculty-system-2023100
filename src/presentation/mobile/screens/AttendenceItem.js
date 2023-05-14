import { StyleSheet, View, Text } from "react-native";
import { useState } from "react";
import { RadioButton } from "react-native-paper";
import colors from "../constants/colors";

export default function AttendenceItem(props) {
  const [checked, setChecked] = useState("first");
  return (
    <View style={styles.studentContainer}>
      <View style={styles.studentInfo}>
        <Text style={styles.text}>{props.studentName}</Text>
        <Text style={styles.text}>{props.studentId}</Text>
      </View>
      <View style={styles.attendenceContainer}>
        <View style={styles.attendence}>
          <Text style={styles.text}>Present</Text>
          <RadioButton
            value="first"
            color="green"
            status={checked === "first" ? "checked" : "unchecked"}
            onPress={() => setChecked("first")}
          />
        </View>
        <View style={styles.attendence}>
          <Text style={styles.text}>Absent</Text>
          <RadioButton
            value="second"
            color="red"
            status={checked === "second" ? "checked" : "unchecked"}
            onPress={() => setChecked("second")}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  attendenceContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
    margin: 10,
  },
  attendence: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "10%",
  },
  studentInfo: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
  },
});
