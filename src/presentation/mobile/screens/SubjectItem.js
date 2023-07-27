import { Dimensions, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { useState } from "react";
import colors from "../constants/colors";

const { width, height } = Dimensions.get("window");

const SubjectItem = (props) => {
  return (
    <Card
      style={props.selected ? styles.selected : styles.normal}
      onPress={() => {
        props.onClick(props.subjectId);
        // setselectedIndex(props.subjectId);
        // if (props.selected == props.subject) {
        //   setselected(!selected);
        // }
      }}
    >
      <Card.Content style={{ height: "40%" }}>
        <Text style={{ fontSize: 14, height: "70%", fontWeight: "bold" }}>
          {props.subject}
        </Text>
        <Text style={{ fontSize: 13, height: "30%" }}>
          Semister: {props.semester}
        </Text>
      </Card.Content>

      <Card.Cover
        style={{ height: "60%" }}
        source={{ uri: "https://picsum.photos/800" }}
      />
    </Card>
  );
};
const styles = StyleSheet.create({
  normal: { margin: 20, width: width / 2.7, height: height / 3.5 },
  selected: {
    margin: 20,
    width: width / 2.5,
    height: height / 3.5,
    borderWidth: 1,
    borderColor: colors.primary,
  },
});

export default SubjectItem;
