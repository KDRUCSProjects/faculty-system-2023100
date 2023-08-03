import { BackHandler } from "react-native";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const BackHandlerChild = () => {
  const navigation = useNavigation();

  return useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        navigation.goBack();
      }
    );
    return () => backHandler.remove();
  }, []);
};
export default BackHandlerChild;
