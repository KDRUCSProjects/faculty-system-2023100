import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import colors from "../constants/colors";
import { HeaderBackButton } from "@react-navigation/stack";
import { Snackbar, TextInput } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  changePassword,
  checkPassword,
  updateAccount,
} from "../store/actions/actions";
import Toast from "react-native-root-toast";
import { Modal } from "@ui-kitten/components";
import * as updates from "expo-updates";

import { logout } from "../store/actions/actions";
import BackHandlerChild from "../optimization/BackHandlerChild";
import { useHeaderHeight } from "@react-navigation/elements";
import Header from "../ui/components/Header";
import BottomButton from "../ui/components/BottomButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ChangePassword(props) {
  BackHandlerChild();
  const username = useSelector((state) => state.MainReducer.userName);
  const lastname = useSelector((state) => state.MainReducer.lastName);
  const prevEmail = useSelector((state) => state.MainReducer.email);
  const [currentPassword, setcurrentPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const [showPass, setshowPass] = useState(true);
  const [showNewPass, setshowNewPass] = useState(true);
  const [showConfirmPass, setshowConfirmPass] = useState(true);

  const [passwordError, setpasswordError] = useState(false);
  const [newPassError, setnewPassError] = useState(false);
  const [confirmPassError, setconfirmPassError] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const dispatch = useDispatch();
  const onChangePassword = async () => {
    const userData = await AsyncStorage.getItem("userData");

    const transformedData = JSON.parse(userData);
    const { name, lastName, email, photo } = transformedData;

    const paswordRegEx =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (currentPassword == "") {
      setpasswordError("Current Password is Required");
      return;
    }

    if (newPassword == "") {
      setnewPassError("New password is Required");
      return;
    }

    if (!paswordRegEx.test(newPassword)) {
      setnewPassError(
        "Password Must have One uppercase, one lowercase, one number, one special character and Minimum 8"
      );
      return;
    }

    if (newPassword != confirmPassword) {
      setconfirmPassError("New password and Confirm password should be same");
      return;
    }

    // try {
    //   await dispatch(checkPassword(currentPassword));
    // } catch (e) {
    //   if (e.code == 401) {
    //     props.navigation.navigate("Login");
    //   }
    //   Alert.alert("Sorry!", e.message);
    //   return;
    // }

    try {
      setisLoading(true);
      await dispatch(
        changePassword(currentPassword, newPassword, confirmPassword)
      );
      setisLoading(false);
      let toast = Toast.show("Password updated!", {
        duration: Toast.durations.LONG,
      });

      setTimeout(function hideToast() {
        Toast.hide(toast);
      }, 2000);
      props.navigation.goBack();
    } catch (e) {
      setisLoading(false);
      console.log(e);
      if (e.code == 401) {
        // props.navigation.navigate("Login");
        await dispatch(logout());
        await AsyncStorage.clear().then().then();
        props.navigation.navigate("Login");
        // updates.reloadAsync();
      }
      Alert.alert("Sorry!", e.message);
      return;
    }
  };

  const headerHeight = useHeaderHeight();
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={headerHeight}
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{
            flex: 1,
            height: "100%",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          {/* <View
            style={{
              height: 60,
              marginTop: Platform.OS == "android" ? "7%" : 0,
              backgroundColor: colors.primary,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <View style={{ width: "20%" }}>
              <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <ImageBackground
                  style={{ height: 25, width: 32 }}
                  source={require("../assets/images/lessthan.png")}
                ></ImageBackground>
              </TouchableOpacity>
            </View>
            <View style={{ width: "60%", alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 23 }}>
                Change password
              </Text>
            </View>
          </View> */}

          <Header
            headerText="Change Password"
            leftIcon="back"
            onLeft={() => props.navigation.goBack()}
          ></Header>

          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View
              style={{
                height: "40%",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <View
                style={{
                  height: 180,
                  width: 180,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="lock-reset"
                  size={150}
                  color={colors.primary}
                />
              </View>
              <Text style={{ fontWeight: "bold", fontSize: 30 }}>
                Change Password
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: 13, marginTop: 3 }}>
                Please enter your Password
              </Text>
            </View>

            <View
              style={{
                height: "50%",

                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  height: "70%",
                  marginTop: "5%",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <View style={{ width: "90%", height: 110 }}>
                  <TextInput
                    style={{ height: 60 }}
                    label={"Current password"}
                    mode="outlined"
                    outlineStyle={{ backgroundColor: "white" }}
                    autoCapitalize="none"
                    contentStyle={{ fontSize: 15 }}
                    error={passwordError}
                    value={currentPassword}
                    onChangeText={(text) => {
                      setpasswordError(false);
                      setcurrentPassword(text);
                    }}
                    right={
                      <TextInput.Icon
                        icon={showPass ? "eye" : "eye-off"}
                        onPress={() => setshowPass((prev) => !prev)}
                      />
                    }
                    secureTextEntry={showPass}
                  ></TextInput>
                  {passwordError ? (
                    <Text style={{ color: "red" }}>{passwordError}</Text>
                  ) : (
                    <View></View>
                  )}
                </View>

                <View style={{ width: "90%", height: 110 }}>
                  <TextInput
                    style={{ height: 60 }}
                    label={"New password"}
                    mode="outlined"
                    outlineStyle={{ backgroundColor: "white" }}
                    autoCapitalize="none"
                    contentStyle={{ fontSize: 15 }}
                    error={newPassError}
                    value={newPassword}
                    onChangeText={(text) => {
                      setnewPassError(false);
                      setnewPassword(text);
                    }}
                    right={
                      <TextInput.Icon
                        icon={showNewPass ? "eye" : "eye-off"}
                        onPress={() => setshowNewPass((prev) => !prev)}
                      />
                    }
                    secureTextEntry={showNewPass}
                  ></TextInput>
                  {newPassError ? (
                    <Text style={{ color: "red" }}>{newPassError}</Text>
                  ) : (
                    <View></View>
                  )}
                </View>
                <View style={{ width: "90%", height: 110 }}>
                  <TextInput
                    style={{ height: 60 }}
                    label={"Confirm password"}
                    mode="outlined"
                    outlineStyle={{ backgroundColor: "white" }}
                    autoCapitalize="none"
                    contentStyle={{ fontSize: 15 }}
                    error={confirmPassError}
                    value={confirmPassword}
                    onChangeText={(text) => {
                      setconfirmPassError(false);
                      setconfirmPassword(text);
                    }}
                    right={
                      <TextInput.Icon
                        icon={showConfirmPass ? "eye" : "eye-off"}
                        onPress={() => setshowConfirmPass((prev) => !prev)}
                      />
                    }
                    secureTextEntry={showConfirmPass}
                  ></TextInput>
                  {confirmPassError ? (
                    <Text style={{ color: "red" }}>{confirmPassError}</Text>
                  ) : (
                    <View></View>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
          <Modal
            visible={isLoading}
            backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <ActivityIndicator size={60}></ActivityIndicator>
          </Modal>
        </View>
        {/* <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            Alert.alert("Save?", "Do you want save?", [
              {
                text: "No",
                onPress: () => {
                  return;
                },
              },
              {
                text: "Yes",
                onPress: onChangePassword,
              },
            ])
          }
        >
          <Text style={{ fontSize: 18, color: "white" }}>Save</Text>
        </TouchableOpacity> */}
        <BottomButton
          onPress={() =>
            Alert.alert("Save?", "Do you want save?", [
              {
                text: "No",
                onPress: () => {
                  return;
                },
              },
              {
                text: "Yes",
                onPress: onChangePassword,
              },
            ])
          }
        ></BottomButton>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "white",
  },
  btn: {
    width: "90%",
    borderRadius: 20,

    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "3%",
    backgroundColor: "#EB6A70",
  },
});
