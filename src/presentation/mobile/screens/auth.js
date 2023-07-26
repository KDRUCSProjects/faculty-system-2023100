import AsyncStorage from "@react-native-async-storage/async-storage";
import { Spinner } from "@ui-kitten/components";
import { useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { useDispatch, useSelector } from "react-redux";
import { localAuth } from "../store/actions/actions";

export default function Auth(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        setTimeout(() => {
          props.navigation.navigate("Login");
        }, 3000);
        return;
      }
      const transformedData = JSON.parse(userData);
      const {
        name,
        lastName,
        email,
        photo,
        photoUri,
        subjects,
        token,
        userId,
        expirationDate,
      } = transformedData;
      const tExpirationDate = new Date(expirationDate);
      if (tExpirationDate <= new Date() || !token || !userId) {
        setTimeout(() => {
          props.navigation.navigate("Login");
        }, 3000);

        return;
      }
      dispatch(
        localAuth(
          userId,
          name,
          lastName,
          email,
          photo,
          photoUri,
          subjects,
          token
        )
      );
      props.navigation.navigate("teacherScreen");
    };
    tryLogin();
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/university_student.png")}
        style={{ height: 500, width: 141, overflow: "hidden", margin: 10 }}
      ></Image>

      <ActivityIndicator
        size={"large"}
        color="blue"
      ></ActivityIndicator>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});
