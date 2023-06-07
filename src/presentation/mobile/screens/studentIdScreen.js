import React, { useState } from "react";
import { Alert, ImageBackground, SafeAreaView } from "react-native";
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  Button,
  Pressable,
  Text,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { authenticate } from "../store/actions/actions";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";
import colors from "../constants/colors";
import { useEffect } from "react";
import { ActivityIndicator, shadow } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import {
  Layout,
  TopNavigation,
  Divider,
  BottomNavigation,
  BottomNavigationTab,
} from "@ui-kitten/components";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withTiming,
  withSpring,
  runOnJS,
  runOnUI,
} from "react-native-reanimated";
import { useRef } from "react";
import { PanGestureHandler } from "react-native-gesture-handler";

export default studentIdScreen = (props) => {
  const onTeacher = () => props.navigation.navigate("Login");

  const translateX = useSharedValue(0);
  const lenght = useRef(144);
  const prevValue = useRef(0);

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      prevValue.current = translateX.value;
    },
    onActive: (event) => {
      console.log(event.velocityX);
      const distance = Math.sqrt(translateX.value ** 2);

      if (!(event.velocityX > 0)) {
        translateX.value = -(event.translationX + prevValue.current);
        return;
      }
    },
    onEnd: (event) => {
      const distance = Math.sqrt(translateX.value ** 2);
      console.log(lenght.current);

      if (distance >= lenght.current / 2 && event.velocityX <= 0) {
        translateX.value = withSpring(lenght.current);
        runOnJS(onTeacher)();
      } else {
        translateX.value = withTiming(0, 3000);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return { transform: [{ translateX: -translateX.value }], zIndex: 1 };
  });
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
      <LinearGradient
        colors={["#5DA3FF", "#00157D"]}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View
          style={{
            height: 50,
            width: "70%",
            borderRadius: 15,
            backgroundColor: "white",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "5%",
          }}
        >
          <TouchableOpacity
            style={{
              width: "50%",
              justifyContent: "center",
              borderRadius: 15,
              backgroundColor: "white",
            }}
            activeOpacity={0.8}
          >
            <Text
              style={{
                ...styles.Text,
                textAlign: "center",
                color: "#EB6A70",
              }}
            >
              Teacher
            </Text>
          </TouchableOpacity>
          <View
            style={{
              width: "50%",
              justifyContent: "center",
              borderRadius: 15,
              zIndex: 1,
            }}
          >
            <PanGestureHandler onGestureEvent={panGestureEvent}>
              <Animated.View
                style={{
                  flex: 1,
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  borderRadius: 15,
                  alignItems: "center",

                  ...rStyle,
                }}
                onLayout={(event) => {
                  var { width } = event.nativeEvent.layout;
                  lenght.current = width;
                  console.log(lenght.current);
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    backgroundColor: "#EB6A70",
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    borderRadius: 15,
                  }}
                >
                  <Text
                    style={{
                      ...styles.Text,
                      textAlign: "center",
                    }}
                  >
                    Student
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </PanGestureHandler>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    height: "100%",
    flex: 1,
  },
  Text: {
    fontSize: 18,
    color: "white",
  },
});
