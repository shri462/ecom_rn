import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {appRoutes} from '../../constants/routes';
import {SafeAreaView, StatusBar} from 'react-native';
import {colors} from '../../constants/colors';
import AppStackNavigator from './AppStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import {TabBar} from '../TabOptions';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
      <Tab.Navigator
        tabBar={props => <TabBar props={props} />}
        screenOptions={() => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
        })}>
        <Tab.Screen
          name={appRoutes.AppStackNavigator}
          component={AppStackNavigator}
          options={{title: 'Home'}}
        />
        <Tab.Screen
          name={appRoutes.ProfileStackNavigator}
          component={ProfileStackNavigator}
          options={{title: 'Profile'}}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default BottomTabNavigator;
