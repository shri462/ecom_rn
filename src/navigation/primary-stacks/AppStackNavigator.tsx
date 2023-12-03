import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {colors} from '../../constants/colors';
import {appRoutes} from '../../constants/routes';
import Dashboard from '../../screens/dashboard/Dashboard';

const Stack = createNativeStackNavigator();

const AppStackNavigator = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={appRoutes.Dashboard} component={Dashboard} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default AppStackNavigator;
