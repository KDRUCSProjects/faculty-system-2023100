import * as React from "react";
import { Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar, Button, Card, Text } from "react-native-paper";

const { width, height } = Dimensions.get("window");

const SubjectItem = (props) => (
  <Card style={{ margin: 20, width: width / 2.5, height: height / 3.5 }}>
    <Card.Content style={{ height: "40%" }}>
      <Text style={{ fontSize: 16, height: "70%", fontWeight: "bold" }}>
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

export default SubjectItem;
