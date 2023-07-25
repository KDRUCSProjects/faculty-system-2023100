import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAttendence, loadSubjects } from "../store/actions/actions";
import { useEffect } from "react";
import { Button } from "react-native-paper";
import colors from "../constants/colors";
import { HeaderBackButton } from "@react-navigation/stack";
import SubjectItem from "./SubjectItem";
import SelectSubjectItem from "./SelectSubjectItem";
import { useState } from "react";
import { getStudentBySubject } from "../store/actions/actions";
import { Modal } from "@ui-kitten/components";

export default function Subjects(props) {
  const subjects = useSelector((state) => state.MainReducer.subjects);

  const dispatch = useDispatch();
  const [selected, setselected] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const onclick = (id) => {
    setselected(id);
  };
  const onNext = async () => {
    if (!selected) {
      Alert.alert("Error!", "One Subject should be selected");
      return;
    }
    console.log(selected);
    try {
      setisLoading(true);
      await dispatch(getStudentBySubject(selected));
      setisLoading(false);
      props.navigation.navigate("SelectChance", { subjectId: selected });
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
        <Text
          style={{
            fontSize: 25,
            margin: 10,
            fontWeight: "bold",
            fontStyle: "italic",
          }}
        >
          Choose a subject
        </Text>
        <View style={{ height: "65%" }}>
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
            {subjects ? (
              subjects.map((subject, index) => (
                <SubjectItem
                  key={subject.id}
                  onClick={onclick}
                  selected={selected == subject.id ? true : false}
                  subjectId={subject.id}
                  subject={subject.name}
                  semester={subjects[index]["Semester.title"]}
                ></SubjectItem>
              ))
            ) : (
              <View></View>
            )}
          </ScrollView>
          <Modal
            visible={isLoading}
            backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <ActivityIndicator size={60}></ActivityIndicator>
          </Modal>
        </View>
        <View
          style={{
            height: "30%",
            width: "90%",
            flexDirection: "row",
            alignItems: "flex-start",
            marginTop: "10%",
            justifyContent: "space-between",
            marginHorizontal: 10,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "blue",
              height: 45,
              width: 80,
              borderRadius: 8,
              padding: 10,
              marginLeft: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => props.navigation.goBack()}
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,
                textAlign: "center",
                textAlignVertical: "center",
              }}
            >
              Back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              height: 45,
              width: 80,
              borderRadius: 8,
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={onNext}
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,
                textAlign: "center",
                textAlignVertical: "center",
              }}
            >
              Next
            </Text>
          </TouchableOpacity>
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
