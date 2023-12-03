import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaView, StatusBar} from 'react-native';
import {colors} from '../../constants/colors';
import {appRoutes, authRoutes} from '../../constants/routes';
import LoginScreen from '../../screens/login/LoginScreen';
import RegisterScreen from '../../screens/login/RegisterScreen';

const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={authRoutes.LoginScreen} component={LoginScreen} />
        <Stack.Screen
          name={authRoutes.RegisterScreen}
          component={RegisterScreen}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default AuthStackNavigator;
