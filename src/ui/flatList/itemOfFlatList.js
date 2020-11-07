import React, {memo, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {StoreContext} from '../../stores/storeProvider';
import FavoriteButton from '../favoriteButton';

const ItemOfFlatList = ({title, image, description, url}) => {
  const {toggleFavourite} = useContext(StoreContext);
  const navigation = useNavigation();

  const toggle = () => {
    toggleFavourite(url);
  };

  const onPress = (name, data) => {
    navigation.navigate(name, data);
  };

  return (
    <TouchableOpacity
      onPress={() => onPress('SingleNews', {id: url})}
      style={styles.item}>
      <ImageBackground source={{uri: image}} style={styles.image}>
        <FavoriteButton onPress={toggle} url={url} />
        <View style={styles.block}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#d3d3d3',
    marginHorizontal: 3,
    borderWidth: 2,
    borderColor: '#20232a',
    borderRadius: 3,
    height: 200,
  },
  block: {
    marginHorizontal: 2,
    marginVertical: 3,
    backgroundColor: '#fff',
    opacity: 0.7,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 13,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
});

export default memo(ItemOfFlatList);
