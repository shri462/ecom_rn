import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {colors, paperThemeColors} from '../../constants/colors';
import {Button, Switch, Text, TextInput} from 'react-native-paper';
import _ from '../../styles/utilityStyles';
import {authRoutes} from '../../constants/routes';
import authService from '../../appwrite/auth.services';
import {useAppDispatch} from '../../data/hooks/hooks';
import {checkLogin} from '../../data/reducers/auth/auth.actions';

const RegisterScreen = () => {
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const {navigate} = useNavigation();
  const [showPassword, setShowPassword] = useState(true);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const register = async formData => {
    try {
      const res = await authService.createAccount({
        ...formData,
        isAdmin: isSwitchOn,
      });
      if (res) {
        await authService.updatePrefs(isSwitchOn);
        await dispatch(checkLogin());
      }
    } catch (error) {
      console.log(error);
    }
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
            Register
          </Text>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value, name, field}}) => (
              <TextInput
                placeholder="Enter name"
                value={value}
                onChangeText={e => onChange(e)}
                mode="outlined"
                label={'Name'}
                error={errors['name'] ? true : false}
              />
            )}
            name={'name'}
            rules={{
              required: {
                value: true,
                message: 'Name is required',
              },
            }}
          />
          {errors && errors['name'] && (
            <Text variant="bodySmall" style={{color: paperThemeColors.error}}>
              {errors['name']?.message ? errors['name']?.message : ''}
            </Text>
          )}
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value, name, field}}) => (
              <TextInput
                style={_.mt_16}
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
          <View
            style={[_.mt_16, _.flex_r, {alignItems: 'center', columnGap: 12}]}>
            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
            <Text variant="labelLarge">Register yourself as admin</Text>
          </View>

          <Button
            style={_.mt_16}
            mode="contained"
            onPress={handleSubmit(register)}>
            Register
          </Button>
          <View style={[_.flex_r_center, _.my_16]}>
            <Text variant="bodyMedium">Already have an account?</Text>
            <Button
              onPress={() => navigate(authRoutes.LoginScreen)}
              mode="text">
              Login
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
