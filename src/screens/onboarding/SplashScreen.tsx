import React, {useEffect, useRef} from 'react';
import {
  Animated,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {colors} from '../../constants/colors';
import _ from '../../styles/utilityStyles';

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
      <View style={styles.logoContainer}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [
              {
                scale: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
            ],
          }}>
          <Text style={_.black_48_700}>LOGO</Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
});

export default SplashScreen;
