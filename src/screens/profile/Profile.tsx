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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Profile = () => {
  const {loggedUser} = useAppSelector(state => state.auth);
  const {products} = useAppSelector(state => state.product);

  const {navigate} = useNavigation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

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
      <FlatList
        data={products}
        keyExtractor={item => item.$id}
        renderItem={({item}) => (
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
              <View style={[_.flex_r, {columnGap: 4}]}>
                {item?.sizes?.map(size => (
                  <Avatar.Text
                    size={20}
                    color={paperThemeColors.primaryContainer}
                    label={String(size)}
                    style={{backgroundColor: paperThemeColors.primary}}
                  />
                ))}
              </View>
            </View>
          </View>
        )}
        numColumns={2}
        contentContainerStyle={{paddingHorizontal: 12}}
        columnWrapperStyle={{columnGap: 12}}
      />
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
