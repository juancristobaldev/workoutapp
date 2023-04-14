
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeStack } from "./HomeStack";
import { Ionicons } from "@expo/vector-icons";
import { Profile } from "../screens/Profile";
import { StyleSheet, TouchableOpacity } from "react-native";

import { TabIcon } from "../components/TabIcon";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Platform } from "react-native";
import { FoldersStack } from "./FoldersStack";
import { RoutinesStack } from "./RoutinesStack";

export const AnimatedTabLoggedin = (props) => {
  const navigation = props.navigation;

  const [screen, setScreen] = useState("main");
  const [routeCreate, setRouteCreate] = useState("");


  let sizeCreateValue, widthCreateValue;

  if (screen === "main" || screen === "folders" || screen === "routines") {
    sizeCreateValue = 0;
    widthCreateValue = 0;
  } else {
    sizeCreateValue = 2;
    widthCreateValue = 30;
  }

  const Tab = createBottomTabNavigator();

  const tabRoutes = [
    {
      route: "main",
      icon: "home",
      component: HomeStack,
    },
    {
      route: "routines",
      icon: "document-text",
      component: RoutinesStack,
    },
    {
      route: "folders",
      icon: "folder",
      component: FoldersStack,
    },
    {
      route: "profile",
      icon: "person",
      component: Profile,
    },
  ];

  const sizeIcon = 25;
  const heightTabBar = 60;

  const TabBarButton = (propsButton) => {
    const { item, onPress, accessibilityState, index, customStyle } =
      propsButton;

    const focused = accessibilityState.selected;

    return (
      <TabIcon
        onPress={() => {
          setScreen(item.route);
          onPress();
        }}
        style={[
          styles.container,
          { borderRadius: 20 },
          Platform.OS === "ios" && { top: (heightTabBar - sizeIcon) / 2.5 },
        ]}
        styleIcon={[
          {
            alignSelf: "center",
          },
        ]}
        size={sizeIcon}
        name={item.icon}
        focused={focused}
      />
    );
  };

  const AnimatedCreate = (propsCreate) => {

    const sizeCreate = useSharedValue(sizeCreateValue);
    const widthCreate = useSharedValue(widthCreateValue);

    useEffect(() => {
      setRouteCreate(`create-${screen}`);

      if (screen === "folders" || screen === "routines" || screen === "main") {
        sizeCreate.value = withSpring(2);
        widthCreate.value = withSpring(sizeIcon);
      } else {
        sizeCreate.value = withSpring(0);
        widthCreate.value = withSpring(10);
      }
    }, [screen]);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        height: widthCreate.value,
        width: widthCreate.value,
        transform: [{ scale: sizeCreate.value }],
      };
    });

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(routeCreate)}
        style={{ marginHorizontal: (screen !== 'profile' ? sizeIcon : 0 )}}
      >
        <Animated.View
          style={[
            { ...animatedStyle },
            { top: (heightTabBar - sizeIcon) / 2.5, borderRadius: 20 },
          ]}
        >
          <Ionicons
            style={{ alignSelf: "center" }}
            size={sizeIcon}
            name="add-circle"
            color={"black"}
          />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {tabRoutes.map((item, index) => {
          return (
            <>
              <Tab.Screen
                key={index}
                name={item.route}
                options={{
                  tabBarShowLabel: false,
                  tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons
                      style={{
                        position: "absolute",
                      }}
                      size={sizeIcon}
                      name={focused ? item.activeIcon : item.inactiveIcon}
                    />
                  ),
                  tabBarButton: (props) => {
                    return (
                      <>
                        <TabBarButton {...props} item={item} index={index} />
                        {index === 1 && <AnimatedCreate />}
                      </>
                    );
                  },
                }}
                component={item.component}
              />
            </>
          );
        })}
      </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 100,
    flex: 1,
    justifyContent: "center",
  },
});
