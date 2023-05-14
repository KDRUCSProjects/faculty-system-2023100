import { TouchableOpacity } from "react-native";
import { Text, View, StyleSheet } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { ImageBackground } from "react-native";
import { useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import colors from "../constants/colors";

export default function role(props) {
  const [role, setrole] = useState("Teacher");
  const onTeacher = () => {
    props.navigation.navigate("Login");
  };
  const onStudent = () => {
    props.navigation.navigate("Mark Checking");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Please select your role in University</Text>

      <View style={styles.roleContainer}>
        <TouchableWithoutFeedback onPress={onTeacher} style={styles.roleItem}>
          <ImageBackground
            style={{ height: 150, width: 150 }}
            source={require("../assets/images/teacher.png")}
          ></ImageBackground>
          <Text style={styles.text}>Teacher</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={onStudent} style={styles.roleItem}>
          <ImageBackground
            style={{ height: 150, width: 150 }}
            source={require("../assets/images/student.png")}
          ></ImageBackground>
          <Text style={styles.text}>Student</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    width: "100%",
    height: "100%",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "flex-start",
  },
  roleContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    height: "100%",
  },
  roleItem: {
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
  buttonContainer: {
    width: 80,
    height: 40,
    backgroundColor: colors.secondry,
    borderRadius: 8,
    alignContent: "center",
    justifyContent: "center",
  },
  button: {
    textAlign: "center",
    fontSize: 18,
    color: "white",
  },
  dropdown2BtnStyle: {
    width: "80%",
    height: 50,
    backgroundColor: colors.secondry,
    borderRadius: 8,
  },
  dropdown2BtnTxtStyle: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  dropdown2DropdownStyle: {
    backgroundColor: colors.notify,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  dropdown2RowStyle: {
    backgroundColor: colors.secondry,
    borderBottomColor: "#C5C5C5",
  },
  dropdown2RowTxtStyle: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
