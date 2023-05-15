import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import colors from "../constants/colors";
export default studentIdScreen = (props) => {
  const [id, setid] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.markImage}>
        <ImageBackground
          source={require("../assets/images/marks.png")}
          style={{ width: 100, height: 100 }}
        ></ImageBackground>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Student ID"
          placeholderTextColor="white"
          onChangeText={(id) => setid(id)}
        />
      </View>

      <TouchableOpacity style={styles.submitbutton}>
        <Text style={styles.loginText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  markImage: { margin: "10%" },
  inputView: {
    backgroundColor: colors.secondry,
    borderRadius: 10,
    width: "60%",
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

  submitbutton: {
    width: "80%",
    borderRadius: 25,

    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: colors.secondry,
  },
});
