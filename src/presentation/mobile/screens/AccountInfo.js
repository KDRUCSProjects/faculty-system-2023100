import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import colors from "../constants/colors";
import { HeaderBackButton } from "@react-navigation/stack";
import { Button, Snackbar, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateAccount } from "../store/actions/actions";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Toast from "react-native-simple-toast";
import { Modal } from "@ui-kitten/components/ui";

export default function AccountInfo(props) {
  const username = useSelector((state) => state.MainReducer.userName);

  const lastname = useSelector((state) => state.MainReducer.lastName);
  const prevEmail = useSelector((state) => state.MainReducer.email);
  const [userName, setuserName] = useState(username);
  const [lastName, setlastName] = useState(lastname);
  const [email, setemail] = useState(prevEmail);

  const teacherPhotoName = useSelector((state) => state.MainReducer.photo);
  const teacherPhoto = useSelector((state) => state.MainReducer.photoUri);

  const [imgEdited, setimgEdited] = useState(false);
  const [imgEditedName, setimgEditedName] = useState(false);

  const [visible, setVisible] = useState(false);
  const { height, width } = Dimensions.get("screen");

  const askPermission = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.MEDIA_LIBRARY
    );
    if (result.status !== "granted") {
      Alert.alert("Insuffiecient permissions!", "Camera Should be accessed");
      return false;
    }
    return true;
  };

  const onChangeImg = async () => {
    setVisible(true);
  };

  const onGallerry = async () => {
    const hasPermission = await askPermission();
    if (!hasPermission) {
      return;
    }

    const image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.1,
    });
    if (!image.cancelled) {
      setimgEditedName(image.uri.split("/").pop());
      console.log(imgEditedName);
      setimgEdited(image.uri);
    }
    setVisible(false);
  };

  const onCamera = async () => {
    const hasPermission = await askPermission();
    if (!hasPermission) {
      return;
    }

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.1,
    });
    if (!image.cancelled) {
      setimgEditedName(image.uri.split("/").pop());
      console.log(imgEditedName);
      setimgEdited(image.uri);
    }
    setVisible(false);
  };

  const dispatch = useDispatch();
  const onSaveUpdate = async () => {
    try {
      const photo = imgEditedName ? imgEditedName : teacherPhotoName;
      await dispatch(
        updateAccount(userName, lastName, email, {
          uri: imgEdited,
          name: imgEditedName,
          type: "image/jpeg",
        })
      );
    } catch (e) {
      console.log(e);
      Alert.alert("Sorry!", e.toString());
    }

    Toast.BOTTOM;
    Toast.show("Account info updated", 2);
    props.navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
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
              <Text style={{ color: "white", fontSize: 23 }}>Profile</Text>
            </View>
          </View>

          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
            }}
          >
            <View
              style={{
                height: "100%",

                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  height: 200,
                  width: 400,
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <View style={{}}>
                  <View
                    style={{
                      borderColor: "#a7e9eb",
                      borderWidth: 1,
                      height: 140,
                      width: 140,
                      borderRadius: 140 / 2,
                      overflow: "hidden",
                    }}
                  >
                    {!imgEdited ? (
                      <ImageBackground
                        style={{
                          height: "100%",
                          width: "100%",

                          overflow: "hidden",
                          borderRadius: 120 / 2,
                        }}
                        resizeMode="center"
                        source={
                          teacherPhoto.includes("null")
                            ? require("../assets/images/avatar.png")
                            : {
                                uri: teacherPhoto,
                              }
                        }
                      ></ImageBackground>
                    ) : (
                      <ImageBackground
                        style={{
                          height: "100%",
                          width: "100%",
                          overflow: "hidden",
                          borderRadius: 120 / 2,
                        }}
                        source={{ uri: imgEdited }}
                      ></ImageBackground>
                    )}
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    position: "absolute",
                    bottom: 30,

                    left: 230,
                  }}
                  onPress={onChangeImg}
                >
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: "#a7e9eb",
                      overflow: "hidden",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 5,
                    }}
                  >
                    <ImageBackground
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      source={require("../assets/images/changePic1.png")}
                      resizeMode="center"
                    ></ImageBackground>
                  </View>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  height: "70%",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    width: "90%",
                    alignItems: "flex-start",
                    fontSize: 18,
                    padding: 5,
                  }}
                >
                  Basic Details
                </Text>
                <View style={{ width: "90%", height: 100 }}>
                  <TextInput
                    style={{ height: 60 }}
                    label={"Username"}
                    contentStyle={{ fontSize: 15 }}
                    mode="outlined"
                    textColor="gray"
                    value={userName}
                    onChangeText={(text) => {
                      setuserName(text);
                    }}
                  ></TextInput>
                </View>

                <View style={{ width: "90%", height: 100 }}>
                  <TextInput
                    style={{ height: 60 }}
                    contentStyle={{ fontSize: 15 }}
                    label={"Lastname"}
                    mode="outlined"
                    textColor="gray"
                    value={lastName}
                    onChangeText={(text) => setlastName(text)}
                  ></TextInput>
                </View>
                <View style={{ width: "90%", height: 100 }}>
                  <TextInput
                    style={{ height: 60 }}
                    label={"Email"}
                    mode="outlined"
                    contentStyle={{ fontSize: 15 }}
                    textColor="gray"
                    value={email}
                    onChangeText={(text) => setemail(text)}
                  ></TextInput>
                </View>
              </View>
            </View>
          </ScrollView>

          <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisible(false)}
          >
            <View
              style={{
                height: height / 2.9,
                width: width / 1.2,
                backgroundColor: "white",
                justifyContent: "space-around",
                flexDirection: "row-reverse",
                alignItems: "center",
                borderRadius: 8,
              }}
            >
              <TouchableOpacity
                style={{
                  height: "60%",
                  width: "40%",
                  justifyContent: "center",
                  alignItems: "center",
                  elevation: 3,
                  shadowColor: "rgba(100, 100, 111, 0.4)",

                  borderRadius: 10,
                }}
                onPress={onCamera}
              >
                <View
                  style={{
                    width: "80%",
                    height: "60%",
                  }}
                >
                  <ImageBackground
                    style={{ width: "100%", height: "100%" }}
                    source={require("../assets/images/camera.png")}
                  ></ImageBackground>
                </View>
                <Text style={{ textAlign: "center" }}>Use Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: "60%",
                  width: "40%",
                  justifyContent: "center",
                  alignItems: "center",
                  elevation: 3,
                  shadowColor: "rgba(100, 100, 111, 0.4)",

                  borderRadius: 10,
                }}
                onPress={onGallerry}
              >
                <View
                  style={{
                    width: "80%",
                    height: "60%",
                  }}
                >
                  <ImageBackground
                    style={{ width: "100%", height: "100%" }}
                    source={require("../assets/images/gallery1.png")}
                  ></ImageBackground>
                </View>
                <Text> Select from Gallerry</Text>
              </TouchableOpacity>
            </View>
          </Modal>
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
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
