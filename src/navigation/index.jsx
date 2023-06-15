import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import MainNavigator from "./main";

export default () => (
  <NavigationContainer>
    <MainNavigator />
  </NavigationContainer>
);