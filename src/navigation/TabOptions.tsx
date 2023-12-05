import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useCallback} from 'react';
import {colors, paperThemeColors} from '../constants/colors';
import {Icon} from 'react-native-paper';

export const HEIGHT_SIZE = 44;

export const TabBar = ({props: {state, descriptors, navigation}}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFill}>
        <View style={styles.content}>
          {state.routes.map((route, index) => {
            const {options} = descriptors[route.key];
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <TouchableOpacity
                activeOpacity={0.5}
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.button}>
                <TabIcon title={options.title} focused={isFocused} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const TabIcon = ({title, focused}) => {
  const getIcon = () => {
    if (title === 'Home') {
      return (
        <Icon
          source="home"
          color={
            focused ? paperThemeColors.primary : paperThemeColors.secondary
          }
          size={20}
        />
      );
    } else if (title === 'Profile') {
      return (
        <Icon
          source="account"
          color={
            focused ? paperThemeColors.primary : paperThemeColors.secondary
          }
          size={20}
        />
      );
    }
  };
  return (
    <View>
      <View style={styles.iconContainer}>
        <View>{getIcon()}</View>

        <Text style={[styles.title, {fontWeight: focused ? 700 : 400}]}>
          {title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
  },
  title: {
    color: colors.black,
    fontSize: 12,
    paddingTop: 2,
  },
  text: {
    fontSize: 40,
    color: 'white',
  },
  container: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    shadowColor: colors.black,
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.2,
    elevation: 48,
    height: HEIGHT_SIZE,
    justifyContent: 'center',
    bottom: 0,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    color: 'purple',
    fontWeight: 'bold',
  },
  inactiveLabel: {
    color: 'gray',
    fontWeight: 'bold',
  },
});

export default TabIcon;
