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
import { Modal } from "@ui-kitten/components";
import { getStudentBySubject } from "../store/actions/actions";
import * as updates from "expo-updates";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "../store/actions/actions";

export default function SelectSubject(props) {
  const semisterId = props.route.params.semisterId;
  let subjects = useSelector((state) => state.MainReducer.subjects);
  subjects = subjects?.filter((subject) => subject.semesterId == semisterId);

  subjects = subjects[0]?.subjects;
  console.log(subjects);
  const choice = props.route.params.choice;
  const dispatch = useDispatch();
  const [selected, setselected] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const onclick = async (id) => {
    console.log(id);
    try {
      if (choice == "takeAttendence") {
        setisLoading(true);
        await dispatch(getAttendence(id));
        setisLoading(false);
        props.navigation.navigate("selectType", { subjectId: id });
      } else {
        props.navigation.navigate("SelectChance", { subjectId: id });
      }
    } catch (error) {
      setisLoading(false);
      //props.navigation.navigate("selectType", { subjectId: selected });
      Alert.alert("Error", error.message);
      if (error.code == 401) {
        // props.navigation.replace("Login");
        await dispatch(logout());
        await AsyncStorage.clear().then().then();
        updates.reloadAsync();

        return;
      }

      // return;
    }
  };
  // const onNext = async () => {
  //   if (!selected) {
  //     Alert.alert("Error!", "One Subject should be selected");
  //     return;
  //   }

  //};

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
            <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
              <ImageBackground
                style={{ height: 25, width: 32 }}
                source={require("../assets/images/menu.png")}
              ></ImageBackground>
            </TouchableOpacity>
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
        <View style={{ height: "80%" }}>
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
            {subjects?.map((subject, index) => (
              <SelectSubjectItem
                key={subject.subjectId}
                onClick={onclick}
                selected={selected == subject.subjectId ? true : false}
                subjectId={subject.subjectId}
                subject={subject.subjectName}
              ></SelectSubjectItem>
            ))}

            <Modal
              visible={isLoading}
              backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            >
              <ActivityIndicator size={60}></ActivityIndicator>
            </Modal>
          </ScrollView>
        </View>

        {/* <View
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
        </View> */}
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
