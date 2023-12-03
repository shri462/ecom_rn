import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import _ from '../../../styles/utilityStyles';
import PressableCustom from '../buttons/PressableCustom';
import Toast from 'react-native-toast-message';
import {colors} from '../../../constants/colors';

type Props = {
  props: {
    message: string;
    isError: boolean;
  };
};

const ToastModal = ({props}: Props) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            props?.isError === true ? colors.error : colors.success,
        },
      ]}>
      <View style={styles.snackbar}>
        <Text style={[_.white_14]}>
          {props.message?.toString() == 'AxiosError: Network Error'
            ? 'Please check your internet connection'
            : props.message?.toString()}
        </Text>
      </View>
      <PressableCustom style={styles.btn} onPress={() => Toast.hide()}>
        <Text style={_.white_14}>Ok</Text>
      </PressableCustom>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    ..._.flex_r_btw,
    zIndex: 2,
  },
  snackbar: {
    flex: 1,
    ..._.flex_r_start,
    gap: 10,
    flexWrap: 'wrap',
  },
  btn: {
    paddingLeft: 16,
    borderLeftWidth: 1,
    borderLeftColor: colors.white,
  },
});

export default ToastModal;
