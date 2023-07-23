import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAttendence, loadSubjects } from "../store/actions/actions";
import { useEffect } from "react";
import { Button } from "react-native-paper";
import colors from "../constants/colors";
import { HeaderBackButton } from "@react-navigation/stack";
import SubjectItem from "./SubjectItem";
import SelectSubjectItem from "./SelectSubjectItem";

export default function SelectSubject(props) {
  const subjects = useSelector((state) => state.MainReducer.subjects);

  const dispatch = useDispatch();

  const onclick = async (id) => {
    try {
      await dispatch(getAttendence(id));
      props.navigation.navigate("selectType", { subjectId: id });
    } catch (error) {
      if (error.code == 401) {
        props.navigation.navigate("Login");
      }
      Alert.alert("Error", error.message);
      return;
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          height: "100%",
          width: "100%",
        }}
      >
        <View
          style={{
            height: "9%",
            marginTop: "7%",
            backgroundColor: colors.primary,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ width: "20%" }}>
            <HeaderBackButton
              onPress={() => props.navigation.toggleDrawer()}
              backImage={() => (
                <ImageBackground
                  style={{ height: 25, width: 32 }}
                  source={require("../assets/images/menu.png")}
                ></ImageBackground>
              )}
            ></HeaderBackButton>
          </View>
          <View style={{ width: "70%" }}>
            <Text style={{ color: "white", fontSize: 23 }}>
              FCS for University
            </Text>
          </View>
        </View>
        <Text style={{ fontSize: 20, margin: 10 }}>Choose a subject</Text>
        <View style={{ height: "70%" }}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
            style={{}}
          >
            {subjects.map((subject, index) => (
              <SelectSubjectItem
                key={subject.id}
                onClick={onclick}
                subjectId={subject.id}
                subject={subject.name}
                semester={subjects[index]["Semester.title"]}
              ></SelectSubjectItem>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});
