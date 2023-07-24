import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
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
import Toast from "react-native-simple-toast";

export default function ChangePassword(props) {
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

    try {
      await dispatch(checkPassword(currentPassword));
    } catch (e) {
      console.log(e);
      if (e.code == 401) {
        props.navigation.navigate("Login");
      }
      Alert.alert("Sorry!", e.message);
      return;
    }

    try {
      await dispatch(
        changePassword(currentPassword, newPassword, confirmPassword)
      );
    } catch (e) {
      console.log(e);
      Alert.alert("Sorry!", e.toString());
      return;
    }
    Toast.BOTTOM;
    Toast.show("Password updated", 2);
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          height: "100%",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            height: 60,
            marginTop: "7%",
            backgroundColor: colors.primary,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <View style={{ width: "20%" }}>
            <HeaderBackButton
              onPress={() => props.navigation.goBack()}
              backImage={() => (
                <ImageBackground
                  style={{ height: 25, width: 32 }}
                  source={require("../assets/images/lessthan.png")}
                ></ImageBackground>
              )}
            ></HeaderBackButton>
          </View>
          <View style={{ width: "60%", alignItems: "center" }}>
            <Text style={{ color: "white", fontSize: 23 }}>
              Change password
            </Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View
            style={{
              height: "50%",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <View style={{ height: 200, width: 200, margin: 10 }}>
              <ImageBackground
                style={{ width: "100%", height: "100%" }}
                source={require("../assets/images/reset-password.png")}
              ></ImageBackground>
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 30 }}>
              Change Password
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 13 }}>
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
              <View style={{ width: "90%", height: 90 }}>
                <TextInput
                  style={{ height: 60 }}
                  label={"Current password"}
                  mode="outlined"
                  textColor="gray"
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

              <View style={{ width: "90%", height: 90 }}>
                <TextInput
                  style={{ height: 60 }}
                  label={"New password"}
                  mode="outlined"
                  contentStyle={{ fontSize: 15 }}
                  textColor="gray"
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
              <View style={{ width: "90%", height: 90 }}>
                <TextInput
                  style={{ height: 60 }}
                  label={"Confirm password"}
                  mode="outlined"
                  textColor="gray"
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
      </View>
      <TouchableOpacity
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
              onPress: onSaveUpdate,
            },
          ])
        }
      >
        <Text style={{ fontSize: 18, color: "white" }}>Save</Text>
      </TouchableOpacity>
    </View>
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
