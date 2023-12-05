import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {appRoutes, excludeTabBar} from '../../constants/routes';
import {SafeAreaView, StatusBar} from 'react-native';
import {colors} from '../../constants/colors';
import AppStackNavigator from './AppStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import {TabBar} from '../TabOptions';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const getTabBarVisibility = route => {
  const routeName = getFocusedRouteNameFromRoute(route);
  return excludeTabBar.includes(routeName) ? false : true;
};

const BottomTabNavigator = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
      <Tab.Navigator
        tabBar={props => <TabBar props={props} />}
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarVisible: getTabBarVisibility(route),
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
