import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function SelectStudentItem(props) {
  return (
    <TouchableOpacity
      style={
        props.studentId == props.selected ? styles.selected : styles.container
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
              backgroundColor: "#5DA3FF",
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
            style={{ fontSize: 18, fontWeight: "bold" }}
          >
            {props.studentName}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "500" }}>
            {props.studentFatherName}
          </Text>
          <Text style={{ fontSize: 14, fontWeight: "300" }}>
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
    borderWidth: 2,
    marginVertical: 3,
    borderRadius: 10,
  },
  selected: {
    flex: 1,
    flexDirection: "row",
    width: "90%",
    height: 80,
    borderWidth: 2,
    marginVertical: 3,
    borderRadius: 10,
    borderColor: "#5DA3FF",
    backgroundColor: "#65B7F6",
  },
});
