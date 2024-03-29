import { Dimensions, StyleSheet, View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar, Button, Card } from "react-native-paper";
import { useState } from "react";
import colors from "../constants/colors";
import { FontAwesome5 } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const SelectSubjectItem = (props) => {
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
        <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}>
          {props.subject}
        </Text>
        {/* <Text style={{ fontSize: 13, height: "30%" }}>
          Id: {props.subjectId}
        </Text> */}
      </Card.Content>

      <View
        style={{
          height: "60%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FontAwesome5
          name="book"
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
    height: 210,
    borderRadius: 5,
    paddingVertical: 10,
  },
  selected: {
    margin: 20,
    width: width / 2.5,
    height: height / 3.5,
    borderWidth: 1,
    borderColor: colors.primary,
  },
});

export default SelectSubjectItem;
