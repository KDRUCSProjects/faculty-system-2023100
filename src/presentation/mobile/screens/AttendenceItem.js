import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import { RadioButton } from "react-native-paper";

import colors from "../constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const { height, width } = Dimensions.get("window");
export default function AttendenceItem(props) {
  const [checked, setChecked] = useState(false);
  return (
    <View style={styles.studentContainer}>
      <View
        style={{
          width: "80%",
          height: "45%",
          margin: "30%",
          elevation: 3,
          borderRadius: 15,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.image}>
          <ImageBackground
            style={{ width: "100%", height: "100%", flex: 1 }}
            source={require("./../assets/images/studentProfile.jpg")}
          ></ImageBackground>
        </View>
        <View style={styles.stdInfoContainer}>
          <Text style={styles.text}>{props.studentId}</Text>
          <Text style={styles.text}>{props.studentName}</Text>
        </View>
        <TouchableOpacity
          containerStyle={styles.statusContainer}
          onPress={() => {
            setChecked((prev) => !prev);
            if (!checked) {
              return props.onPresent();
            }
          }}
        >
          {checked ? (
            <MaterialCommunityIcons
              name="account-check"
              size={60}
            ></MaterialCommunityIcons>
          ) : (
            <MaterialCommunityIcons
              name="account-check-outline"
              size={60}
            ></MaterialCommunityIcons>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  studentContainer: {
    flex: 1,
    height,
    width,

    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    height: "60%",
    borderRadius: 25,
    overflow: "hidden",
    width: "80%",
    marginTop: "2%",
  },
  stdInfoContainer: {
    flexDirection: "row",
    height: "10%",
    width: "80%",
    justifyContent: "space-around",
  },
  statusContainer: {
    height: "25%",
    alignItems: "flex-end",
    width: "80%",
    justifyContent: "flex-end",
  },
  text: {
    fontSize: 20,
  },
});
