import { Dimensions, StyleSheet, View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar, Button, Card } from "react-native-paper";
import { useState } from "react";
import colors from "../constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const SemisterItem = (props) => {
  function rankSemester(number) {
    if (!number) return number;
    number = parseInt(number);
    if (number === 1) {
      return `${number}st`;
    } else if (number === 2) {
      return `${number}nd`;
    } else if (number === 3) {
      return `${number}rd`;
    } else {
      return `${number}th`;
    }
  }

  return (
    <Card
      style={props.selected ? styles.selected : styles.normal}
      onPress={() => {
        props.onClick(props.semisterId);
        // setselectedIndex(props.subjectId);
        // if (props.selected == props.subject) {
        //   setselected(!selected);
        // }
      }}
    >
      <Card.Content style={{ height: "40%" }}>
        {/* <Text style={{ fontSize: 14, fontWeight: "bold" }}>
          Id:{props.semisterId}
        </Text> */}
        <Text
          style={{
            fontSize: 16,
            color: colors.primary,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {" "}
          {rankSemester(props.semisterName)}
        </Text>

        <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}>
          {" "}
          Semester
        </Text>
      </Card.Content>

      <View
        style={{
          height: "60%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialCommunityIcons
          name="google-classroom"
          size={80}
          color={colors.primary}
        />
      </View>
    </Card>
  );
};
const styles = StyleSheet.create({
  normal: {
    margin: 20,
    width: width / 2.7,
    height: height / 4.4,
    borderRadius: 5,
    shadowColor: "rgb(8 21 66 / 5%)",
  },
  selected: {
    margin: 20,
    width: width / 2.7,
    height: height / 3.5,
    borderWidth: 1,
    borderColor: colors.primary,
  },
});

export default SemisterItem;
