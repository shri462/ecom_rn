import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Appbar, Text} from 'react-native-paper';
import {colors, paperThemeColors} from '../../constants/colors';

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="LOGO" />
        <Appbar.Action icon="cart" onPress={() => {}} />
      </Appbar.Header>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
