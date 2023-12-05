import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import ProductImage from './ProductImage';
import {Avatar, Button, Text} from 'react-native-paper';
import {paperThemeColors} from '../constants/colors';
import _ from '../styles/utilityStyles';
import BottomSheet from './UI/modals/BottomSheet';
import {useAppDispatch, useAppSelector} from '../data/hooks/hooks';
import cartService from '../appwrite/cart.services';
import Toast from 'react-native-toast-message';
import {getProductsInCart} from '../data/reducers/cart/cart.actions';

const windowWidth = Dimensions.get('window').width;

const Product = ({item}) => {
  const [showSizesModal, setShowSizesModal] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<number | undefined>(
    undefined,
  );
  const {loggedUser} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const addToCart = async () => {
    const res = await cartService.addProductToCart({
      productId: item?.$id,
      selectedSize: selectedSize,
      userId: loggedUser?.$id,
      productName: item.name,
      brandName: item.brandName,
      productPrice: item.price,
    });

    if (res) {
      Toast.show({
        type: 'customToast',
        props: {
          isError: false,
          message: 'Product added to cart',
        },
      });
      await dispatch(getProductsInCart(loggedUser?.$id));
      setShowSizesModal(false);
      setSelectedSize(undefined);
    }
  };

  return (
    <>
      <View
        key={item.$id}
        style={{
          width: windowWidth / 2 - 18,
          borderRadius: 8,
          overflow: 'hidden',
          backgroundColor: paperThemeColors.primaryContainer,
        }}>
        <ProductImage imgName={item?.image} />
        <View style={{padding: 4}}>
          <Text variant="labelLarge">{item?.brandName}</Text>
          <Text variant="labelSmall">{item?.name}</Text>
          <Text variant="labelLarge">₹ {item?.price}</Text>
          <Button onPress={() => setShowSizesModal(true)}>Add to cart</Button>
        </View>
      </View>
      <BottomSheet
        title="Select size"
        show={showSizesModal}
        close={() => setShowSizesModal(false)}>
        <View style={[_.flex_r, {columnGap: 8, paddingBottom: 24}]}>
          {item?.sizes?.map((size: number) => (
            <TouchableOpacity
              key={size}
              onPress={() => setSelectedSize(size)}
              activeOpacity={0.7}>
              <Avatar.Text
                size={36}
                color={
                  selectedSize === size
                    ? paperThemeColors.primaryContainer
                    : paperThemeColors.primary
                }
                label={String(size)}
                style={{
                  backgroundColor:
                    selectedSize === size
                      ? paperThemeColors.primary
                      : paperThemeColors.primaryContainer,
                }}
              />
            </TouchableOpacity>
          ))}
        </View>
        <Button onPress={addToCart} mode="contained">
          Proceed
        </Button>
      </BottomSheet>
    </>
  );
};

export default Product;

const styles = StyleSheet.create({});
