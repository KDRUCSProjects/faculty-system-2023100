import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useSelector } from "react-redux";

export default function auth(props) {
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        props.navigation.navigate("Login");
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expirationDate } = transformedData;
      const tExpirationDate = new Date(expirationDate);
      if (tExpirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate("Login");
        return;
      }
      props.navigation.navigate("teacherScreen");
    };
    tryLogin();
  }, []);
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"}></ActivityIndicator>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
