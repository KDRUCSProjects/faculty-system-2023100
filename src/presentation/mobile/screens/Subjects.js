import { StyleSheet, View, Text, ImageBackground } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loadSubjects } from "../store/actions/actions";
import { useEffect } from "react";
import { Button } from "react-native-paper";
import colors from "../constants/colors";
import { HeaderBackButton } from "@react-navigation/stack";

export default function Subject(props) {
  const subjects = useSelector((state) => state.MainReducer.subjects);
  console.log(subjects);
  const onclick = () => {};

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
        <Text style={{ fontSize: 20 }}>Subjects Screen</Text>
        {subjects.map((subject) => (
          <View key={subject.id} style={{ flexDirection: "row" }}>
            <Text>"Subject: "{subject.name}</Text>
            <Text>"semester: "{subject.SemesterId}</Text>
          </View>
        ))}
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
