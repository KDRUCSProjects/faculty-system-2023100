import {
  StyleSheet,
  View,
  ImageBackground,
  SafeAreaView,
  BackHandler,
  Alert,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { HeaderBackButton } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import {
  FontAwesome5,
  FontAwesome,
  MaterialIcons,
  Octicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { Layout, TopNavigation, Divider } from "@ui-kitten/components";
import colors from "../constants/colors";
import { StatusBar } from "expo-status-bar";
import BackHandlerChild from "../optimization/BackHandlerChild";
import Header from "../ui/components/Header";

export default function TeacherScreen(props) {
  BackHandlerChild();
  const username = useSelector((state) => state.MainReducer.userName);
  const semisterId = props.route.params.semisterId;

  const onTakeAttendence = () => {
    props.navigation.navigate("selectSubject", {
      choice: "takeAttendence",
      semisterId: semisterId,
    });
  };
  const onCreateShoka = () => {
    props.navigation.navigate("selectSubject", {
      choice: "createShoka",
      semisterId: semisterId,
    });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        height: "100%",
        width: "100%",
      }}
    >
      <StatusBar hidden={false}></StatusBar>
      {/* <View
            style={{
               height: 60,
               marginTop: Platform.OS == 'android' ? '7%' : 0,
               backgroundColor: colors.primary,
               flexDirection: 'row',
               justifyContent: 'space-between',
               alignItems: 'center'
            }}
         >
            <View style={{ width: '20%' }}>
               <TouchableOpacity onPress={() => props.navigation.goBack()}>
                  <ImageBackground
                     style={{ height: 25, width: 32 }}
                     source={require('../assets/images/lessthan.png')}
                  ></ImageBackground>
               </TouchableOpacity>
            </View>
            <View style={{ width: '70%' }}>
               <Text style={{ color: 'white', fontSize: 23 }}>FCS for University</Text>
            </View>
         </View> */}

      <Header
        leftIcon="back"
        onLeft={() => props.navigation.goBack()}
      ></Header>

      <Layout style={styles.container}>
        <View style={styles.teacherInfo}>
          {/* <Text style={{ fontSize: 25 }}></Text> */}
        </View>

        <View style={[styles.attendenceContainer, styles.shadowProp]}>
          <View
            style={{
              elevation: 2,
              shadowColor: "rgba(100, 100, 111, 0.4)",
              borderWidth: 0.5,
              borderColor: "rgba(100, 100, 111, 0.4)",

              borderRadius: 15,
              width: "80%",
              height: "45%",
            }}
          >
            <TouchableWithoutFeedback
              style={{
                height: "100%",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={onCreateShoka}
            >
              <View
                style={{
                  height: 120,
                  width: 120,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialIcons
                  name="list-alt"
                  size={120}
                  color={colors.primary}
                />
              </View>
              <Text style={{ fontSize: 25, fontWeight: "bold", marginTop: 25 }}>
                Create Shoka
              </Text>
            </TouchableWithoutFeedback>
          </View>

          <View
            style={{
              elevation: 2,
              shadowColor: "rgba(100, 100, 111, 0.4)",
              borderRadius: 15,
              borderWidth: 0.5,
              borderColor: "rgba(100, 100, 111, 0.4)",
              width: "80%",
              height: "45%",
            }}
          >
            <TouchableWithoutFeedback
              style={{
                height: "100%",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={onTakeAttendence}
            >
              <View
                style={{
                  height: 120,
                  width: 120,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="clipboard-check-outline"
                  size={120}
                  color={colors.primary}
                />
              </View>
              <Text style={{ fontSize: 25, fontWeight: "bold", marginTop: 25 }}>
                Take Attendence
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <View style={{ alignSelf: "flex-start", margin: "2%" }}></View>
      </Layout>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "85%",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  teacherInfo: {},
  attendenceContainer: {
    width: "100%",
    height: "80%",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
