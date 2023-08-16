import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAttendence, loadSubjects } from "../store/actions/actions";
import { useEffect } from "react";
import { Button } from "react-native-paper";
import colors from "../constants/colors";

import SelectSubjectItem from "./SelectSubjectItem";
import { useState } from "react";
import { Modal } from "@ui-kitten/components";
import { getStudentBySubject } from "../store/actions/actions";
import * as updates from "expo-updates";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "../store/actions/actions";
import BackHandlerChild from "../optimization/BackHandlerChild";
import Header from "../ui/components/Header";

export default function SelectSubject(props) {
  const semisterId = props.route.params.semisterId;
  let subjects = useSelector((state) => state.MainReducer.subjects);
  if (subjects) {
    subjects = subjects?.filter((subject) => subject.semesterId == semisterId);

    subjects = subjects[0]?.subjects;
  }

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
      } else if (choice == "createShoka") {
        props.navigation.navigate("SelectChance", { subjectId: id });
      } else {
        return;
      }
    } catch (error) {
      setisLoading(false);
      //props.navigation.navigate("selectType", { subjectId: selected });
      Alert.alert("Error!", error.message);
      if (error.code == 401) {
        // props.navigation.replace("Login");
        await dispatch(logout());
        await AsyncStorage.clear().then().then();
        // updates.reloadAsync();
        props.navigation.navigate("Login");
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
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            height: "100%",
            width: "100%",
          }}
        >
          {/* <View
                  style={{
                     height: 60,
                     marginTop: Platform.OS == 'android' ? '7%' : 0,
                     backgroundColor: colors.primary,
                     flexDirection: 'row',
                     justifyContent: 'space-between',
                     alignItems: 'center'
                  }}
               >
                  <View style={{ width: '20%' }}>
                     <TouchableOpacity onPress={() => props.navigation.goBack()}>
                        <ImageBackground
                           style={{ height: 25, width: 32 }}
                           source={require('../assets/images/lessthan.png')}
                        ></ImageBackground>
                     </TouchableOpacity>
                  </View>
                  <View style={{ width: '70%' }}>
                     <Text style={{ color: 'white', fontSize: 23 }}>FCS for University</Text>
                  </View>
               </View> */}
          <Header
            leftIcon="back"
            onLeft={() => props.navigation.goBack()}
          ></Header>

          <View style={{ height: "90%" }}>
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
              {subjects && subjects.length > 0 ? (
                subjects.map((subject, index) => (
                  <SelectSubjectItem
                    key={subject.subjectId}
                    onClick={onclick}
                    selected={selected == subject.subjectId ? true : false}
                    subjectId={subject.subjectId}
                    subject={subject.subjectName}
                  ></SelectSubjectItem>
                ))
              ) : (
                <Text
                  style={{
                    color: colors.primary,
                    fontSize: 21,

                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  You haven't got any Subjects in this Semester
                </Text>
              )}

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
    </SafeAreaView>
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
