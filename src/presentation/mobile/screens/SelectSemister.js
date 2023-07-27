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
import SemisterItem from "./SemisterItem";
import { useNavigation } from "@react-navigation/native";

const SelectSemister = (props) => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.addListener("beforeRemove", (event) => {
      event.preventDefault();
      Alert.alert("Exit", "Do you want Exit?", [
        { text: "No", onPress: () => {} },
        {
          text: "Yes",
          onPress: () => {
            BackHandler.exitApp();
          },
        },
      ]);
    });
  }, [navigation]);

  const semisters = useSelector((state) => state.MainReducer.subjects);

  const dispatch = useDispatch();
  const [selected, setselected] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const onclick = async (id) => {
    console.log(id);

    props.navigation.navigate("teacherScreen", { semisterId: id });

    // return;
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
          <View
            style={{
              width: "20%",
            }}
          >
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
          Choose a Semister
        </Text>
        <View style={{ height: "80%", width: "100%" }}>
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
            {semisters?.map((semister, index) => (
              <SemisterItem
                key={semister.semesterId}
                onClick={onclick}
                selected={selected == semister.semesterId ? true : false}
                semisterId={semister.semesterId}
                semisterName={semister.title}
              ></SemisterItem>
            ))}

            <Modal
              visible={isLoading}
              backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            >
              <ActivityIndicator size={60}></ActivityIndicator>
            </Modal>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});

export default SelectSemister;
