import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  Platform,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import colors from "../constants/colors";

import SubjectItem from "./SubjectItem";

import { useCallback, useState, useEffect } from "react";

import { Modal } from "@ui-kitten/components";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import BackHandlerParent from "../optimization/BackHanlderParent";

export default function Subjects(props) {
  const semisters = useSelector((state) => state.MainReducer.subjects);
  console.log(semisters);

  const dispatch = useDispatch();
  const [selected, setselected] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const onclick = async (id) => {
    console.log(id);
    props.navigation.navigate("selectSubject", {
      choise: "showSubjects",
      semisterId: id,
    });

    // if (!selected) {
    //   Alert.alert("Error!", "One Subject should be selected");
    //   return;
    // }
    // console.log(selected);
    // try {
    //   setisLoading(true);
    //   await dispatch(getStudentBySubject(selected));
    //   setisLoading(false);
    //   props.navigation.navigate("SelectChance", { subjectId: selected });
    // } catch (error) {
    //   if (error.code == 401) {
    //     props.navigation.navigate("Login");
    //   }
    //   Alert.alert("Error", error.message);
    //   return;
    // }
  };
  const onNext = async () => {};

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          height: "100%",
          width: "100%",
        }}
      >
        <StatusBar hidden={false}></StatusBar>
        <View
          style={{
            height: 60,
            marginTop: Platform.OS == "android" ? "7%" : 0,
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
          My Subjects in Semisters
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
            {semisters?.map((semister, index) => (
              <SubjectItem
                key={semister.semesterId}
                onClick={onclick}
                semisterId={semister.semesterId}
                semisterName={semister.title}
              ></SubjectItem>
            ))}
          </ScrollView>
          <Modal
            visible={isLoading}
            backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <ActivityIndicator size={60}></ActivityIndicator>
          </Modal>
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
