import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  UIManager,
  KeyboardAvoidingView,
} from 'react-native';
import Modal from 'react-native-modal';
import {IconButton, Text} from 'react-native-paper';
import {colors, paperThemeColors} from '../../../constants/colors';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = {
  title: string;
  show: boolean;
  children: React.ReactNode;
  close: () => void;
};

const BottomSheet = ({title, children, show, close = () => {}}: Props) => {
  return (
    <Modal
      isVisible={show}
      onBackdropPress={() => {
        close();
      }}
      onBackButtonPress={() => {
        close();
      }}
      useNativeDriverForBackdrop={true}
      onSwipeComplete={() => {
        close();
      }}
      swipeDirection="down"
      style={styles.modal}>
      <View
        style={[
          styles.bottomSheet,
          {
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            paddingBottom: 12,
          },
        ]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'height' : undefined}>
          <View style={styles.indicator} />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }}>
            <Text variant="titleLarge">{title}</Text>
            <IconButton
              icon="close"
              iconColor={paperThemeColors.primary}
              size={20}
              onPress={() => {
                close();
              }}
            />
          </View>
          <View>{children}</View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    padding: 0,
    margin: 0,
  },
  bottomSheet: {
    backgroundColor: colors.white,
    width: '100%',
    paddingHorizontal: 24,
  },
  indicator: {
    borderBottomWidth: 5,
    width: 96,
    alignSelf: 'center',
    borderRadius: 5,
    borderColor: paperThemeColors.primary,
    marginVertical: 8,
  },
});

export default BottomSheet;
