import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast, {ToastConfigParams} from 'react-native-toast-message';
import reduxStore from './data/reducers';
import {Provider} from 'react-redux';
import ToastModal from './components/UI/modals/ToastModal';
import MainNavigator from './navigation/MainNavigator';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import {paperThemeColors} from './constants/colors';

type CustomToastProps = {
  message: string;
  isError: boolean;
};

const toastConfig = {
  customToast: ({props}: ToastConfigParams<CustomToastProps>) => (
    <ToastModal props={props} />
  ),
};

const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: paperThemeColors,
};

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <Provider store={reduxStore}>
        <PaperProvider theme={theme}>
          <MainNavigator />
          <Toast config={toastConfig} visibilityTime={3000} position="bottom" />
        </PaperProvider>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
