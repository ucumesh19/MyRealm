import React, { useState } from 'react';
import { View, Text, Animated, TouchableOpacity } from 'react-native';

const FirstAnimation = () => {

    const value = useState(new Animated.ValueXY({ x: 0, y: 0 }))[0]
    const opacity = useState(new Animated.Value(0))[0]
    // [0] means we will work oly with the initial value as it values differ after each time the app re renders
    const moveBall = () => {
        Animated.spring(value, {
            toValue: { x: 200, y: 100 },
            duration: 1000,
            useNativeDriver: false
        }).start()
    }
    const fadeInBall = () => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false
        }).start()
    }
    const fadeOutBall = () => {
        Animated.timing(opacity, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false
            //here false means that it will use JS thread for computation ad Native OS 
            // for Animatio part which will result in slowance f app as JS thread also have to perform
            //other task at the same time ,and it's walue affected from 60 frame/sec to eve 4-9 frame/second
            // Computation-> Serialization -> Transfer it to native OS by bridge->Deserialization->run the frame
            //so this will be handle by Native OS and there will note be any difference in compilance speed or executio speed of app
            //as everything wll be handle by native OS completely when value will be true.
            //Before animation atarts->everything will be seralize by Native OS,Deserialize and over
        }).start()
    }

    return (
        <View>
            <Animated.View style={value.getLayout()}>
                <View
                    style={{
                        height: 100,
                        width: 100,
                        borderRadius: 50,
                        backgroundColor: "blue"
                    }}
                />
            </Animated.View>
            <TouchableOpacity onPress={() => {
                moveBall()
            }}>
                <Text style={{ fontSize: 20 }}>Move Ball</Text>
            </TouchableOpacity>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Animated.View
                    style={{
                        height: 100,
                        width: 100,
                        opacity,
                        borderRadius: 50,
                        backgroundColor: "red"
                    }}
                />
                <TouchableOpacity onPress={() => {
                    fadeInBall()
                }}>
                    <Text style={{ fontSize: 20 }}>Fade In Ball</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    fadeOutBall()
                }}>
                    <Text style={{ fontSize: 20 }}>Fade Out Ball</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default FirstAnimation;