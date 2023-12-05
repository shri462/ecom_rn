import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {colors, paperThemeColors} from '../../constants/colors';
import _ from '../../styles/utilityStyles';
import {useForm} from 'react-hook-form';
import PressableCustom from '../../components/UI/buttons/PressableCustom';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {appRoutes, authRoutes} from '../../constants/routes';
import {checkLogin} from '../../data/reducers/auth/auth.actions';
import {useDispatch} from 'react-redux';
import {TextInput, Button, Text} from 'react-native-paper';
import {Controller} from 'react-hook-form';
import AppwriteService from '../../appwrite/auth.services';
import authService from '../../appwrite/auth.services';

const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const {navigate} = useNavigation();

  const [showPassword, setShowPassword] = useState(true);

  const login = async formData => {
    const res = await authService.login(formData);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{
          paddingHorizontal: 24,
        }}>
        <View>
          <Text
            variant="displayMedium"
            style={[
              {
                marginBottom: 48,
                marginTop: 24,
                color: paperThemeColors.primary,
              },
            ]}>
            Login
          </Text>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value, name, field}}) => (
              <TextInput
                placeholder="Enter email"
                value={value}
                onChangeText={e => onChange(e)}
                keyboardType="email-address"
                mode="outlined"
                label={'Email'}
                error={errors['email'] ? true : false}
              />
            )}
            name={'email'}
            rules={{
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Enter valid email address',
              },
              required: {
                value: true,
                message: 'Email is required',
              },
            }}
          />
          {errors && errors['email'] && (
            <Text variant="bodySmall" style={{color: paperThemeColors.error}}>
              {errors['email']?.message ? errors['email']?.message : ''}
            </Text>
          )}
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value, name, field}}) => (
              <TextInput
                style={_.mt_16}
                placeholder="Enter password"
                value={value}
                onChangeText={e => onChange(e)}
                secureTextEntry={showPassword}
                mode="outlined"
                label={'Password'}
                error={errors['password'] ? true : false}
                right={
                  <TextInput.Icon
                    icon="eye"
                    onPressIn={() => setShowPassword(false)}
                    onPressOut={() => setShowPassword(true)}
                  />
                }
              />
            )}
            name={'password'}
            rules={{
              required: {
                value: true,
                message: 'Password is required',
              },
            }}
          />
          {errors && errors['password'] && (
            <Text variant="bodySmall" style={{color: paperThemeColors.error}}>
              {errors['password']?.message ? errors['password']?.message : ''}
            </Text>
          )}
          <Button
            style={_.mt_16}
            mode="contained"
            onPress={handleSubmit(login)}>
            Login
          </Button>
          <View style={[_.flex_r_center, _.my_16]}>
            <Text variant="bodyMedium">don't have an account?</Text>
            <Button
              onPress={() => navigate(authRoutes.RegisterScreen)}
              mode="text">
              Register
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default LoginScreen;
