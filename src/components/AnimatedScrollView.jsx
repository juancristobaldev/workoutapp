import React from "react";
import { useWindowDimensions } from "react-native";
import { View } from "react-native";
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { AnimatedCardPlan } from "./AnimatedCardPlan";

export const AnimatedScrollView = ({ data, itemRender }) => {

    const x = useSharedValue(0)

    const { width } = useWindowDimensions()
    const sizeCard = width * 0.6
    const spacer = (width - sizeCard) / 2

    const onScroll = useAnimatedScrollHandler({
        onScroll: event => {
            x.value = event.contentOffset.x
        },
    })

    return (
        <Animated.ScrollView
            style={{
                marginVertical:15
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            snapToInterval={sizeCard}
            scrollEventThrottle={16}
            onScroll={onScroll}
        >
            {data.map((item, index) => {

                const style = useAnimatedStyle(() => {

                    const scale = interpolate(
                        x.value,
                        [(index - 2) * sizeCard, (index - 1) * sizeCard, index * sizeCard],
                        [0.8, 1, 0.8]
                    )

                    return {
                        transform: [{ scale }]
                    }
                })

                if (!item.namePlan) return (
                    <View key={index} style={{ width: spacer }} />
                )
                else return (
                    <AnimatedCardPlan
                        key={index}
                        item={item}
                        index={index}
                        sizeCard={sizeCard}
                        styleAnimated={style}
                    />
                )

            })}
        </Animated.ScrollView>
    )
}