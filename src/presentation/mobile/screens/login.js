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
  PanGestureHandler,
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
import { useCallback } from "react";
import { useBackHandler } from "@react-native-community/hooks";
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

export default login = (props) => {
  const [email, setEmail] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState(null);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [emailError, setemailError] = useState(false);
  const [passwordError, setpasswordError] = useState(false);

  const navigation = useNavigation();
  useEffect(() => {
    navigation.addListener("beforeRemove", (event) => {
      event.preventDefault();
      Alert.alert("Exit", "Do you want Exit?", [
        {
          text: "No",
          onPress: () => {
            return;
          },
        },
        {
          text: "Yes",
          onPress: () => {
            BackHandler.exitApp();
          },
        },
      ]);
    });
  }, [navigation]);

  var translateX = useSharedValue(0);
  const lenght = useRef(144);
  var prevValue = useRef(0);

  const onStudent = () => {
    setTimeout(() => {
      translateX.value = 0;
    }, 500);
    return props.navigation.navigate("studentScreen");
  };
  const onLogin = async () => {
    const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const paswordRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/;
    if (email == "") {
      setemailError("email is Required");
      return;
    }
    if (!emailRegEx.test(email)) {
      setemailError("Please enter a valid Email");
      return;
    }
    if (password == "") {
      setpasswordError("password is Required");
      return;
    }

    if (!paswordRegEx.test(password)) {
      setpasswordError(
        "password should be at least 7 characters which contain at least one numeric digit"
      );
      return;
    }

    try {
      setisLoading(true);
      await dispatch(authenticate(email, password));
      setisLoading(false);
    } catch (err) {
      setisLoading(false);
      seterror(err.message);
      return;
    }

    props.navigation.navigate("teacherScreen");
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (error) {
      setisLoading(false);
      seterror(null);
      Alert.alert("Error", error, [<Text>ok</Text>]);
    }
  }, [isLoading, error]);

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      prevValue.current = translateX.value;
    },
    onActive: (event) => {
      const distance = Math.sqrt(translateX.value ** 2);
      // if (distance < lenght.current && event.velocityX < 0) {
      //   translateX.value = event.translationX + prevValue.current;
      // }
      if (!(event.velocityX < 0)) {
        translateX.value = event.translationX + prevValue.current;

        return;
      }
    },
    onEnd: (event) => {
      const distance = Math.sqrt(translateX.value ** 2);

      if (distance >= lenght.current / 2 && event.velocityX >= 0) {
        translateX.value = withSpring(lenght.current);
        runOnJS(onStudent)();
      } else {
        translateX.value = withTiming(0, 3000);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return { transform: [{ translateX: translateX.value }], zIndex: 1 };
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
            alignContent: "center",
            justifyContent: "center",
            height: "10%",
          }}
        >
          <View
            style={{
              alignContent: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Text style={{ fontSize: 40, color: "white" }}>AssalamAlaikum</Text>
          </View>

          <Text style={{ fontSize: 20, color: "white", textAlign: "center" }}>
            Sign in to your account
          </Text>
        </View>
        <View style={styles.inputFieldsContainer}>
          <View
            style={[
              styles.inputContainer,
              {
                borderColor: emailError ? "red" : "white",
                borderWidth: emailError ? 1.8 : 0,
              },
            ]}
          >
            <TextInput
              style={styles.inputField}
              placeholder="Email"
              onChangeText={(email) => {
                setEmail(email);
                setemailError(false);
              }}
              value={email}
            />

            <MaterialCommunityIcons
              style={{ marginRight: "2%" }}
              name={"account"}
              size={25}
              color="#232323"
            />
          </View>
          <View style={{ width: "90%" }}>
            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : (
              <></>
            )}
          </View>
          <View
            style={[
              styles.inputContainer,
              {
                borderColor: passwordError ? "red" : "white",
                borderWidth: passwordError ? 1.8 : 0,
              },
            ]}
          >
            <TextInput
              style={styles.inputField}
              name="password"
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="newPassword"
              secureTextEntry={passwordVisibility}
              value={password}
              enablesReturnKeyAutomatically
              onChangeText={(text) => {
                setPassword(text);
                setpasswordError(false);
              }}
            />
            <Pressable
              onPress={handlePasswordVisibility}
              style={{ marginRight: "2%" }}
            >
              <MaterialCommunityIcons
                name={rightIcon}
                size={25}
                color="#232323"
              />
            </Pressable>
          </View>
          <View style={{ width: "90%" }}>
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : (
              <></>
            )}
          </View>
          <TouchableOpacity
            style={{ flexDirection: "row", justifyContent: "flex-end" }}
          >
            <Text style={styles.forgot_button}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={onLogin}>
          {isLoading ? (
            <ActivityIndicator size={"small"}></ActivityIndicator>
          ) : (
            <Text style={{ fontSize: 18, color: "white" }}>LOGIN</Text>
          )}
        </TouchableOpacity>
        <View
          style={{
            height: 50,
            width: "70%",
            borderRadius: 15,
            backgroundColor: "white",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
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
                  style={{
                    backgroundColor: "#EB6A70",
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    borderRadius: 15,
                  }}
                  activeOpacity={0.8}
                >
                  <Text
                    style={{
                      ...styles.Text,
                      textAlign: "center",
                    }}
                  >
                    Teacher
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </PanGestureHandler>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              width: "50%",
              justifyContent: "center",
              borderRadius: 15,
              backgroundColor: "white",
            }}
          >
            <Text
              style={{
                ...styles.Text,
                textAlign: "center",
                color: "#EB6A70",
              }}
            >
              Student
            </Text>
          </TouchableOpacity>
        </View>
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
  scroll: {
    flex: 1,
  },
  image: {
    marginBottom: 40,
  },
  inputView: {
    //marginTop: "10%",
    borderWidth: 2,
    borderColor: colors.secondry,
    borderRadius: 10,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    //marginBottom: 30,
    color: "white",
    textAlign: "left",
  },
  loginBtn: {
    width: "80%",
    borderRadius: 15,

    height: 60,
    alignItems: "center",
    justifyContent: "center",
    //marginTop: 40,
    backgroundColor: "#EB6A70",
  },
  inputFieldsContainer: {
    marginTop: "10%",
    minHeight: 250,
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
    fontSize: 16,
    color: "white",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
});
