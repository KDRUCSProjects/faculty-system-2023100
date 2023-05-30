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

export default studentIdScreen = (props) => {
  const onTeacher = () => props.navigation.navigate("Login");

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
            onPress={onTeacher}
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
              Teacher
            </Text>
          </TouchableOpacity>
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
