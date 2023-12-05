import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Appbar, Button, IconButton, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {colors, paperThemeColors} from '../../constants/colors';
import {useAppDispatch, useAppSelector} from '../../data/hooks/hooks';
import _ from '../../styles/utilityStyles';
import cartService from '../../appwrite/cart.services';
import {getProductsInCart} from '../../data/reducers/cart/cart.actions';
import {appRoutes} from '../../constants/routes';
import orderService from '../../appwrite/order.services';
import Toast from 'react-native-toast-message';
import {getOrders} from '../../data/reducers/order/order.actions';

const Cart = () => {
  const {navigate, goBack} = useNavigation();
  const {cartProducts} = useAppSelector(state => state.cart);
  const {loggedUser} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const removeItem = async id => {
    await cartService.deleteProductFromCart(id);
    await dispatch(getProductsInCart(loggedUser?.$id));
  };

  const placeOrder = async () => {
    const totalAmount = cartProducts?.reduce(
      (acc, crr) => acc + crr.productPrice,
      0,
    );
    const res = await orderService.createOrder({
      userId: loggedUser?.$id,
      amount: totalAmount,
      products: cartProducts?.map(d => d.$id),
    });
    if (res) {
      for await (const cartProduct of cartProducts) {
        await cartService.deleteProductFromCart(cartProduct.$id);
      }
      await dispatch(getProductsInCart(loggedUser?.$id));
      Toast.show({
        type: 'customToast',
        props: {
          isError: false,
          message: 'Order Placed!',
        },
      });
      await dispatch(getOrders(loggedUser?.$id));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => goBack()} />
        <Appbar.Content title="Cart" />
      </Appbar.Header>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{
          paddingHorizontal: 24,
        }}>
        {cartProducts?.length === 0 ? (
          <Button
            onPress={() => navigate(appRoutes.Dashboard)}
            style={[_.mt_24, {alignSelf: 'center'}]}
            mode="outlined">
            Add Products to Cart
          </Button>
        ) : (
          <View>
            {cartProducts?.map(product => (
              <View
                key={product.$id}
                style={[
                  _.flex_r_btw,
                  {
                    marginVertical: 8,
                    padding: 12,
                    backgroundColor: paperThemeColors.secondaryContainer,
                    borderRadius: 8,
                  },
                ]}>
                <View>
                  <Text variant="labelLarge">
                    {product.brandName} {product.productName}
                  </Text>
                  <Text variant="labelMedium">
                    Size:{' '}
                    <Text variant="bodySmall">{product.selectedSize}</Text>
                  </Text>
                  <Text variant="labelMedium">
                    Price:{' '}
                    <Text variant="bodySmall">₹{product.productPrice}</Text>
                  </Text>
                </View>
                <IconButton
                  icon="delete"
                  iconColor={paperThemeColors.error}
                  size={20}
                  onPress={() => removeItem(product?.$id)}
                />
              </View>
            ))}

            <View style={[_.flex_r_btw, _.mt_16]}>
              <Text variant="labelLarge">Total Amount: </Text>
              <Text variant="labelLarge">
                ₹{' '}
                {cartProducts?.reduce((acc, crr) => acc + crr.productPrice, 0)}
              </Text>
            </View>

            <Button
              disabled={loggedUser?.prefs.role === 'admin'}
              onPress={placeOrder}
              style={[_.mt_24]}
              mode="contained">
              Place Order
            </Button>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
