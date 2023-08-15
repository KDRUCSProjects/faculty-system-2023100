import { Dimensions, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { useState } from "react";
import colors from "../constants/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const SubjectItem = (props) => {
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
        {/* <Text style={{ fontSize: 14, height: "70%", fontWeight: "bold" }}>
          SemisterId: {props.semisterId}
        </Text> */}
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          Semester: {props.semisterName}
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
          name="bookshelf"
          size={100}
          color="black"
        />
      </View>
    </Card>
  );
};
const styles = StyleSheet.create({
  normal: { margin: 20, width: width / 2.7, height: height / 4.4 },
  selected: {
    margin: 20,
    width: width / 2.5,
    height: height / 3.5,
    borderWidth: 1,
    borderColor: colors.primary,
  },
});

export default SubjectItem;
