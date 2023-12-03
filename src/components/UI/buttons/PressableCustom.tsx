import React from 'react';
import {Pressable, View} from 'react-native';

type Props = {
  onPress: () => void;
  children: React.ReactNode;
  style?: {};
};

const PressableCustom = ({children, style = {}, onPress = () => {}}: Props) => {
  return (
    <Pressable hitSlop={20} onPress={onPress} style={{...style}}>
      <View>{children}</View>
    </Pressable>
  );
};

export default PressableCustom;
