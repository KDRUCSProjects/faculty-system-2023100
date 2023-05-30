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

export default login = (props) => {
  const [email, setEmail] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState(null);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const onStudent = () => props.navigation.navigate("studentScreen");
  useEffect(() => {
    navigation.addListener("beforeRemove", (event) => {
      event.preventDefault();
      Alert.alert("Exit", "Do you want Exit?", [
        { text: "No", onPress: () => {} },
        {
          text: "Yes",
          onPress: () => {
            BackHandler.exitApp();
          },
        },
      ]);
    });
  }, [navigation]);

  const onLogin = async () => {
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
  };

  useEffect(() => {
    if (error) {
      setisLoading(false);
      seterror(null);
      Alert.alert("Error", error, [<Text>ok</Text>]);
    }
  }, [isLoading, error]);
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
            <Text style={{ fontSize: 40, color: "white" }}>Hello</Text>
          </View>

          <Text style={{ fontSize: 20, color: "white" }}>
            Sign in to your account
          </Text>
        </View>
        <View style={styles.inputFieldsContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputField}
              placeholder="Username"
              onChangeText={(email) => setEmail(email)}
            />

            <MaterialCommunityIcons
              style={{ marginRight: "2%" }}
              name={"account"}
              size={25}
              color="#232323"
            />
          </View>
          <View style={styles.inputContainer}>
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
              onChangeText={(text) => setPassword(text)}
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
            <Text style={styles.Text}>LOGIN</Text>
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
          <TouchableOpacity
            style={{
              width: "50%",
              justifyContent: "center",
              borderRadius: 15,
              backgroundColor: "#EB6A70",
            }}
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
          <TouchableOpacity
            onPress={onStudent}
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
    width: "90%",
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
    fontSize: 18,
    color: "white",
  },
});
