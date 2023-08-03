import { BackHandler } from "react-native";
import { useEffect } from "react";

const BackHandlerParent = () =>
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);

export default BackHandlerParent;
