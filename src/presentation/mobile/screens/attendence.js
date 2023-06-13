import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
  Dimensions,
  Alert,
  Button,
} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../constants/colors";
import AttendenceItem from "./AttendenceItem";
import Animated, {
  event,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  scrollTo,
  withTiming,
  useSharedValue,
  runOnJS,
} from "react-native-reanimated";
import { HeaderBackButton } from "@react-navigation/stack";
import { useRef } from "react";
import { useState } from "react";

export default function attendence(props) {
  var [offSetX, setOffSetX] = useState(0);
  const scrollRef = useRef({});
  const students = [
    [1, "khan"],
    [2, "jan"],
    [3, "Naveed"],
  ];

  const onScroll = (event) => {
    setOffSetX(event.nativeEvent.contentOffset.x);

    // if (event.contentOffset.x > 230 && scrollRef.current != {}) {
    //   // scrollTo(scrollRef, 250, 0, false);
    // }
  };
  const onPresent = () => {
    const { width } = Dimensions.get("window");
    scrollRef.current.scrollTo({
      x: offSetX + width,
      y: 0,
      animated: true,
    });
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
          <View style={{ width: "60%" }}>
            <Text style={{ color: "white", fontSize: 23 }}>
              FCS for University
            </Text>
          </View>
          <View style={{ width: "15%" }}>
            <HeaderBackButton
              onPress={() =>
                Alert.alert("Save?", "Are You sure to save attendence?", [
                  <Button title="Ok"></Button>,
                ])
              }
              backImage={() => (
                <ImageBackground
                  style={{ height: 25, width: 32 }}
                  source={require("../assets/images/save.png")}
                ></ImageBackground>
              )}
            ></HeaderBackButton>
          </View>
        </View>
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.Scroll}
          onScroll={onScroll}
          scrollEventThrottle={16}
          pagingEnabled
          ref={scrollRef}
        >
          {students.map((student) => {
            const studentName = student[1];
            const studentId = student[0];
            return (
              <AttendenceItem
                key={studentId}
                studentName={studentName}
                studentId={studentId}
                onPresent={onPresent}
              ></AttendenceItem>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "90%",
  },

  submitbtn: {
    minWidth: 250,
    borderRadius: 25,

    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: colors.secondry,
  },
  Scroll: {
    backgroundColor: "white",
    justifyContent: "flex-start",
  },
});
