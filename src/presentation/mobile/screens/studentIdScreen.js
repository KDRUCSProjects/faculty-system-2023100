import React, { useState } from "react";
import { Alert, Dimensions, ImageBackground, SafeAreaView } from "react-native";
import {
  StyleSheet,
  View,
  Image,
  Button,
  Pressable,
  TextInput,
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
import {
  ActivityIndicator,
  shadow,
  Portal,
  Dialog,
  PaperProvider,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import {
  Layout,
  TopNavigation,
  Divider,
  BottomNavigation,
  BottomNavigationTab,
  Modal,
  Card,
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

  const [text, setText] = useState("");

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      prevValue.current = translateX.value;
    },
    onActive: (event) => {
      const distance = Math.sqrt(translateX.value ** 2);

      if (!(event.velocityX > 0)) {
        translateX.value = -(event.translationX + prevValue.current);
        return;
      }
    },
    onEnd: (event) => {
      const distance = Math.sqrt(translateX.value ** 2);

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

  const onSearch = () => {
    setVisible(true);
  };
  const { height, width } = Dimensions.get("screen");
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
      <LinearGradient
        colors={["#5DA3FF", "#00157D"]}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.inputFieldsContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputField}
              placeholder="Type your CS ID"
              keyboardType="web-search"
              returnKeyType="search"
              onSubmitEditing={onSearch}
              onChangeText={(Id) => setText(Id)}
            />

            <Pressable onPress={onSearch} style={{ marginRight: "2%" }}>
              <ImageBackground
                style={{ height: 30, width: 30 }}
                source={require("../assets/images/search.png")}
              ></ImageBackground>
            </Pressable>
          </View>
        </View>

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

        <Modal
          visible={visible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setVisible(false)}
        >
          <View
            style={{
              height: height / 1.4,
              width: width / 1.2,
              backgroundColor: "white",
              justifyContent: "space-between",
              borderRadius: 8,
            }}
          >
            <Text>Welcome to UI Kitten 😻</Text>
            <Button title="DISMISS" onPress={() => setVisible(false)}></Button>
          </View>
        </Modal>
      </LinearGradient>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    height: "100%",
    flex: 1,
  },
  inputFieldsContainer: {
    minHeight: 100,
    justifyContent: "space-around",
    alignContent: "center",
  },
  inputContainer: {
    backgroundColor: "white",
    width: "90%",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  inputField: {
    padding: 14,
    fontSize: 22,
    width: "90%",
    shadowColor: colors.secondry,
  },
  Text: {
    fontSize: 18,
    color: "white",
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
