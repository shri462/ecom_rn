import {Dimensions, FlatList, Image, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useAppDispatch, useAppSelector} from '../../data/hooks/hooks';
import {Appbar, Avatar, Button, Text} from 'react-native-paper';
import {colors, paperThemeColors} from '../../constants/colors';
import _ from '../../styles/utilityStyles';
import {appRoutes} from '../../constants/routes';
import {useNavigation} from '@react-navigation/native';
import {getProducts} from '../../data/reducers/products/products.actions';
import storage from '@react-native-firebase/storage';
import ProductImage from '../../components/ProductImage';
import BottomSheet from '../../components/UI/modals/BottomSheet';
import Product from '../../components/Product';

const Profile = () => {
  const {loggedUser} = useAppSelector(state => state.auth);

  const {navigate} = useNavigation();

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="LOGO" />
        <Appbar.Action icon="logout" onPress={() => {}} />
      </Appbar.Header>
      <View style={{padding: 12}}>
        <Text variant="titleLarge">Welcome, {loggedUser?.name}</Text>
        <Button
          style={[_.mt_16]}
          icon="shoe-sneaker"
          mode="contained"
          onPress={() => navigate(appRoutes.AddProduct)}>
          Add Product
        </Button>
        <Text style={[_.mt_16]} variant="titleLarge">
          Your Products
        </Text>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
