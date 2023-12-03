import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {colors} from '../../constants/colors';
import {appRoutes} from '../../constants/routes';
import Profile from '../../screens/profile/Profile';
import AddProduct from '../../screens/profile/AddProduct';

const Stack = createNativeStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={appRoutes.Profile} component={Profile} />
        <Stack.Screen name={appRoutes.AddProduct} component={AddProduct} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default ProfileStackNavigator;
