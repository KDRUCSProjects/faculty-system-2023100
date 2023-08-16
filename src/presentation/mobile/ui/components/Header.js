import {
  View,
  Platform,
  TouchableOpacity,
  Text,
  ImageBackground,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import colors from "../../constants/colors";
const Header = (props) => {
  let leftImage;
  //   if (props.leftIcon) {
  //     leftImage =
  //       props.leftIcon != "back"
  //         ? "../assets/images/menu.png"
  //         : "../assets/images/menu.png";
  //   } else {
  //     leftImage = "../assets/images/menu.png";
  //   }
  return (
    <View
      style={{
        height: 60,
        marginTop: Platform.OS == "android" ? "7%" : 0,
        backgroundColor: colors.primary,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <StatusBar hidden={false}></StatusBar>
      <View
        style={{
          width: "20%",
        }}
      >
        {props.leftIcon != "back" ? (
          <TouchableOpacity onPress={() => props.onLeft()}>
            <ImageBackground
              style={{ height: 25, width: 28, marginLeft: 10 }}
              source={require("../../assets/images/menu.png")}
            ></ImageBackground>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => props.onLeft()}>
            <ImageBackground
              style={{ height: 25, width: 28, marginLeft: 10 }}
              source={require("../../assets/images/lessthan.png")}
            ></ImageBackground>
          </TouchableOpacity>
        )}
      </View>
      <View style={{ width: "60%", alignItems: "center" }}>
        <Text
          style={{
            color: "white",
            fontSize: 19,

            fontWeight: "bold",
          }}
        >
          {props.headerText ? props.headerText : "Faculty App"}
        </Text>
      </View>
      <View
        style={{
          width: "20%",
          alignItems: "center",
        }}
      >
        {props.onRight && (
          <TouchableOpacity onPress={() => props.onRight()}>
            <ImageBackground
              style={{ height: 25, width: 28, marginLeft: 10 }}
              source={require("../../assets/images/save.png")}
            ></ImageBackground>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;
