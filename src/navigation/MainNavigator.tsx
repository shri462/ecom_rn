import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import BottomTabNavigator from './primary-stacks/BottomTabNavigator';
import AuthStackNavigator from './primary-stacks/AuthStackNavigator';
import SplashScreen from '../screens/onboarding/SplashScreen';
import {checkLogin} from '../data/reducers/auth/auth.actions';
import {useAppDispatch} from '../data/hooks/hooks';

const MainNavigator = () => {
  const dispatch = useAppDispatch();
  const [showSplash, setShowSplash] = useState(true);
  const {authenticate} = useSelector(state => state.auth);

  // check if user is logged in
  useEffect(() => {
    if (!authenticate) {
      dispatch(checkLogin());
      return () => {};
    }
  }, [authenticate]);

  // use to show splash screen
  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 2000);
  }, []);

  return (
    <NavigationContainer>
      {showSplash ? (
        <SplashScreen />
      ) : authenticate ? (
        <BottomTabNavigator />
      ) : (
        <AuthStackNavigator />
      )}
    </NavigationContainer>
  );
};

export default MainNavigator;
