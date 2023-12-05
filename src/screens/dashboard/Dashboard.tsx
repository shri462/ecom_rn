import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {Appbar, Badge, Text} from 'react-native-paper';
import {colors, paperThemeColors} from '../../constants/colors';
import Product from '../../components/Product';
import {useAppDispatch, useAppSelector} from '../../data/hooks/hooks';
import {getProducts} from '../../data/reducers/products/products.actions';
import {getProductsInCart} from '../../data/reducers/cart/cart.actions';
import {useNavigation} from '@react-navigation/native';
import {appRoutes} from '../../constants/routes';

const Dashboard = () => {
  const {products} = useAppSelector(state => state.product);
  const {cartProducts} = useAppSelector(state => state.cart);
  const {loggedUser} = useAppSelector(state => state.auth);
  const {navigate} = useNavigation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getProductsInCart(loggedUser?.$id));
  }, []);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="LOGO" />
        <View>
          <Appbar.Action icon="cart" onPress={() => navigate(appRoutes.Cart)} />
          <Badge
            size={16}
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}>
            {cartProducts?.length || 0}
          </Badge>
        </View>
      </Appbar.Header>
      <FlatList
        data={products}
        keyExtractor={item => item.$id}
        renderItem={({item}) => <Product item={item} />}
        numColumns={2}
        contentContainerStyle={{paddingHorizontal: 12}}
        columnWrapperStyle={{columnGap: 12}}
      />
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
