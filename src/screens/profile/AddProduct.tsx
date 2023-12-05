import {
  Image,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../data/hooks/hooks';
import {useNavigation} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import productService from '../../appwrite/product.services';
import {colors, paperThemeColors} from '../../constants/colors';
import {
  Appbar,
  Avatar,
  Button,
  IconButton,
  Text,
  TextInput,
} from 'react-native-paper';
import _ from '../../styles/utilityStyles';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import ImageCropPicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import {appRoutes} from '../../constants/routes';
import {getProducts} from '../../data/reducers/products/products.actions';

const sizes = [
  {
    id: 1,
    label: 6,
  },
  {
    id: 2,
    label: 7,
  },
  {
    id: 3,
    label: 8,
  },
  {
    id: 4,
    label: 9,
  },
  {
    id: 5,
    label: 10,
  },
];

const AddProduct = () => {
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const {navigate, goBack} = useNavigation();
  const {loggedUser} = useAppSelector(state => state.auth);

  const [openSizesBottomSheet, setopenSizesBottomSheet] =
    useState<boolean>(false);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [sizeError, setSizeError] = useState<string>('');
  const [localImage, setLocalImage] = useState({});
  const [imageError, setImageError] = useState('');

  const addProduct = async formData => {
    if (selectedSizes.length === 0) {
      setSizeError('Please select available sizes');
      return;
    }
    if (!localImage?.path) {
      setImageError('Please upload the product image');
      return;
    }
    console.log(localImage);
    try {
      const image = await productService.uploadFile(localImage);
      console.log(image, 'upload image res');
      if (image) {
        const res = await productService.createProduct({
          ...formData,
          sizes: selectedSizes,
          image: image.metadata.fullPath,
          userId: loggedUser.$id,
        });
        if (res) {
          Toast.show({
            type: 'customToast',
            props: {message: 'Product added successfully!', isError: false},
          });
          dispatch(getProducts());
          navigate(appRoutes.Profile);
        } else {
          Toast.show({
            type: 'customToast',
            props: {message: 'Error in adding product', isError: true},
          });
        }
      } else {
        Toast.show({
          type: 'customToast',
          props: {message: 'Error in image upload', isError: true},
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSelectSize = (size: number) => {
    if (selectedSizes?.find(d => d === size)) {
      setSelectedSizes(selectedSizes?.filter(d => d !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const openCamera = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          takePhoto();
        } else {
          Toast.show({
            type: 'customToast',
            props: {message: 'Please grant camera permission', isError: true},
          });
        }
      } else if (Platform.OS == 'ios') {
        const result = await check(PERMISSIONS.IOS.CAMERA);
        console.log('result: ', result);
        if (result === RESULTS.GRANTED) {
          takePhoto();
        } else {
          const res2 = await request(PERMISSIONS.IOS.CAMERA);
          res2 === RESULTS.GRANTED
            ? takePhoto()
            : Toast.show({
                type: 'customToast',
                props: {
                  message: 'Please grant camera permission',
                  isError: true,
                },
              });
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const takePhoto = () => {
    ImageCropPicker.openCamera({
      freeStyleCropEnabled: false,
      cropping: true,
      hideBottomControls: true,
      cropperStatusBarColor: '#000000',
      enableRotationGesture: true,
      useFrontCamera: true,
      compressImageMaxHeight: 1024,
      forceJpg: true,
      height: 1024,
      width: 1024,
    })
      .then(image => {
        setLocalImage(image);
      })
      .catch(e => console.log(e));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => goBack()} />
        <Appbar.Content title="Add Product" />
      </Appbar.Header>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{
          paddingHorizontal: 24,
        }}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value, name, field}}) => (
            <TextInput
              placeholder="Enter brand name"
              value={value}
              onChangeText={e => onChange(e)}
              mode="outlined"
              label={'Brand Name'}
              error={errors['brandName'] ? true : false}
            />
          )}
          name={'brandName'}
          rules={{
            required: {
              value: true,
              message: 'Brand Name is required',
            },
          }}
        />
        {errors && errors['brandName'] && (
          <Text variant="bodySmall" style={{color: paperThemeColors.error}}>
            {errors['brandName']?.message ? errors['brandName']?.message : ''}
          </Text>
        )}
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value, name, field}}) => (
            <TextInput
              style={_.mt_16}
              placeholder="Enter name"
              value={value}
              onChangeText={e => onChange(e)}
              mode="outlined"
              label={'Name'}
              error={errors['name'] ? true : false}
            />
          )}
          name={'name'}
          rules={{
            required: {
              value: true,
              message: 'Name is required',
            },
          }}
        />
        {errors && errors['name'] && (
          <Text variant="bodySmall" style={{color: paperThemeColors.error}}>
            {errors['name']?.message ? errors['name']?.message : ''}
          </Text>
        )}
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value, name, field}}) => (
            <TextInput
              style={_.mt_16}
              placeholder="Enter price"
              value={value}
              onChangeText={e => onChange(e)}
              mode="outlined"
              label={'Price'}
              error={errors['price'] ? true : false}
              keyboardType="numeric"
            />
          )}
          name={'price'}
          rules={{
            required: {
              value: true,
              message: 'Price is required',
            },
          }}
        />
        {errors && errors['price'] && (
          <Text variant="bodySmall" style={{color: paperThemeColors.error}}>
            {errors['price']?.message ? errors['price']?.message : ''}
          </Text>
        )}

        <Text style={[_.mt_16]} variant="labelLarge">
          Select Available Sizes
        </Text>
        <View style={[_.flex_r, _.mt_8, {columnGap: 8}]}>
          {sizes.map(size => (
            <TouchableOpacity
              key={size.id}
              onPress={() => onSelectSize(size.label)}
              activeOpacity={0.7}>
              <Avatar.Text
                size={32}
                color={
                  selectedSizes?.includes(size.label)
                    ? paperThemeColors.primaryContainer
                    : paperThemeColors.primary
                }
                label={String(size.label)}
                style={{
                  backgroundColor: selectedSizes?.includes(size.label)
                    ? paperThemeColors.primary
                    : paperThemeColors.primaryContainer,
                }}
              />
            </TouchableOpacity>
          ))}
        </View>
        {sizeError && (
          <Text
            variant="bodySmall"
            style={{color: paperThemeColors.error, marginTop: 4}}>
            {sizeError}
          </Text>
        )}

        {localImage?.path ? (
          <View style={{height: 200, width: 200, marginTop: 16}}>
            <Image
              resizeMode="contain"
              source={{
                uri: localImage?.path,
              }}
              style={{width: 200, height: 200, borderRadius: 12}}
            />
            <IconButton
              icon="delete"
              iconColor={paperThemeColors.primary}
              size={20}
              onPress={() => setLocalImage({})}
              style={styles.removeMediaBtn}
            />
          </View>
        ) : (
          <Button
            style={[_.mt_16]}
            icon="camera"
            mode="outlined"
            onPress={openCamera}>
            Click product image
          </Button>
        )}

        {imageError && (
          <Text
            variant="bodySmall"
            style={{color: paperThemeColors.error, marginTop: 4}}>
            {imageError}
          </Text>
        )}

        <Button
          style={_.mt_16}
          mode="contained"
          onPress={handleSubmit(addProduct)}>
          Register
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  removeMediaBtn: {
    zIndex: 2,
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: paperThemeColors.primaryContainer,
    borderColor: paperThemeColors.primary,
  },
});
