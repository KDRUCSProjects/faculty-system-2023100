import { StyleSheet, View, ImageBackground, SafeAreaView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { Layout, Text, TopNavigation, Divider } from "@ui-kitten/components";

export default function teacherScreen(props) {
  const username = useSelector((state) => state.MainReducer.userName);
  const onTakeAttendence = () => {
    props.navigation.navigate("attendenceScreen");
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="FCS for University" alignment="center" />
      <Divider />
      <Layout style={styles.container}>
        <View style={styles.container}>
          <View style={styles.teacherInfo}>
            <Text>{username}</Text>
          </View>
          <View style={styles.teacherInfo}>
            <Text>Teacher ID</Text>
          </View>
          <View style={styles.teacherInfo}>
            <Text>Teacher ClaSS</Text>
          </View>
          <View style={styles.attendenceContainer}>
            <TouchableWithoutFeedback>
              <ImageBackground
                style={{ height: 100, width: 100 }}
                source={require("../assets/images/viewattendence.png")}
              ></ImageBackground>
              <Text>View Attendence</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={onTakeAttendence}>
              <ImageBackground
                style={{ height: 100, width: 100 }}
                source={require("../assets/images/takeattendence.png")}
              ></ImageBackground>
              <Text>Take Attendence</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Layout>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  teacherInfo: {},
  attendenceContainer: {
    flexDirection: "row",
    margin: "30%",
    width: "100%",
    justifyContent: "space-evenly",
  },
});
