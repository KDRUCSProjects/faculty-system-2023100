import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavWrapper from "./navigation/NavWrapper";
import { createStore, legacy_createStore } from "redux";
import { Provider } from "react-redux";
import React from "react";
import { combineReducers, applyMiddleware } from "redux";
import MainReducer from "./store/reducers/reducer";
import thunk from "redux-thunk";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { default as theme } from "./ui/colors.json";
export default function App() {
  const store = createStore(
    combineReducers({ MainReducer }),
    applyMiddleware(thunk)
  );

  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack}></IconRegistry>
      <ApplicationProvider {...eva} theme={eva.light}>
        <Provider store={store}>
          <NavWrapper></NavWrapper>
        </Provider>
      </ApplicationProvider>
    </React.Fragment>
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
