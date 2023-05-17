import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavWrapper from "./navigation/NavWrapper";
import { createStore, legacy_createStore } from "redux";
import { Provider } from "react-redux";
import { combineReducers, applyMiddleware } from "redux";
import MainReducer from "./store/reducers/reducer";
import thunk from "redux-thunk";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { default as theme } from "./ui/colors.json";
export default function App() {
  const store = createStore(
    combineReducers({ MainReducer }),
    applyMiddleware(thunk)
  );

  return (
    <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
      <Provider store={store}>
        <NavWrapper></NavWrapper>
      </Provider>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
