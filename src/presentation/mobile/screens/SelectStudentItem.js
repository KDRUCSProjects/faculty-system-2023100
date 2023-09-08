import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import colors from "../constants/colors";

export default function SelectStudentItem(props) {
  return (
    <TouchableOpacity
      style={
        props.studentId == props.selected
          ? {
              flex: 1,
              flexDirection: "row",
              width: "90%",
              height: 80,
              borderWidth: 2,
              marginVertical: 3,
              borderRadius: 10,
              borderColor: props.updated ? "#34eb9b" : "black",
              backgroundColor: colors.primary,
            }
          : {
              flex: 1,
              flexDirection: "row",
              borderColor: props.updated ? "#34eb9b" : "black",
              width: "90%",
              height: 80,
              borderWidth: 1,
              marginVertical: 3,
              borderRadius: 3,
            }
      }
      onPress={() => props.onPress(props.studentId)}
    >
      {/* <View>
        <Text>Student Id:{props.studentId}</Text>
        <Text>Student Name:{props.studentName}</Text>
      </View> */}

      <View
        style={{
          width: "100%",
          justifyContent: "space-around",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ width: "10%" }}>
          <View
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              backgroundColor: "#007EA7",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Entypo
              name="user"
              size={30}
              color="white"
            />
          </View>
        </View>
        <View style={{ justifyContent: "flex-start", width: "70%" }}>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={
              props.studentId == props.selected
                ? styles.selectedText
                : styles.text
            }
          >
            {props.studentName}
          </Text>
          <Text
            style={
              props.studentId == props.selected
                ? styles.selectedText
                : styles.text
            }
          >
            {props.studentFatherName}
          </Text>
          <Text
            style={
              props.studentId == props.selected
                ? styles.selectedText
                : styles.text
            }
          >
            {props.studentGrandFatherName}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    width: "90%",
    height: 80,
    borderWidth: 1,
    marginVertical: 3,
    borderRadius: 3,
  },
  selected: {
    flex: 1,
    flexDirection: "row",
    width: "90%",
    height: 80,
    borderWidth: 2,
    marginVertical: 3,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  text: { fontSize: 16, fontWeight: "bold" },
  selectedText: { fontSize: 16, fontWeight: "bold", color: "white" },
});
