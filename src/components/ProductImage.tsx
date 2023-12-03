import {Dimensions, Image, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import storage from '@react-native-firebase/storage';
import {Text} from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ProductImage = ({imgName}) => {
  const [url, setUrl] = useState('');

  const getUrl = async () => {
    const imgurl = await storage().ref(`/${imgName}`).getDownloadURL();
    setUrl(imgurl);
  };

  useEffect(() => {
    getUrl();
  }, [imgName]);

  if (url) {
    return (
      <Image
        style={{
          width: windowWidth / 2 - 18,
          height: windowWidth / 2 - 18,
        }}
        resizeMode="contain"
        source={{uri: url}}
      />
    );
  } else {
    <Text>loading...</Text>;
  }
};

export default ProductImage;

const styles = StyleSheet.create({});
