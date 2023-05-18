import React, { useState } from "react";
import { Alert, ImageBackground } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { authenticate } from "../store/actions/actions";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";
import colors from "../constants/colors";
import { useEffect } from "react";
import { ActivityIndicator, shadow } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default login = (props) => {
  const [email, setEmail] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState(null);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.addListener("beforeRemove", (event) => {
      event.preventDefault();
      Alert.alert("Exit", "Do you want Exit?", [
        { text: "No", onPress: () => {} },
        {
          text: "Yes",
          onPress: () => {
            navigation.dispatch(event.data.action);
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
      console.log("fff");
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
    <View style={styles.scroll}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/images/user.png")}
          style={{ height: 100, width: 100 }}
        ></ImageBackground>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            placeholder="Enter User Name"
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            name="password"
            placeholder="Enter password"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="newPassword"
            secureTextEntry={passwordVisibility}
            value={password}
            enablesReturnKeyAutomatically
            onChangeText={(text) => setPassword(text)}
          />
          <Pressable onPress={handlePasswordVisibility}>
            <MaterialCommunityIcons
              name={rightIcon}
              size={22}
              color="#232323"
            />
          </Pressable>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={onLogin}>
          {isLoading ? (
            <ActivityIndicator size={"small"}></ActivityIndicator>
          ) : (
            <Text style={styles.loginText}>LOGIN</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "space-around",
    flex: 1,
  },
  scroll: {
    flex: 1,
    height: 250,
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
  },
  loginBtn: {
    width: "90%",
    borderRadius: 15,

    height: 55,
    alignItems: "center",
    justifyContent: "center",
    //marginTop: 40,
    backgroundColor: colors.secondry,
  },
  inputContainer: {
    backgroundColor: "white",
    width: "90%",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#d7d7d7",
  },
  inputField: {
    padding: 14,
    fontSize: 22,
    width: "90%",
    shadowColor: colors.secondry,
  },
});
