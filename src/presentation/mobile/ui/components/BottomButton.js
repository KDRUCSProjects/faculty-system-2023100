import {
  View,
  Platform,
  TouchableOpacity,
  Text,
  ImageBackground,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import colors from "../../constants/colors";
const BottomButton = (props) => {
  return (
    <TouchableOpacity
      style={{
        width: "90%",
        borderRadius: 5,

        height: 60,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: "3%",
        backgroundColor: colors.primary,
      }}
      onPress={props.onPress}
    >
      <Text style={{ fontSize: 18, color: "white" }}>Select</Text>
    </TouchableOpacity>
  );
};

export default BottomButton;
