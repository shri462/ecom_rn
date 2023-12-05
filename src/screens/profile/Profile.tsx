import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../data/hooks/hooks';
import {Appbar, Button, Text} from 'react-native-paper';
import {colors} from '../../constants/colors';
import _ from '../../styles/utilityStyles';
import {appRoutes} from '../../constants/routes';
import {useNavigation} from '@react-navigation/native';
import MyOrders from './MyOrders';
import {getOrders} from '../../data/reducers/order/order.actions';
import MyProducts from './MyProducts';
import {getMyProducts} from '../../data/reducers/products/products.actions';

const Profile = () => {
  const {loggedUser} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const {navigate} = useNavigation();

  useEffect(() => {
    dispatch(getOrders(loggedUser?.$id));
    dispatch(getMyProducts(loggedUser?.$id));
  }, []);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="LOGO" />
        <Appbar.Action icon="logout" onPress={() => {}} />
      </Appbar.Header>
      <ScrollView
        style={{padding: 12}}
        contentContainerStyle={{paddingBottom: 48}}>
        <Text variant="titleLarge">Welcome, {loggedUser?.name}</Text>
        <Button
          style={[_.mt_16]}
          icon="shoe-sneaker"
          mode="contained"
          onPress={() => navigate(appRoutes.AddProduct)}>
          Add Product
        </Button>
        {loggedUser?.prefs.role === 'admin' && <MyProducts />}
        {loggedUser?.prefs.role !== 'admin' && <MyOrders />}
      </ScrollView>
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
